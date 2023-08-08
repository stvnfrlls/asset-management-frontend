<template>
  <div class="License">
    <div class="InventorySearch" id="InventorySearch">
      <div class="SearchInventory SearchContainer">
        <div class="licenseAddContainer">
          <h4>Asset Licensing</h4>
          <hr />
          <br />
          <form action="">
            <div>
              <label for="LicenseSoftware">Category</label>
              <select v-model="filter.category" id="searchLicenseSoftware" class="form-control">
                <option value="" disabled selected>Please select an option</option>
                <option v-for="software_category in Software_Category" :value="software_category"
                  :key="software_category">
                  {{ software_category }}
                </option>
              </select>
            </div>
            <div>
              <label for="LicenceVersion">Software</label>
              <input type="text" v-model="filter.software" id="LicenceVersion" class="form-control"
                placeholder="Software" />
            </div>
            <div>
              <label for="LicenceVersion">Version</label>
              <input type="text" v-model="filter.version" id="LicenceVersion" class="form-control"
                placeholder="Version" />
            </div>
            <div>
              <label for="LicenseKey">License Key</label>
              <input type="text" v-model="filter.key" id="LicenseKey" class="form-control" placeholder="License Key" />
            </div>
            <br />
            <div style="justify-content: center; text-align: center">
              <div class="form-check-inline">
                <label class="form-check-label" style="color: var(--font-color;)">
                  <input type="radio" v-model="filter.status" class="form-check-input" name="used"
                    value="AVAILABLE" />Available
                </label>
              </div>
              <div class="form-check-inline">
                <label class="form-check-label" style="color: var(--font-color;)">
                  <input type="radio" v-model="filter.status" class="form-check-input" name="used" value="IN USE" />Used
                </label>
              </div>
            </div>
            <br />
            <br />
          </form>
        </div>
      </div>
    </div>
    <div class="AssetContent">
      <!-- ==================== Card ==================== -->
      <div class="assetCardContainer">
        <div class="cards">
          <div class="card-content">
            <p>{{ LicenseCount }}<br /><span>Total</span></p>
            <i class="bx bx-box box-icon"></i>
          </div>
        </div>
        <div class="cards">
          <div class="card-content">
            <p>{{ LicenseAvailable }}<br /><span>Available</span></p>
            <i class="bx bx-box box-icon"></i>
          </div>
        </div>
        <div class="cards">
          <div class="card-content">
            <p>{{ LicenseInUse }}<br /><span>In Use</span></p>
            <i class="bx bx-box box-icon"></i>
          </div>
        </div>

      </div>
      <!-- ==================== SEARCH ==================== -->
      <div class="license_title">
        <div class="title">Licensing/List</div>
        <div class="searchs">
          <input type="text" v-model="SearchBox" class="form-control" id="search" placeholder="Search software" />
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
                <th class="column2">Category</th>
                <th class="column3">Software</th>
                <th class="column4">Version</th>
                <th class="column5">License Key</th>
                <th class="column6">Status</th>
                <th class="column7">Action</th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="table100-body js-pscroll">
          <table>
            <tbody>
              <template v-if="License_list.length > 0 && filteredItems[0].id">
                <tr class="body" v-for="(license) in filteredItems" :key="license.id">
                  <td class="column1">{{ license.id }}</td>
                  <td class="column2">{{ license.category }}</td>
                  <td class="column3">{{ license.software }}</td>
                  <td class="column4">{{ license.version }}</td>
                  <td class="column5">{{ license.license_key }}</td>
                  <td class="column6">{{ license.status }}</td>
                  <td class="tb column7">
                    <i v-if="lcs_update === '1'" class='bx bx-edit-alt' @click="showupdateLicense(license.id)"></i>
                    <i v-else class='bx bx-edit-alt-disabled'></i>

                    <i v-if="lcs_delete === '1'" class='bx bx-trash' @click="deleteLicense(license.id)"></i>
                    <i v-else class='bx bx-trash-disabled'></i>
                  </td>
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
    <b-modal id="licenseUpdate" size="md" title="Small Modal" hide-header hide-footer style="overflow-y: auto;">
      <div class="licenseContainerUpdate">
        <h4>License Update</h4>
        <hr />
        <br />
        <div class="form-group">
          <label for="LicenseSoftware">Category</label>
          <b-form-select v-model="update.category" id="searchLicenseSoftware" class="form-control"
            :options="Software_Category_Options" />
        </div>
        <div>
          <label for="LicenceVersion">Software</label>
          <input type="text" v-model="update.software" id="LicenceVersion" class="form-control" placeholder="Software" />
        </div>
        <div>
          <label for="LicenceVersion">Version</label>
          <input type="text" v-model="update.version" id="LicenceVersion" class="form-control" placeholder="Version" />
        </div>
        <div>
          <label for="LicenseKey">License Key</label>
          <input type="text" v-model="update.license_key" id="LicenseKey" class="form-control"
            placeholder="License Key" />
        </div>
        <div style="justify-content: center; text-align: center">
          <div class="form-check-inline">
            <label class="form-check-label" style="color: black">
              <input type="radio" v-model="update.status" class="form-check-input" value="available" />Available
            </label>
          </div>
          <div class="form-check-inline">
            <label class="form-check-label" style="color: black">
              <input type="radio" v-model="update.status" class="form-check-input" value="in Use" />In Use
            </label>
          </div>
          <br />
          <br />
          <div class="button">
            <button type="button" class="btn btn-primary" :disabled="isLoading">
              <div v-if="isLoading" style="flex">
                <div class="spinner-border text-primary" role="status">
                </div>
              </div>
              <div v-else>
                <span class="button" @click="updateLicense">Submit</span>
              </div>
            </button>
          </div>
          <br />
          <br />
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      filter: {
        category: '',
        software: '',
        version: '',
        key: '',
        status: '',
      },
      update: {
        license_id: null,
        category: null,
        software: null,
        version: null,
        license_key: null,
        status: null
      },
      SearchBox: null,
      selectedValue: null,
      License_list: [],
      LicenseCount: 0,
      LicenseAvailable: 0,
      LicenseInUse: 0,
      LicenseExpired: 0,
      Software_Category: [],
      Software_Category_Options: [],
      isLoading: false,
      lcs_update: null,
      lcs_delete: null,
    };
  },
  computed: {
    filteredItems() {
      if (this.SearchBox) {
        const searchBox = this.SearchBox.toLowerCase();

        const filtered = this.License_list.filter((item) => {
          const CategoryMatch = item.category?.toLowerCase().includes(searchBox) ?? false;
          const SoftwareMatch = item.software?.toLowerCase().includes(searchBox) ?? false;
          const VersionMatch = item.version?.toLowerCase().includes(searchBox) ?? false;
          const KeyMatch = item.license_key?.toLowerCase().includes(searchBox) ?? false;
          const StatusMatch = item.status?.toLowerCase().includes(searchBox) ?? false;

          return CategoryMatch || SoftwareMatch || VersionMatch || KeyMatch || StatusMatch;
        });
        return filtered.length > 0 ? filtered : [{ noMatch: "No Value" }];
      } else {
        const lowercaseCategory = this.filter.category ? this.filter.category.toLowerCase() : null;
        const lowercaseSoftware = this.filter.software ? this.filter.software.toLowerCase() : null;
        const lowercaseVersion = this.filter.version ? this.filter.version.toLowerCase() : null;
        const lowercaseKey = this.filter.key ? this.filter.key.toLowerCase() : null;
        const lowercaseStatus = this.filter.status ? this.filter.status : null;
        const filtered = this.License_list.filter((item) => {
          const CategoryMatch = lowercaseCategory ? (item.category && item.category.includes(lowercaseCategory)) : true;
          const SoftwareMatch = lowercaseSoftware ? (item.software && item.software.toLowerCase().includes(lowercaseSoftware)) : true;
          const VersionMatch = lowercaseVersion ? (item.version && item.version.toLowerCase().includes(lowercaseVersion)) : true;
          const KeyMatch = lowercaseKey ? (item.license_key && item.license_key.toLowerCase().includes(lowercaseKey)) : true;
          const StatusMatch = lowercaseStatus ? (item.status && item.status.includes(lowercaseStatus)) : true;

          return CategoryMatch && SoftwareMatch && VersionMatch && KeyMatch && StatusMatch;
        });
        return filtered.length > 0 ? filtered : [{ noMatch: "No Value" }];
      }
    }
  },
  created() {
    const permissions = this.$cookies.get('permission');
    this.lcs_update = permissions[0].license_update;
    this.lcs_delete = permissions[0].license_delete;
  },
  mounted() {
    this.fetchDropdowns();
    this.fetchLicenses();
    this.fetchSoftwareCategory();

    let searchInventory = document.querySelector(".SearchInventory");
    let maincontainer = document.querySelector(".main-container");
    let searchBtn = document.getElementById("search-Btn");
    let InventoryBack = document.querySelector(".InventorySearch");

    searchBtn.addEventListener("click", () => {
      searchInventory.classList.toggle("show");
      maincontainer.classList.toggle("show");
      InventoryBack.classList.toggle("show");
    });

    InventoryBack.addEventListener("click", function (event) {
      if (event.target === this) {
        searchInventory.classList.toggle("show");
        maincontainer.classList.toggle("show");
        InventoryBack.classList.toggle("show");
      }
    });
  },
  methods: {
    // Display the modal for updating a license and fetch license details
    async showupdateLicense(license) {
      try {
        // Show the update license modal
        this.$bvModal.show("licenseUpdate");

        // Set the license ID for updating
        this.update.license_id = license;

        // Fetch license details
        const response = await this.$axios.$get(`/licenses/${license}`, {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('authToken')
          }
        });

        // Set the update form fields with fetched details
        this.update.category = response.License_Details[0].category;
        this.update.software = response.License_Details[0].software;
        this.update.version = response.License_Details[0].version;
        this.update.license_key = response.License_Details[0].license_key;
        this.update.status = response.License_Details[0].status;
      } catch (error) {
        // Handle error while fetching license details
        Swal.fire('Error', 'Error occurred while fetching license details. Try again.', 'error');
      }
    },

    // Update the license details
    async updateLicense() {
      try {
        // Make a POST request to update license details
        const response = await this.$axios.$post(`/updateLicenses/${this.update.license_id}`, this.update, {
          headers: {
            Authorization: "Bearer " + this.$cookies.get("authToken"),
          },
        });

        // Show success notification and reload page
        if (response) {
          Swal.fire('Success', 'License details updated', 'success').then((result) => {
            location.reload();
          })
        }
      } catch (error) {
        // Handle error while updating license details
        Swal.fire('Error', 'Error occurred while updating license details', 'error');
      }
    },

    // Delete a license
    async deleteLicense(license) {
      try {
        // Make a POST request to delete a license
        const response = await this.$axios.$post(`/deleteLicense/${license}`, {}, {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('authToken'),
            Accept: 'application/json'
          }
        });

        // Show success notification and reload page
        Swal.fire('Success', 'License details deleted', 'success').then((result) => {
          location.reload();
        })
      } catch (error) {
        // Handle error while deleting license details
        Swal.fire('Error', 'Error occurred while deleting license details', 'error');
      }
    },

    // Fetch dropdown options for software categories
    async fetchDropdowns() {
      try {
        // Check if Software_Category_Options data is cached in local storage
        const Software_Category = localStorage.getItem('Software_Category_Options');

        if (Software_Category) {
          // If cached data exists, use it for Software_Category_Options
          const responseData = JSON.parse(Software_Category);
          this.Software_Category_Options = responseData;
        } else {
          // If cached data doesn't exist, fetch software categories from the server
          const software_categories_response = await this.$axios.$get('/getSoftwareCategory');

          // Construct options array for software categories dropdown
          const Sotware_Category_Options = [
            { value: null, text: 'Please select an option' },
            ...software_categories_response.software_category.map(software_categories => ({
              value: software_categories.id,
              text: software_categories.software_category
            }))
          ];

          // Cache the options data in local storage
          localStorage.setItem('Software_Category_Options', JSON.stringify(Sotware_Category_Options));
        }
      } catch (error) {
        console.error(error);
      }
    },

    fetchSoftwareCategory() {
      this.$axios.$get('/getSoftwareCategory').then(res => {
        this.Software_Category = [...res.software_category.map(software_category => software_category.software_category)];
      })
    },
    fetchLicenses() {
      this.$axios
        .$get("/licenses", {
          headers: {
            Authorization: "Bearer " + this.$cookies.get("authToken"),
          },
        })
        .then((result) => {
          this.License_list = result.Licenses;
          this.LicenseCount = result.LicenseCount;
          this.LicenseAvailable = result.LicenseAvailable;
          this.LicenseInUse = result.LicenseInUse;
          this.LicenseExpired = result.LicenseExpired;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    showSelectedDiv(event) {
      this.selectedValue = event.target.value;
    },

  },
};
</script>
<style scoped>
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
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
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

.column1 {
  width: 8%;
}

.column2 {
  width: 17%;
}

.column3 {
  width: 15%;
}

.column4 {
  width: 15%;
}

.column5 {
  width: 25%;
}

.column6 {
  width: 10%;
}

.column7 {
  width: 10%;
  display: flex;
  justify-content: space-between;
}

.column7 i {
  padding: 0;
  font-size: 20px;
  align-content: center;
  text-align: center;
  justify-content: center;
}

.column7 i:hover {
  opacity: 50%;
}

.column7.hide {
  display: none;
}

.button {
  color: var(--white);
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

<!-- <template>
  <div style="display: flex;justify-content: space-between;width: 100%;">
    <div style="width: 40%;background-color: red;">Hello</div>
    <div style="width: 20%; background-color: blue;">Hello</div>
    <div style="width: 40%; background-color: green;">Hello</div>
  </div>
</template> -->
