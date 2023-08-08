<template>
  <div class="Inventory">
    <div class="InventorySearch" id="InventorySearch">
      <div class="SearchInventory SearchContainer">
        <div>
          <h4>Search</h4>
          <hr><br>
          <form action="">
            <label for="searchAssetNo">Asset No.</label>
            <input v-model="filter.asset_no" type="text" id="searchAssetNo" class="form-control" placeholder="Asset No.">
            <div class="searchDivide">
              <div>
                <label for="searchAssetClassification">Classification</label>
                <select v-model="filter.classification" id="searchAssetClassification" class="form-control">
                  <option value="" selected>Classification</option>
                  <option v-for="classification in this.$store.getters.getClassificationName" :value="classification"
                    :key="classification">
                    {{ classification }}
                  </option>
                </select>
              </div>
              <div>
                <label for="searchAssetCategory">Category</label>
                <select v-model="filter.category" id="searchAssetCategory" class="form-control" placeholder="Category">
                  <option value="" selected>Categories</option>
                  <option v-for="category in this.$store.getters.getCategoryName" :value="category" :key="category">
                    {{ category }}
                  </option>
                </select>
              </div>
            </div>
            <div class="searchDivide">
              <div>
                <label for="searchAssetType">Asset Type</label>
                <input v-model="filter.asset_type" type="text" id="searchAssetType" list="searchTypeOptions"
                  class="form-control" placeholder="Asset Type">
                <datalist id="searchTypeOptions">
                  <option v-for="assetType in this.$store.getters.getAssetTypesName" :value="assetType" :key="assetType">
                  </option>
                </datalist>
              </div>
              <div>
                <label for="searchAssetManufacturer">Manufacturer</label>
                <input v-model="filter.manufacturer" type="text" id="searchAssetManufacturer"
                  list="searchManufacturerOptions" class="form-control" placeholder="Manufacturer">
                <datalist id="searchManufacturerOptions">
                  <option v-for="manufacturer in this.$store.getters.getManufacturersName" :value="manufacturer"
                    :key="manufacturer"></option>
                </datalist>
              </div>
            </div>
            <div>
              <label for="searchAssetCategory">Responsible</label>
              <input v-model="filter.responsible" type="text" class="form-control" placeholder="Responsible">
            </div>
            <div>
              <label for="searchAssetCategory">Status Type</label>
              <select v-model="filter.status" id="searchAssetCategory" class="form-control" placeholder="Category">
                <option value="" selected>Status Type</option>
                <option v-for="status in this.$store.getters.getStatusTypeName" :value="status" :key="status">
                  {{ status }}
                </option>
              </select>
            </div>
            <br>
            <br>
            <br>
            <br>
          </form>
        </div>
      </div>
    </div>
    <div class="AssetContent">
      <!-- ==================== Card ==================== -->
      <div class="assetCardContainer">
        <!-- <div></div> -->
        <div class="cards">
          <div class="card-content">
            <p>{{ this.assetCount }}<br /><span>Total Assets</span></p>
            <i class="bx bx-box box-icon"></i>
          </div>
        </div>
        <div class="cards">
          <div class="card-content">
            <p>{{ this.assetsAvailable }}<br /><span>Available</span></p>
            <i class="bx bx-box box-icon"></i>
          </div>
        </div>
        <div class="cards">
          <div class="card-content">
            <p>{{ this.assetInUse }}<br /><span>In Use</span></p>
            <i class="bx bx-box box-icon"></i>
          </div>
        </div>

      </div>
      <!-- ==================== SEARCH ==================== -->
      <div class="license_title">
        <div class="display:grid;grid-template-columns:repeat(1,2fr);">
          <div class="title">Assets/List
            <button class="btn btn-secondary" v-if="this.asset_download === '1'" @click="exportData()">Download</button>
          </div>
        </div>
        <div class="searchs">
          <input type="text" v-model="SearchBox" class="form-control" id="search" placeholder="Search" />
          <i class="bx bx-filter" id="search-Btn" style="font-size: 20px; cursor: pointer"></i>
        </div>
      </div>
      <!-- ==================== TABLES ==================== -->
      <div class="table100 ver2 m-b-110">
        <div class="table100-head">
          <table>
            <thead>
              <tr class="head">
                <th class="column1">ID</th>
                <th class="column2">Asset No</th>
                <th class="column3">Classification</th>
                <th class="column4">Category</th>
                <th class="column5">Asset Type</th>
                <th class="column6">Responsible</th>
                <th class="column7">Status</th>
                <th class="column8">Manufacturer</th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="table100-body js-pscroll">
          <table>
            <tbody>
              <!-- Display a table row for each asset in the filteredItems array -->
              <template v-if="Asset_List.length > 0 && filteredItems[0].asset_no">
                <tr class="body" v-for="(asset, index) in filteredItems"
                  @click="getID(asset.id, asset.asset_no, asset.asset_type)" v-b-modal.View>
                  <td class="column1">{{ index + 1 }}</td> <!-- Display index + 1 as column number -->
                  <td class="column2">{{ asset.asset_no }}</td> <!-- Display asset number -->
                  <td class="column3">{{ asset.classification }}</td> <!-- Display asset classification -->
                  <td class="column4">{{ asset.category }}</td> <!-- Display asset category -->
                  <td class="column5">{{ asset.asset_type }}</td> <!-- Display asset type -->
                  <td class="column6" v-if="asset.responsible">{{ asset.responsible | splitWordsAndCapitalize }}</td>
                  <!-- Display asset responsible, capitalize and split words -->
                  <td class="column6" v-else>N/A</td> <!-- Display "N/A" if no responsible value -->
                  <td class="column7" v-if="asset.status">{{ asset.status }}</td> <!-- Display asset status -->
                  <td class="column7" v-else>N/A</td> <!-- Display "N/A" if no status value -->
                  <td class="column8">{{ asset.manufacturer }}</td> <!-- Display asset manufacturer -->
                </tr>
              </template>
              <!-- Display a row with "No data" message if no assets are available -->
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
    <!-- BootstrapVue modal component with ID "View" -->
    <b-modal id="View" size="xl" title="Small Modal" hide-header hide-footer style="overflow-y: auto; height: 500px">
      <!-- Display the AssetView component inside the modal -->
      <AssetView />
    </b-modal>
  </div>
</template>

<script>
import Vue from "vue";

// Vue filter to split words in the input string, capitalize the first letter of each word,
// and then join them back together with spaces
Vue.filter('splitWordsAndCapitalize', (input) => {
  if (!input) return ''; // Return an empty string if input is falsy

  // Split the input string into an array of words, capitalize the first letter of each word,
  // and then join the words back together with spaces
  return input
    .split(' ')
    .map((word) => {
      return Vue.options.filters.capitalizeFirst(word); // Capitalize the first letter of the word
    })
    .join(' ');
});

import AssetView from "~/components/Asset/View.vue";
import ExcelJS from 'exceljs';
import fileDownload from 'js-file-download';
export default {
  components: { AssetView },
  data() {
    return {
      filter: {
        asset_no: "",
        classification: "",
        category: "",
        asset_type: "",
        manufacturer: "",
        responsible: "",
        status: ""
      },
      SearchBox: null,
      Asset_List: [],
      selectedAsset: [],
      assetsAvailable: 0,
      assetCount: 0,
      assetInUse: 0,
      na: "N/A",
      id: {
        asset_id: null,
        asset_type: null,
      },

      assetDetailsSortBy: 'asset_no', // Default column to sort by
      assetDetailsSortDesc: false, // Default sort order (ascending)
      asset_download: null,
    }
  },
  computed: {
    // Computed property for filtering items based on search box or filter criteria
    filteredItems() {
      if (this.SearchBox) {
        // If there's a search query in the SearchBox
        const searchBox = this.SearchBox.toLowerCase();
        const filtered = this.Asset_List.filter(item => {
          // Check for matches in various fields and return true if any match is found
          const assetNoMatch = item.asset_no?.toLowerCase().includes(searchBox) ?? false;
          const classificationMatch = item.classification?.toLowerCase().includes(searchBox) ?? false;
          const categoryMatch = item.category?.toLowerCase().includes(searchBox) ?? false;
          const typeMatch = item.asset_type?.toLowerCase().includes(searchBox) ?? false;
          const manufacturerMatch = item.manufacturer?.toLowerCase().includes(searchBox) ?? false;
          const responsibleMatch = item.responsible?.toLowerCase().includes(searchBox) ?? false;
          const statusMatch = item.status?.toLowerCase().includes(searchBox) ?? false;
          return (
            assetNoMatch ||
            classificationMatch ||
            categoryMatch ||
            typeMatch ||
            manufacturerMatch ||
            responsibleMatch ||
            statusMatch
          );
        });
        // Return filtered results or a placeholder if no matches are found
        return filtered.length > 0 ? filtered : [{ noMatch: "No Value" }];
      } else if (this.filter) {
        // If filter criteria are provided
        const { asset_no, classification, category, asset_type, manufacturer, responsible, status } = this.filter;
        const lowercaseAssetNo = asset_no ? asset_no.toLowerCase() : null;
        const lowercaseClassification = classification ? classification.toLowerCase() : null;
        const lowercaseCategory = category ? category.toLowerCase() : null;
        const lowercaseAssetType = asset_type ? asset_type.toLowerCase() : null;
        const lowercaseManufacturer = manufacturer ? manufacturer.toLowerCase() : null;
        const lowercaseResponsible = responsible ? responsible.toLowerCase() : null;
        const lowercaseStatus = status ? status.toLowerCase() : null;

        const filtered = this.Asset_List.filter(item => {
          // Check for matches in filter criteria and return true if all match
          const assetNoMatch = lowercaseAssetNo ? (item.asset_no && item.asset_no.toLowerCase().includes(lowercaseAssetNo)) : true;
          const classificationMatch = lowercaseClassification ? (item.classification && item.classification.toLowerCase().includes(lowercaseClassification)) : true;
          const categoryMatch = lowercaseCategory ? (item.category && item.category.toLowerCase().includes(lowercaseCategory)) : true;
          const typeMatch = lowercaseAssetType ? (item.asset_type && item.asset_type.toLowerCase().includes(lowercaseAssetType)) : true;
          const manufacturerMatch = lowercaseManufacturer ? (item.manufacturer && item.manufacturer.toLowerCase().includes(lowercaseManufacturer)) : true;
          const responsibleMatch = lowercaseResponsible ? (item.responsible && item.responsible.toLowerCase().includes(lowercaseResponsible)) : true;
          const statusMatch = lowercaseStatus ? (item.status && item.status.toLowerCase().includes(lowercaseStatus)) : true;

          return (
            assetNoMatch &&
            classificationMatch &&
            categoryMatch &&
            typeMatch &&
            manufacturerMatch &&
            responsibleMatch &&
            statusMatch
          );
        });
        // Return filtered results or a placeholder if no matches are found
        return filtered.length > 0 ? filtered : [{ noMatch: "No Value" }];
      } else {
        // No search query or filter provided, return all items
        return this.Asset_List;
      }
    }
  },
  mounted() {
    this.$store.dispatch('getCategories');
    this.$store.dispatch('getClassifications');
    this.$store.dispatch('getAssetTypes');
    this.$store.dispatch('getManufacturers');
    this.$store.dispatch('getStatusType');

    // Get references to relevant DOM elements
    let searchInventory = document.querySelector(".SearchInventory"); // Element to show/hide on search button click
    let maincontainer = document.querySelector(".main-container"); // Main content container
    let searchBtn = document.getElementById("search-Btn"); // Search button element
    let InventoryBack = document.querySelector(".InventorySearch"); // Element to hide on background click

    // Add event listener to the search button
    searchBtn.addEventListener("click", () => {
      // Toggle the "show" class on elements to control their visibility
      searchInventory.classList.toggle("show"); // Show/hide search inventory
      maincontainer.classList.toggle("show"); // Show/hide main container
      InventoryBack.classList.toggle("show"); // Show/hide inventory background
    });

    // Add event listener to the inventory background element
    InventoryBack.addEventListener("click", function (event) {
      // Check if the click target is the background element itself
      if (event.target === this) {
        // Toggle the "show" class on elements to revert their visibility
        searchInventory.classList.toggle("show"); // Show/hide search inventory
        maincontainer.classList.toggle("show"); // Show/hide main container
        InventoryBack.classList.toggle("show"); // Show/hide inventory background
      }
    });
  },
  created() {
    this.getAssetDetails();

    const permissions = this.$cookies.get('permission');
    this.asset_download = permissions[0].asset_download;
  },
  methods: {
    exportData() {
      console.log(this.filteredItems);
      const mainTitle = 'Main Title';
      const title = [
        "Asset No.",
        "Classification",
        "Category",
        "Asset Type",
        "Manufacturer",
        "Serial No.",
        "Model",
        "Description",
        "Item Code",
        "Company",
        "Supplier",
        "Amount",
        "Date",
        "Site",
        "Area",
        "Responsible",
        "Department",
        "Roles",
        "Status",
        "Remarks",
      ]; // Your custom title here

      // Prepare data as an array of arrays for Excel export
      const dataAsArrayOfArrays = this.filteredItems.map(item => Object.values(item).slice(1));
      const dataWithCustomCell = [title, ...dataAsArrayOfArrays];

      // Call the exportToExcel function to generate the Excel file
      this.exportToExcel(mainTitle, dataWithCustomCell);
    },
    // Function to export data to an Excel spreadsheet
    exportToExcel(mainTitle, data) {
      // Create a new Excel workbook
      const workbook = new ExcelJS.Workbook();
      // Add a worksheet named 'Data'
      const worksheet = workbook.addWorksheet('Data');

      // Merge cells for the main title (A1 to D5)
      worksheet.mergeCells(1, 1, 1, 8);
      const Details = worksheet.getCell(1, 8);
      Details.value = "ASSET DETAILS";
      Details.font = { bold: false, size: 11 };
      Details.alignment = { vertical: 'middle', horizontal: 'center' }; // Customize the font size or other styles as needed
      worksheet.mergeCells(1, 9, 1, 13);
      const Purchase = worksheet.getCell(1, 13);
      Purchase.value = "ASSET PURCHASE";
      Purchase.font = { bold: false, size: 11 };
      Purchase.alignment = { vertical: 'middle', horizontal: 'center' }; // Customize the font size or other styles as needed
      worksheet.mergeCells(1, 14, 1, 20);
      const Location = worksheet.getCell(1, 20);
      Location.value = "ASSET LOCATION";
      Location.font = { bold: false, size: 11 };
      Location.alignment = { vertical: 'middle', horizontal: 'center' }; // Customize the font size or other styles as needed

      // Custom title row (starting from the second row)
      const titleRow = worksheet.addRow(data[0]);
      titleRow.eachCell(cell => {
        cell.font = { bold: true };
        cell.alignment = { wrapText: true };
      });

      for (let col = 1; col <= 20; col++) {
        const cell = worksheet.getCell(1, col);
        if (col >= 1 && col <= 8) {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'ffff00' }, // Red background color
          };
        } else if (col >= 9 && col <= 12) {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'e7e6e6' }, // Blue background color
          };
        } else if (col >= 13 && col <= 20) {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'e2efda' }, // Blue background color
          };
        }
      }
      // Add the data to the worksheet
      for (let i = 1; i < data.length; i++) {
        const dataRow = worksheet.addRow(data[i]);
        dataRow.eachCell(cell => {
          cell.alignment = { wrapText: true };
        });
      }

      // Auto-fit columns
      worksheet.columns.forEach(column => {
        column.width = undefined;
        let maxLength = 0;
        column.eachCell({ 'force': true }, cell => {
          const cellLength = cell.value ? cell.value.toString().length : 0;
          if (cellLength > maxLength) {
            maxLength = cellLength;
          }
        });
        column.width = maxLength < 15 ? 15 : maxLength; // Minimum column width of 15 (you can adjust this value)
      });

      workbook.xlsx.writeBuffer().then(buffer => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fileDownload(blob, 'data.xlsx');
      });
    },
    // Function to set the selected asset ID, asset type, and update audit data
    getID(value, asset, type) {
      this.id.asset_id = value; // Set the selected asset ID
      this.id.asset_type = type; // Set the selected asset type
      this.$store.commit('setAuditItemNo', asset); // Update audit item number in Vuex store
      this.$store.commit('setData', this.id); // Update data in Vuex store
    },
    // Asynchronous function to fetch asset details from the server
    async getAssetDetails() {
      try {
        // Make a GET request to fetch all asset details with authentication token
        const response = await this.$axios.$get('/getAllDetails', {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('authToken')
          }
        });

        // Update local data with fetched response
        this.Asset_List = response.Asset_List; // Store the list of assets
        this.Asset_List.sort((a, b) => b.id - a.id); // Sort the asset list by ID in descending order
        this.assetCount = response.AssetCount; // Store the total count of assets
        this.assetsAvailable = response.AssetsAvailable; // Store the count of available assets
        this.assetInUse = response.AssetsInUse; // Store the count of assets in use
      } catch (error) {
        console.error(error); // Log any errors that occur during the request
      }
    },
  }
}
</script>

<style scoped>
.custom-button {
  /* Remove default button styles */
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  /* Add any additional custom styles as needed */
}

.AssetContent {
  display: grid;
  width: 100%;
  padding: 2%;
  justify-content: space-between;
  grid-template-columns: 100%;
}

.form-control {
  margin-bottom: 13px;
}

/* ============ CARDS =========== */
.assetCardContainer {
  display: grid;
  width: 100%;
  justify-content: space-between;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
}

.cards {
  width: 100%;
  float: left;
}

.card-content {
  width: 100%;
  height: 130px;
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
  font-size: 50px !important;
  float: right;
  margin-top: 30px !important;
  color: var(--font-color);
  padding-right: 10px;
}

/* Search */
.license_title {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

.license_title .title {
  margin: 8px 0 0 35px;
  color: #818181;
}

.license_title .searchs {
  padding: 0;
  display: flex;
  justify-content: right;
  border-radius: 25px;
  width: 40%;
  margin-right: 1%;
}

.license_title .searchs i {
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

.SearchInventory.show {
  transition: all 1s ease;
  display: block;
  top: 50%;

}

/* download button*/
.license_title .btn {
  font-size: 12px;
}

/* ========COLUMN TABLE========== */

.column1 {
  width: 6%;
}

.column2 {
  width: 12%;
}

.column3 {
  width: 14%;
}

.column4 {
  width: 12%;
}

.column5 {
  width: 14%;
}

.column6 {
  width: 14%;
}

.column7 {
  width: 14%;
}

.column8 {
  width: 14%;
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
