<template>
  <b-modal id="AssetTransfer" size="lg" title="Small Modal" hide-header hide-footer style="overflow-y: auto;">
    <div class="modal-content">
      <div class="modaladd-header">
        <h2>Allocate</h2>
      </div>
      <br />
      <div class="modaladd-body">
        <!-- MODAL ASSET ALLOCATE -->
        <div class="modal-asset-details">
          <div class="Divider-3">
            <div>
              <label for="AssetNo">Asset No.</label>
              <input type="text" v-model="form.assetNo" class="form-control" list="AssetNo" placeholder="Asset No."
                @blur="checkAsset()" />
              <datalist id="AssetNo">
                <option v-for="assetNo in AssetNo" :value="assetNo"></option>
              </datalist>
              <span class="errors" v-if="this.error_List.asset_id">{{ this.error_List.asset_id[0] }}</span>
            </div>
            <div>
            </div>
            <div>
              <label for="AssetStatus">Status</label>
              <b-form-select v-model="form.status_id" class="form-control" :options="Status_Options"></b-form-select>
              <span class="errors" v-if="this.error_List.status_id">{{ this.error_List.status_id[0] }}</span>
            </div>
          </div>
          <div class="Divider">
            <div>
              <label for="AssetAllocateFrom">From</label>
              <input type="text" v-model="form.from" id="AssetAllocateFrom" class="form-control" placeholder="From"
                readonly />
              <span class="errors" v-if="this.error_List.from">{{ this.error_List.from[0] }}</span>
            </div>
            <div>
              <label for="AssetAllocateDate">Transfered Date</label>
              <input type="Date" v-model="form.transferred_date" id="AssetAllocateDate" class="form-control"
                placeholder="Asset AllocateDate." />
              <span class="errors" v-if="this.error_List.transferred_date">{{ this.error_List.transferred_date[0]
              }}</span>
            </div>
          </div>
          <div class="Divider">
            <div>
              <label for="AssetAllocateArea">Area</label>
              <input type="text" v-model="form.area" id="AssetAllocateArea" class="form-control" placeholder="Area" />
              <span class="errors" v-if="this.error_List.area">{{ this.error_List.area[0] }}</span>
            </div>
            <div>
              <label for="AssetAllocateSite">Site</label>
              <input type="text" v-model="form.site" id="AssetAllocateSite" class="form-control" placeholder="Site" />
              <span class="errors" v-if="this.error_List.site">{{ this.error_List.site[0] }}</span>
            </div>
          </div>
          <div class="Divider">
            <div>
              <label for="AssetAllocateResponsible">To</label>
              <input type="text" v-model="form.responsible" id="AssetAllocateResponsible" class="form-control"
                placeholder="Responsible" />
              <span class="errors" v-if="this.error_List.responsible">{{ this.error_List.responsible[0] }}</span>
            </div>
            <div>
              <label for="AssetAllocateRole">Role</label>
              <b-form-select v-model="form.role_id" class="form-control" :options="Role_Options"></b-form-select>
              <span class="errors" v-if="this.error_List.role_id">{{ this.error_List.role_id[0] }}</span>
            </div>
            <div>
              <label for="AssetAllocateRole">Department</label>
              <b-form-select v-model="form.department_id" class="form-control"
                :options="Department_Options"></b-form-select>
              <span class="errors" v-if="this.error_List.department_id">{{ this.error_List.department_id[0] }}</span>
            </div>
          </div>
          <br />
          <br>
          <br>
          <div class="Divider">
            <div></div>
            <div class="button" style="text-align: right; justify-content: right">
              <button type="button" value="Submit" class="btn btn-primary" @click="submitForm" :disabled="isLoading">
                <div v-if="isLoading" style="flex">
                  <div class="spinner-border text-primary" role="status">
                  </div>
                </div>
                <div v-else>
                  <span>Submit</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      form: {
        asset_id: null,
        assetNo: null,
        from: null,
        site: null,
        area: null,
        responsible: null,
        role_id: null,
        department_id: null,
        transferred_date: null,
        status_id: null,
      },
      AssetNo: [],
      AssetLocation: [],
      Role_Options: [],
      Department_Options: [],
      Status_Options: [],
      isLoading: false,
      errors: null,
      error_List: [],
      AssetList: [],
    }
  },
  mounted() {
    this.fetchDropdowns();

  },
  created() {
    this.getAssetNoLocations();
    this.getAssetNo();
  },
  watch: {
    'form.assetNo'() {
      this.GET_ASSET_DETAILS();
    }
  },
  methods: {
    // Method to submit the transfer form
    async submitForm() {
      this.isLoading = true;

      // Set audit action and item number for tracking
      this.$store.commit('setAuditAction', 'Transfer');
      this.$store.commit('setAuditItemNo', this.form.assetNo);

      try {
        // Send a POST request to the server for transferring the asset
        const response = await this.$axios.$post('/transfer', this.form, {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('authToken')
          }
        });

        if (response.status === 200) {
          // Show a success message and post audit logs on confirmation
          Swal.fire({
            title: 'Success!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'OK'
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                await this.$axios.$post('/auditlogs', this.$store.getters.getAuditList, {
                  headers: {
                    Authorization: 'Bearer ' + this.$cookies.get('authToken')
                  }
                });
                location.reload();
              } catch (error) {
                // Handle error if audit logs posting fails
                Swal.fire('Error', 'Error occurred while posting audit logs', 'error');
                this.isLoading = false;
              }
            }
          }).catch((error) => {
            // Handle error if confirmation dialog fails to display
            Swal.fire('Error', 'An error occurred', 'error');
            this.isLoading = false;
          });
        }
      } catch (error) {
        // Handle validation errors
        if (error.response.status) {
          this.errors = Object.values(error.response.data.errors).flat();
          this.error_List = error.response.data.errors;
          this.showValidationErrorAlert();

          // Clear error messages after a delay
          setTimeout(() => {
            this.error_List = [];
          }, 20000);
        }
      }
    },

    // Method to fetch and populate the list of asset numbers
    async getAssetNo() {
      try {
        // Send a GET request to retrieve asset data from the server
        const assetList_response = await this.$axios.$get("/getAll", {
          headers: {
            Authorization: "Bearer " + this.$cookies.get("authToken"),
          },
        });

        // Map the asset numbers from the response and store in AssetList
        this.AssetList = assetList_response.Asset_List.map(
          (data) => data.asset_no
        );
      } catch (error) {
        // Handle any errors that occur during the API request
        console.error(error);
      }
    },

    // Method to fetch and populate the list of asset numbers and asset locations
    async getAssetNoLocations() {
      try {
        // Fetch asset numbers using a GET request
        const assetResponse = await this.$axios.$get('/getAssetNo', {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('authToken')
          }
        });

        // Map asset numbers from the response and store in AssetNo
        this.AssetNo = assetResponse.Asset_List.map((data) => data.asset_no);
      } catch (error) {
        // Handle errors related to fetching asset numbers
        console.error(error);
      }

      try {
        // Fetch asset locations using a GET request
        const locationResponse = await this.$axios.$get('/location', {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('authToken')
          }
        });

        // Store asset location details in AssetLocation
        this.AssetLocation = locationResponse.Location_Details;
      } catch (error) {
        // Handle errors related to fetching asset locations
        console.error(error);
      }
    },

    async fetchDropdowns() {
      try {
        //User Roles
        const Role_Options = localStorage.getItem('Role_Options');
        if (Role_Options) {
          const responseData = JSON.parse(Role_Options);
          // Use the response data as needed
          this.Role_Options = responseData;
        } else {
          const role_response = await this.$axios.$get('/getUserRoles')
          const Role_Options = [
            { value: null, text: 'Please select an option' },
            ...role_response.roles.map(roles => ({
              value: roles.id,
              text: roles.role
            }))
          ]
          localStorage.setItem('Role_Options', JSON.stringify(Role_Options));
        }
        //Status
        const Status_Options = localStorage.getItem('Status_Options');
        if (Status_Options) {
          const responseData = JSON.parse(Status_Options);
          // Use the response data as needed
          this.Status_Options = responseData;
        } else {
          const status_response = await this.$axios.$get('/getStatusType')
          const Status_Options = [
            { value: null, text: 'Please select an option' },
            ...status_response.statusType.map(statusType => ({
              value: statusType.id,
              text: statusType.status_name
            }))
          ]
          localStorage.setItem('Status_Options', JSON.stringify(Status_Options));
        }
        const Department_Options = localStorage.getItem('Department_Options');
        if (Department_Options) {
          const responseData = JSON.parse(Department_Options);
          // Use the response data as needed
          this.Department_Options = responseData;
        } else {
          const department_response = await this.$axios.$get('/getDepartments')
          const Department_Options = [
            { value: null, text: 'Please select an option' },
            ...department_response.departments.map(departments => ({
              value: departments.id,
              text: departments.dept_name
            }))
          ]
          localStorage.setItem('Department_Options', JSON.stringify(Department_Options));
        }
      } catch (error) {
        console.error(error);
      }
    },

    // Method to display a validation error alert
    showValidationErrorAlert() {
      // Join the error messages into a single string with line breaks
      const errorMessages = this.errors.join('\n');

      // Display a Swal (SweetAlert) error modal with the error messages
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: errorMessages,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });

      // Set isLoading to false to indicate that loading is complete
      this.isLoading = false;
    },

    // Method to check if an asset number exists in the AssetList
    isAssetExist(assetNo, AssetList) {
      return AssetList.includes(assetNo);
    },

    // Method to check if an asset number exists and handle the result
    checkAsset() {
      // Check if the asset number exists in the AssetList
      if (this.isAssetExist(this.form.assetNo, this.AssetList)) {
        // Asset exists, perform action (in this case, logging the category)
        console.log(this.form.category);
      } else {
        // Asset doesn't exist, display an alert and reset the asset number
        alert("Asset No. Doesn't Exist");
        this.form.assetNo = "";
      }
    },

    // Method to retrieve asset details based on the selected asset number
    GET_ASSET_DETAILS() {
      // Find the matching data based on the selected asset number in the AssetLocation array
      const assetDetails = this.AssetLocation.find(AssetLocation => AssetLocation.asset_no === this.form.assetNo);

      // If matching data is found, update the form object with the retrieved details
      if (assetDetails) {
        this.form.asset_id = assetDetails.id;
        this.form.from = assetDetails.responsible;
        this.form.site = assetDetails.site;
        this.form.area = assetDetails.area;
        this.form.responsible = null;
        this.form.role_id = null;
        this.form.transferred_date = null;
        this.form.status_id = assetDetails.status_id;
      } else {
        // Clear the form object if no matching data is found
        this.form.asset_id = null;
        this.form.from = null;
        this.form.site = null;
        this.form.area = null;
        this.form.responsible = null;
        this.form.role_id = null;
        this.form.transferred_date = null;
        this.form.status_id = null;
      }
    }
  }
}
</script>

<style scoped>
input[readonly] {
  background-color: var(--read-only);
  /* Replace this with your preferred background color */
}

.button span {
  color: var(--white);
}

.container {
  position: relative;
  height: 550px;
  margin-top: 7.5%;
  width: 45%;
  border-radius: 10px;
}

.modal-content {
  border: none;
  background-color: var(--sidebar);
}

.modaladd-header {
  position: sticky;
  padding: 0 15px;
  border-bottom: 1px solid rgb(0, 0, 0, 0.1);
  justify-content: center;
  text-align: center;
}

.modaladd-body {
  padding: 0 30px;
}

.modal-title {
  display: grid;
  grid-template-columns: 15% 85%;
}

.modal-title hr {
  margin-top: 10px;
  background-color: rgb(0, 0, 0, 0.3);
}

.Divider-3 {
  display: grid;
  grid-template-columns: 33% 33% 32%;
  justify-content: space-between;
}

.Divider {
  display: grid;
  grid-template-columns: 49% 49%;
  justify-content: space-between;
}

.form-control {
  color: var(--font-color);
}

.form-control::placeholder {
  color: var(--font-color);
}
</style>
