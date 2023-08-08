<template>
  <div class="auditHistory">
    <!-- ==============Audit History Search Modal================== -->
    <div class="AuditSearch" id="AuditSearch">
      <div class="SearchAudit SearchContainer">
        <div>
          <h4>Search</h4>
          <hr><br>
          <form action="">
            <label for="searchName">Name</label>
            <input type="text" v-model="filter.Name" id="searchName" class="form-control" placeholder="Name">
            <label for="searchPage">Category</label>
            <input type="text" v-model="filter.Page" id="searchPage" class="form-control" placeholder="Category">
            <label for="searchAction">Action</label>
            <input type="text" v-model="filter.Action" id="searchAction" class="form-control" placeholder="Action">
            <label for="searchItemNo">Item No</label>
            <input type="text" v-model="filter.Item" id="searchItemNo" class="form-control" placeholder="Item No">
            <label for="searchDate">Date</label>
            <input type="date" v-model="filter.Date" id="searchDate" class="form-control" placeholder="Date">
          </form>
        </div>
      </div>
    </div>
    <!-- ==============Audit History Start================== -->
    <div class="HistoryContent">
      <!-- ==================== SEARCH ==================== -->
      <div class="history_title">
        <div class="title">Audit History</div>
        <div class="searchs">
          <input type="text" v-model="SearchBox" class="form-control" id="search" placeholder="Search" />
          <i class="bx bx-filter" id="search-Btn-audit" style="font-size: 20px; cursor: pointer"></i>
        </div>
      </div>
      <!-- ==================== TABLES ==================== -->
      <div class="table100 ver2 m-b-110">
        <div class="table100-head">
          <table>
            <thead>
              <tr class="head">
                <th class="column1">No.</th>
                <th class="column2">Name</th>
                <th class="column3">Category</th>
                <th class="column4">Action</th>
                <th class="column5">Item No.</th>
                <th class="column6">Time</th>
                <th class="column7">Date</th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="table100-body js-pscroll">
          <table>
            <tbody>
              <template v-if="auditLogs.length > 0 && filteredItems[0].audit_Name">
                <tr class="body" v-for="(audit, index) in filteredItems">
                  <td class="column1">{{ index + 1 }}</td>
                  <td class="column2">{{ audit.audit_Name | capitalizeFirst }}</td>
                  <td class="column3">{{ audit.audit_Page }}</td>
                  <td class="column4">{{ audit.audit_action }}</td>
                  <td class="column5">{{ audit.audit_itemNo }}</td>
                  <td class="column6">{{ getAuditTime(audit.created_at) }}</td>
                  <td class="column7">{{ getAuditDate(audit.created_at) }}</td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="6" class="text-center">No data</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- ==============Audit History END================== -->
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
        Name: "",
        Page: "",
        Action: "",
        Item: "",
        Time: "",
        Date: "",
      },
      SearchBox: null,
      auditLogs: [],
    }
  },
  computed: {
    filteredItems() {
      if (this.SearchBox) {
        const searchBox = this.SearchBox.toLowerCase();
        const filtered = this.auditLogs.filter(item => {
          const NameMatch = item.audit_Name?.toLowerCase().includes(searchBox) ?? false;
          const PageMatch = item.audit_Page?.toLowerCase().includes(searchBox) ?? false;
          const ActionMatch = item.audit_action?.toLowerCase().includes(searchBox) ?? false;
          const ItemMatch = item.audit_itemNo?.toLowerCase().includes(searchBox) ?? false;

          return (
            NameMatch ||
            PageMatch ||
            ActionMatch ||
            ItemMatch
          );
        });
        return filtered.length > 0 ? filtered : [{ noMatch: "No Value" }];
      } else if (this.filter) {
        const { Name, Page, Action, Item, Time, Date } = this.filter;
        const lowercaseName = Name.toLowerCase();
        const lowercasePage = Page.toLowerCase();
        const lowercaseAction = Action.toLowerCase();
        const lowercaseItem = Item.toLowerCase();
        const searchDate = Date;

        const filtered = this.auditLogs.filter(item => {
          const NameMatch = lowercaseName ? item.audit_Name.toLowerCase().includes(lowercaseName) : true;
          const PageMatch = lowercasePage ? item.audit_Page.toLowerCase().includes(lowercasePage) : true;
          const ActionMatch = lowercaseAction ? item.audit_action.toLowerCase().includes(lowercaseAction) : true;
          const ItemMatch = lowercaseItem ? item.audit_itemNo.toLowerCase().includes(lowercaseItem) : true;
          const DateMatch = searchDate ? this.compareAuditDate(item.created_at, searchDate) : true;
          return (
            NameMatch &&
            PageMatch &&
            ActionMatch &&
            ItemMatch &&
            DateMatch
          );
        });
        return filtered.length > 0 ? filtered : [{ noMatch: "No Value" }];
      } else {
        return this.auditLogs;
      }
    }
  },
  created() {
    this.getLogs();
  },
  mounted() {
    let searchAudit = document.querySelector(".SearchAudit");
    let maincontainer = document.querySelector(".main-container");
    let searchBtn = document.getElementById("search-Btn-audit");
    let AuditBack = document.querySelector(".AuditSearch");
    searchBtn.addEventListener("click", () => {
      searchAudit.classList.toggle("show");
      maincontainer.classList.toggle("show");
      AuditBack.classList.toggle("show");
    });

    AuditBack.addEventListener("click", function (event) {
      if (event.target === this) {
        searchAudit.classList.toggle("show");
        maincontainer.classList.toggle("show");
        AuditBack.classList.toggle("show");
      }
    });
  },
  methods: {
    // Fetch audit logs from the server
    async getLogs() {
      try {
        // Make a GET request to fetch audit logs
        const audit_response = await this.$axios.$get('/auditlogs', {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('authToken')
          }
        });

        // Store fetched audit logs in the auditLogs variable
        this.auditLogs = audit_response.Logs;
      } catch (error) {
        // Handle error while fetching audit logs
        console.error(error);
      }
    },

    compareAuditTime(logTime, searchTime) {
      const logHourMinute = this.getAuditTime(logTime);
      return logHourMinute.includes(searchTime);
    },
    compareAuditDate(logDate, searchDate) {
      const logDayMonthYear = this.getAuditDate(logDate);
      return logDayMonthYear.includes(searchDate);
    },
    getAuditTime(datetime) {
      const time = datetime ? new Date(datetime).toLocaleString(undefined, {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }) : '';
      return time;
    },
    getAuditDate(datetime) {
      const date = new Date(datetime);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString();
      return `${year}-${month}-${day}`;
    },
  },
};
</script>

<style scoped>
.HistoryContent {
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
.history_title {
  margin: 0 0 15px 0;
  display: flex;
  justify-content: space-between;
}

.history_title .title {
  margin: 8px 0 0 35px;
  color: #818181;
}

.history_title .searchs {
  padding: 0;
  display: flex;
  justify-content: right;
  border-radius: 25px;
  width: 40%;
  margin-right: 1%;
}

.history_title .searchs i {
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

.SearchAudit.show {
  transition: all 1s ease;
  display: block;
  top: 50%;
}

.column1 {
  width: 8%;
}

.column2 {
  width: 17%;
}

.column3 {
  width: 17%;
}

.column4 {
  width: 17%;
}

.column5 {
  width: 17%;
}

.column6 {
  width: 17%;
}

.column7 {
  justify-content: center;
  text-align: center;
  width: 7%;
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

