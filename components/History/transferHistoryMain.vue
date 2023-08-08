<template>
  <div class="Transfer">
    <div class="TransferSearch" id="TransferSearch">
      <div class="SearchTransfer SearchContainer">
        <div>
          <h4>Search</h4>
          <hr><br>
          <form action="">
            <label for="searchAssetNo">Asset No.</label>
            <input type="text" v-model="filter.Asset" id="searchAssetNo" class="form-control" placeholder="Asset No.">
            <label for="searchFrom">From</label>
            <input type="text" v-model="filter.From" id="searchFrom" class="form-control" placeholder="From">
            <label for="searchSite">Site</label>
            <input type="text" v-model="filter.Site" id="searchSite" class="form-control" placeholder="Site">
            <label for="searchArea">Area</label>
            <input type="text" v-model="filter.Area" id="searchArea" class="form-control" placeholder="Area">
            <label for="searchResponsible">To</label>
            <input type="text" v-model="filter.Responsible" id="searchResponsible" class="form-control"
              placeholder="Responsible">
            <label for="searchRole">Role</label>
            <input type="text" v-model="filter.Role" id="searchRole" class="form-control" placeholder="Role">
            <label for="searchStatus">Status</label>
            <input type="text" v-model="filter.Status" id="searchStatus" class="form-control" placeholder="Status">
          </form>
        </div>
      </div>
    </div>
    <div class="TransferContent">
      <!-- ==================== SEARCH ==================== -->
      <div class="Transfer_title">
        <div class="title">Transfer History</div>
        <div class="searchs">
          <input type="text" v-model="SearchBox" class="form-control" id="search" placeholder="Search" />
          <i class="bx bx-filter" id="search-Btn-Transfer" style="font-size: 20px; cursor: pointer"></i>
        </div>
      </div>
      <!-- ==================== TABLES ==================== -->
      <div class="table100 ver2 m-b-110">
        <div class="table100-head">
          <table>
            <thead>
              <tr class="head">
                <th class="column1">No</th>
                <th class="column2">Asset</th>
                <th class="column3">From</th>
                <th class="column4">Site</th>
                <th class="column5">Area</th>
                <th class="column6">To</th>
                <th class="column7">Role</th>
                <th class="column8">Date Transferred</th>
                <th class="column9">Status</th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="table100-body js-pscroll">
          <table>
            <tbody>
              <template v-if="TransferLogs.length > 0 && filteredItems[0].asset_no">
                <tr class="body" v-for="(logs, index) in filteredItems">
                  <td class="column1">{{ index + 1 }}</td>
                  <td class="column2">{{ logs.asset_no }}</td>
                  <td class="column3">{{ logs.from | capitalizeFirst }}</td>
                  <td class="column4">{{ logs.site | capitalizeFirst }}</td>
                  <td class="column5">{{ logs.area | capitalizeFirst }}</td>
                  <td class="column6">{{ logs.responsible | capitalizeFirst }}</td>
                  <td class="column7">{{ logs.role }}</td>
                  <td class="column8">{{ logs.transferred_date }}</td>
                  <td class="column9">{{ logs.status }}</td>
                </tr>
              </template>
              <template v-else>
                <tr class="body">
                  <td colspan="6" class="text-center">No data</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

Vue.filter('capitalizeFirst', function (value) {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
});


export default {
  data() {
    return {
      filter: {
        Asset: "",
        From: "",
        Site: "",
        Area: "",
        Responsible: "",
        Role: "",
        Status: "",
      },
      TransferLogs: [],
      SearchBox: null,
    };
  },
  computed: {
    filteredItems() {
      if (this.SearchBox) {
        const searchBox = this.SearchBox.toLowerCase();
        const filtered = this.TransferLogs.filter((item) => {
          const assetNoMatch = item.asset_no?.toLowerCase().includes(searchBox) ?? false;
          const fromMatch = item.from?.toLowerCase().includes(searchBox) ?? false;
          const siteMatch = item.site?.toLowerCase().includes(searchBox) ?? false;
          const areaMatch = item.area?.toLowerCase().includes(searchBox) ?? false;
          const responsibleMatch = item.responsible?.toLowerCase().includes(searchBox) ?? false;
          const roleMatch = item.role?.toLowerCase().includes(searchBox) ?? false;
          const statusMatch = item.status?.toLowerCase().includes(searchBox) ?? false;
          return (
            assetNoMatch ||
            fromMatch ||
            siteMatch ||
            areaMatch ||
            responsibleMatch ||
            roleMatch ||
            statusMatch
          );
        });
        return filtered.length > 0 ? filtered : [{ noMatch: "NO VALUE" }];
      } else if (this.filter) {
        const {
          Asset, From, Site, Area, Responsible, Role, Status
        } = this.filter;
        const LowerCaseassetNo = Asset ? Asset.toLowerCase() : null;
        const LowerCasefrom = From ? From.toLowerCase() : null;
        const LowerCasesite = Site ? Site.toLowerCase() : null;
        const LowerCasearea = Area ? Area.toLowerCase() : null;
        const LowerCaseresponsible = Responsible ? Responsible.toLowerCase() : null;
        const LowerCaserole = Role ? Role.toLowerCase() : null;
        const LowerCasestatus = Status ? Status.toLowerCase() : null;

        const filtered = this.TransferLogs.filter((item) => {
          const assetNoMatch = LowerCaseassetNo ? item.asset_no.toLowerCase().includes(LowerCaseassetNo) : true;
          const fromMatch = LowerCasefrom ? item.from.toLowerCase().includes(LowerCasefrom) : true;
          const siteMatch = LowerCasesite ? item.site.toLowerCase().includes(LowerCasesite) : true;
          const areaMatch = LowerCasearea ? item.area.toLowerCase().includes(LowerCasearea) : true;
          const responsibleMatch = LowerCaseresponsible ? item.responsible.toLowerCase().includes(LowerCaseresponsible) : true;
          const roleMatch = LowerCaserole ? item.role.toLowerCase().includes(LowerCaserole) : true;
          const statusMatch = LowerCasestatus ? item.status.toLowerCase().includes(LowerCasestatus) : true;
          return (
            assetNoMatch &&
            fromMatch &&
            siteMatch &&
            areaMatch &&
            responsibleMatch &&
            roleMatch &&
            statusMatch
          );
        });
        return filtered.length > 0 ? filtered : [{ noMatch: "NO VALUE" }];
      } else {
        // No search query or filter provided, return all items
        return this.TransferLogs;
      }
    },
  },
  created() {
    this.fetchAssets();

  },
  mounted() {
    let searchTransfer = document.querySelector(".SearchTransfer");
    let maincontainer = document.querySelector(".main-container");
    let searchBtn = document.getElementById("search-Btn-Transfer");
    let TransferBack = document.querySelector(".TransferSearch");
    searchBtn.addEventListener("click", () => {
      searchTransfer.classList.toggle("show");
      maincontainer.classList.toggle("show");
      TransferBack.classList.toggle("show");
    });

    TransferBack.addEventListener("click", function (event) {
      if (event.target === this) {
        searchTransfer.classList.toggle("show");
        maincontainer.classList.toggle("show");
        TransferBack.classList.toggle("show");
      }
    });
  },
  methods: {

    // Fetch asset transfer logs from the server
    async fetchAssets() {
      try {
        // Make a GET request to fetch asset transfer logs
        const response = await this.$axios.$get("/logs", {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('authToken')
          }
        });

        // Store fetched transfer logs in the TransferLogs variable
        this.TransferLogs = response.history;
      } catch (error) {
        // Handle error while fetching asset transfer logs
        console.error(error);
      }
    },

  },
};
</script>


<style scoped>
.TransferContent {
  display: grid;
  width: 100%;
  padding: 2%;
  justify-content: space-between;
  grid-template-columns: 100%;
}

.form-control {
  margin-bottom: 13px;
}

/* Search */
.Transfer_title {
  margin: 0 0 15px 0;
  display: flex;
  justify-content: space-between;
}

.Transfer_title .title {
  margin: 8px 0 0 35px;
  color: #818181;
}

.Transfer_title .searchs {
  padding: 0;
  display: flex;
  justify-content: right;
  border-radius: 25px;
  width: 40%;
  margin-right: 1%;
}

.Transfer_title .searchs i {
  margin-left: -25px;
  margin-top: 8px;
}

.searchs .form-control {
  padding: 10;
  margin: 0;
  border-radius: 15px;
  background: var(--white-side);
  border: none;
}

.SearchTransfer.show {
  transition: all 1s ease;
  display: block;
  top: 50%;

}

/* =====COLUMN TABLE===== */

.column1 {
  width: 7%;
}

.column2 {
  width: 7%;
}

.column3 {
  width: 14%;
}

.column4 {
  width: 11%;
}

.column5 {
  width: 11%;
}

.column6 {
  width: 15%;
}

.column7 {
  width: 10%;
}

.column8 {
  width: 15%;
}

.column9 {
  width: 10%;
}

.form-control {
  color: var(--font-color);
}

.form-control::placeholder {
  color: var(--font-color);
}

.form-control::-webkit-calendar-picker-indicator {
  color: var(--font-color) !important;

}
</style>
