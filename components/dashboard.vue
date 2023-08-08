<template>
  <div style="width: 100%" class="dashboard">
    <!-- ==================== Card ==================== -->
    <div class="assetContainer">
      <div>
        <div class="assetCardContainer">
          <div class="cards">
            <div class="card-content">
              <p>{{ this.AssetCount }}<br /><span>Total Assets</span></p>
              <i class="bx bx-box box-icon"></i>
            </div>
          </div>
          <div class="cards">
            <div class="card-content">
              <p>{{ this.AssetInUse }}<br /><span>Asset In Use</span></p>
              <i class="bx bx-box box-icon"></i>
            </div>
          </div>
          <div class="cards">
            <div class="card-content">
              <p>{{ this.LicenseCount }}<br /><span>Total License</span></p>
              <i class="bx bx-box box-icon"></i>
            </div>
          </div>
        </div>
        <div class="divide-2" style="margin-top: 10px">
          <div class="cards" v-resize="resizeHandler">
            <div class="card-content">
              <BarChart class="charts" ref="myChart" />
            </div>
          </div>
          <div class="cards" v-resize="resizeHandler">
            <div class="card-content">
              <DoughnutChart class="charts" ref="doughnutChart" />
            </div>
          </div>
        </div>
        <div class="divide-2" style="margin-top: 10px">
          <div class="cards" v-resize="resizeHandler">
            <div class="card-content">
              <PieChart class="charts" />
            </div>
          </div>
          <div class="cards" v-resize="resizeHandler">
            <div class="card-content">
              <PieChart2 class="charts" />
            </div>
          </div>
        </div>
      </div>

      <div class="divide-1">
        <div class="cards">
          <div class="card-content audit audit-top" style="height: 537.5px">
            <h5>Transfer History</h5>
            <div v-for="(logs, index) in this.TransferList">
              <div class="card card-history">
                <div class="card-body body-history ">
                  <span> Transferred asset ID {{ logs.asset_id }} from {{ logs.from | capitalizeFirst }} to {{
                    logs.responsible | capitalizeFirst }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="cards">
          <div class="card-content audit" style="height: 537.5px; margin-top: 10px">
            <h5>Audit Logs</h5>
            <div v-for="(audit, index) in this.AuditLogs">
              <!-- Upload Excel -->
              <div v-if="audit.audit_action === 'Uploaded' && audit.audit_Page === 'Upload'" class="card card-audit">
                <div class="card-body body-audit">
                  <span>{{ audit.audit_Name | capitalizeFirst }}</span>
                  <span>{{ audit.audit_action | toLowerCase }} an</span>
                  <span>{{ audit.audit_itemNo }}</span>
                  <span>on {{ getAuditDate(audit.created_at) }} at {{ getAuditTime(audit.created_at) }} </span>
                </div>
              </div>
              <!-- Create/Add New License -->
              <div v-else-if="audit.audit_action === 'Added License' && audit.audit_Page === 'Licensing'"
                class="card card-audit">
                <div class="card-body body-audit">
                  <span>{{ audit.audit_Name | capitalizeFirst }}</span>
                  <span>{{ audit.audit_action | toLowerCase }}</span>
                  <span>{{ audit.audit_itemNo }}</span>
                  <span>on {{ getAuditDate(audit.created_at) }} at {{ getAuditTime(audit.created_at) }} </span>
                </div>
              </div>
              <!-- Update/Edit License -->
              <div v-else-if="audit.audit_action === 'Updated' && audit.audit_Page === 'Licensing'"
                class="card card-audit">
                <div class="card-body body-audit">
                  <span>{{ audit.audit_Name | capitalizeFirst }}</span>
                  <span>{{ audit.audit_action | toLowerCase }} </span>
                  <span>{{ audit.audit_itemNo }}</span>
                  <span>on {{ getAuditDate(audit.created_at) }} at {{ getAuditTime(audit.created_at) }} </span>
                </div>
              </div>
              <!-- Delete License -->
              <div v-else-if="audit.audit_action === 'Deleted' && audit.audit_Page === 'Licensing'"
                class="card card-audit">
                <div class="card-body body-audit">
                  <span>{{ audit.audit_Name | capitalizeFirst }}</span>
                  <span>deleted</span>
                  <span>{{ audit.audit_itemNo }} license</span>
                  <span>on {{ getAuditDate(audit.created_at) }} at {{ getAuditTime(audit.created_at) }} </span>
                </div>
              </div>
              <!-- Update Asset -->
              <div
                v-else-if="audit.audit_action === 'Update-Details' || audit.audit_action === 'Update-Location' || audit.audit_action === 'Update-Purchase' || audit.audit_action === 'Update-DeviceSpecs'"
                class="card card-audit">
                <div class="card-body body-audit">
                  <span>{{ audit.audit_Name | capitalizeFirst }}</span>
                  <span>updated</span>
                  <span>the asset no. {{ audit.audit_itemNo }}</span>
                  <span>on {{ getAuditDate(audit.created_at) }} at {{ getAuditTime(audit.created_at) }} </span>
                </div>
              </div>
              <!-- Asset Create-->
              <div v-else-if="audit.audit_action === 'Create' && audit.audit_Page === 'Asset'" class="card card-audit">
                <div class="card-body body-audit">
                  <span>{{ audit.audit_Name | capitalizeFirst }}</span>
                  <span>created</span>
                  <span>the asset no. {{ audit.audit_itemNo }}</span>
                  <span>on {{ getAuditDate(audit.created_at) }} at {{ getAuditTime(audit.created_at) }} </span>
                </div>
              </div>

              <!-- Added device specs-->
              <div v-else-if="audit.audit_action === 'Added Device Specs' && audit.audit_Page === 'Asset'"
                class="card card-audit">
                <div class="card-body body-audit">
                  <span>{{ audit.audit_Name | capitalizeFirst }}</span>
                  <span>{{ audit.audit_action | toLowerCase }}</span>
                  <span>in asset no. {{ audit.audit_itemNo }}</span>
                  <span>on {{ getAuditDate(audit.created_at) }} at {{ getAuditTime(audit.created_at) }} </span>
                </div>
              </div>

              <!-- Allocate asset -->
              <div v-else-if="audit.audit_action === 'Transfer' && audit.audit_Page === 'Asset'" class="card card-audit">
                <div class="card-body body-audit">
                  <span>{{ audit.audit_Name | capitalizeFirst }}</span>
                  <span>allocated</span>
                  <span>the asset no. {{ audit.audit_itemNo }}</span>
                  <span>on {{ getAuditDate(audit.created_at) }} at {{ getAuditTime(audit.created_at) }} </span>
                </div>
              </div>

              <!-- Dispose asset -->
              <div v-else-if="audit.audit_action === 'Dispose' && audit.audit_Page === 'Asset'" class="card card-audit">
                <div class="card-body body-audit">
                  <span>{{ audit.audit_Name | capitalizeFirst }}</span>
                  <span>disposed asset/s</span>
                  <span>on {{ getAuditDate(audit.created_at) }} at {{ getAuditTime(audit.created_at) }} </span>
                </div>
              </div>

              <div v-else class="card card-audit">
                <div class="card-body body-audit">
                  <span>{{ audit.audit_Name | capitalizeFirst }}</span>
                  <span>{{ audit.audit_action | toLowerCase }}</span>
                  <span>{{ audit.audit_itemNo }}</span>
                  <span>on {{ getAuditDate(audit.created_at) }} at {{ getAuditTime(audit.created_at) }} </span>
                </div>
              </div>
              <!--  -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import Vue from "vue";
Vue.filter("toLowerCase", function (value) {
  if (!value) return "";
  return value.toString().toLowerCase();
});

Vue.filter('capitalizeFirst', function (value) {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
});

import PieChart from "~/components/DashboardCharts/PieChart.vue";
import PieChart2 from "~/components/DashboardCharts/PieChart2.vue";
import DoughnutChart from "~/components/DashboardCharts/DoughnutChart.vue";
import BarChart from "~/components/DashboardCharts/BarChart.vue";
export default {
  components: { PieChart, PieChart2, BarChart, DoughnutChart },
  data() {
    return {
      AssetCount: 0,
      AssetInUse: 0,
      LicenseCount: 0,
      AuditLogs: [],
      TransferList: [],
    };
  },
  created() {
    this.fetchDashboardData();
  },
  mounted() {
    let sidebarBtn = document.getElementById("bx-menu");
    sidebarBtn.addEventListener("click", () => {


    });
  },
  methods: {
    resizeHandler() {
      this.$refs.chart1.resize(); // Resize the first chart
      this.$refs.chart2.resize(); // Resize the second chart
    },
    getAuditTime(datetime) {
      const time = datetime ? new Date(datetime).toLocaleTimeString() : '';
      return time;
    },
    getAuditDate(datetime) {
      const date = datetime ? new Date(datetime).toLocaleDateString() : '';
      return date;
    },

    async fetchDashboardData() {
      try {
        const dashboardData = await this.$axios.$get("/dashboardData", {
          headers: {
            Authorization: "Bearer " + this.$cookies.get("authToken"),
          },
        });
        this.AssetCount = dashboardData.AssetCount;
        this.AssetInUse = dashboardData.AssetInUse;
        this.LicenseCount = dashboardData.LicenseCount;
        this.AuditLogs = dashboardData.AuditLogs;
        this.TransferList = dashboardData.TransferList;
      } catch (error) {
        console.error(error);
      }
    },
  },
  directives: {
    resize: {
      bind(el, binding, vnode) {
        const resizeObserver = new ResizeObserver(() => {
          vnode.context.$emit("resize");
        });
        resizeObserver.observe(el);
        el._resizeObserver = resizeObserver;
      },
      unbind(el) {
        el._resizeObserver.disconnect();
      },
    },
  },
};
</script>
<style scoped>
/* ============ CARDS =========== */
*::-webkit-scrollbar {
  display: auto;
  /* Chrome and Safari */
}

h5 {
  text-align: center;
}

.assetCardContainer {
  display: grid;

  justify-content: space-between;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
}

.assetContainer {
  display: grid;

  justify-content: space-between;
  grid-template-columns: 75% 25%;
  column-gap: 10px;
  padding: 2px 20px;
}

.divide-1 {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  column-gap: 10px;
}

.divide-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 10px;
}

.assetContainer-2 {
  display: grid;

  justify-content: space-between;
  grid-template-columns: 100%;
  column-gap: 10px;
  padding: 2px 20px;
  margin-top: 10px;
  margin-bottom: 50px;
}

.card-content {
  width: auto;
  background-color: var(--white-side);
  padding: 15px;
  border-radius: 25px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.1);
}

.card-content-dummy {
  height: 300px;
  background-color: var(--white-side);
  padding: 15px;
  border-radius: 25px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.1);
}

.card-content p {
  font-size: 45px;
  color: var(--font-color);
  font-weight: 600;
  line-height: 30px;
  padding-left: 10px;
  margin-top: 20px;
  display: inline-block;
}

.card-content p span {
  font-size: 20px;
  font-weight: 400;
  color: var(--font-color);
}

.box-icon {
  font-size: 50px;
  float: right;
  margin-top: 30px;
  color: var(--font-color);
  padding-right: 10px;
}

/* AUDIT */
.audit {
  padding: 10px;
}

.card-audit,
.card-history {
  background-color: var(--white-side);
  border: none !important;
  border-bottom: 1px solid var(--font-color) !important;
  border-radius: 0%;
}

.body-audit,
.body-history {
  padding: 8px 15px !important;
}

.charts {
  width: 100%;
}

/* MEDIA QUERY*/

@media screen and (max-width: 1440px) {
  .dashboard .charts {
    width: 95%;
    height: 90%;
  }

  .dashboard .box-icon {
    font-size: 40px;
  }

  .dashboard .card-content p {
    font-size: 35px;
  }

  .dashboard .card-content span {
    font-size: 15px;
  }

  .dashboard .assetContainer {
    grid-template-columns: 100%;
  }

  .dashboard .divide-1 {
    grid-template-columns: repeat(2, 1fr);
  }

  .dashboard .audit-top {
    margin-top: 10px;
  }
}

@media screen and (max-width: 1024px) {
  .dashboard .charts {
    width: 95%;
  }

  .dashboard .box-icon {
    font-size: 30px;
  }

  .dashboard .assetContainer {
    grid-template-columns: 100%;
  }
}</style>
