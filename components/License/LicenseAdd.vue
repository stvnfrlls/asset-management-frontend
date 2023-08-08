<template>
  <b-modal id="licenseAdd" size="md" title="Small Modal" hide-header hide-footer style="overflow-y: auto;">
    <div class="licenseAddContainer">
      <h4>Asset Licensing</h4>
      <hr />
      <br />
      <div>
        <div>
          <label for="LicenseSoftware">Category</label>
          <b-form-select id="searchLicenseSoftware" v-model="form.category" class="form-control"
            :options="Software_Category_Options" required />
          <span class="errors" v-if="this.error_List.category">{{ this.error_List.category[0] }}</span>
        </div>
        <div>
          <label for="LicenceSofware">Software</label>
          <input type="text" v-model="form.software" id="LicenceSofware" required class="form-control"
            placeholder="Software" />
          <span class="errors" v-if="this.error_List.software">{{ this.error_List.software[0] }}</span>

        </div>
        <div>
          <label for="LicenceVersion">Version</label>
          <input type="text" v-model="form.version" id="LicenceVersion" required slot-scope="" class="form-control"
            placeholder="Version" />
          <span class="errors" v-if="this.error_List.version">{{ this.error_List.version[0] }}</span>

        </div>
        <div>
          <label for="LicenseKey">License Key</label>
          <input type="text" v-model="form.license_key" id="LicenseKey" required class="form-control"
            placeholder="License Key" />
          <span class="errors" v-if="this.error_List.license_key">{{ this.error_List.license_key[0] }}</span>

        </div>
        <br />
        <div style="justify-content: center; text-align: center">
          <div class="form-check-inline">
            <label class="form-check-label" style="color: var(--font-color);">
              <input type="radio" v-model="form.status" class="form-check-input" value="1" />Available
            </label>
          </div>
          <div class="form-check-inline">
            <label class="form-check-label" style="color: var(--font-color);">
              <input type="radio" v-model="form.status" class="form-check-input" value="2" />In Use
            </label>
          </div>
        </div>
        <br />
        <br />
        <div class="button">
          <button type="button" class="btn btn-primary" @click="submitForm" :disabled="isLoading">
            <div v-if="isLoading" style="flex">
              <div class="spinner-border text-primary" role="status">
              </div>
            </div>
            <div v-else>
              <span>Submit</span>
            </div>
          </button>
        </div>
        <br />
        <br />
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
        category: null,
        software: null,
        version: null,
        license_key: null,
        status: 1,
      },
      isLoading: false,
      errors: null,
      error_List: [],
      Software_Category_Options: [],
    };
  },
  created() {
  },
  mounted() {
    this.$store.commit('setAuditAction', 'Added');
    this.fetchDropdowns();
  },
  methods: {
    async submitForm() {
      // Set loading state
      this.isLoading = true;

      // Update audit action and item details
      this.$store.commit('setAuditAction', 'Added License');
      this.$store.commit('setAuditItemNo', this.form.software);

      try {
        // Make a POST request to add licenses
        const response = await this.$axios.$post('/addLicenses', this.form, {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('authToken')
          }
        });

        // Check if the license addition was successful
        if (response.status == 200) {
          // Show a success notification
          Swal.fire({
            title: 'Success!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'OK'
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                // Post audit logs
                await this.$axios.$post('/auditlogs', this.$store.getters.getAuditList, {
                  headers: {
                    Authorization: 'Bearer ' + this.$cookies.get('authToken')
                  }
                });

                // Ask user if they want to add more licenses or finish
                Swal.fire({
                  title: 'Do you want to add more?',
                  showDenyButton: true,
                  confirmButtonText: 'Yes',
                  denyButtonText: 'No'
                }).then((result) => {
                  if (result.isConfirmed) {
                    // Reset form and continue adding more licenses
                    this.form.category = null;
                    this.form.software = null;
                    this.form.version = null;
                    this.form.license_key = null;
                    this.isLoading = false;
                    this.LicenseAddMore();
                  } else if (result.isDenied) {
                    // Show an info alert and reload the page
                    Swal.fire({
                      title: 'Changes are saved',
                      icon: 'info'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        // Reload the page after the user clicks "OK"
                        location.reload();
                      }
                    });
                  }
                });
              } catch (error) {
                // Handle error while posting audit logs
                Swal.fire('Error', 'Error occurred while posting audit logs', 'error');
                this.isLoading = false;
              }
            }
          });
        }
      } catch (error) {
        // Handle validation errors
        if (error.response.status === 422) {
          this.errors = Object.values(error.response.data.errors).flat();
          this.error_List = error.response.data.errors;
          console.log(this.error_List);
          this.showValidationErrorAlert();
        }
      }
    },
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
    showValidationErrorAlert() {
      const errorMessages = this.errors.join('\n');
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: errorMessages,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
      this.isLoading = false;
    },
    LicenseAddMore() {
      this.$bvModal.hide("licenseAdd");
      const createLinkElement = document.getElementById('dashLink');
      const licenseLinkElement = document.getElementById('licenseLink');
      if (licenseLinkElement) {
        // Reload the page

        createLinkElement.click();
        // Click the element after the page reloads
        setTimeout(() => {
          if (licenseLinkElement) {
            licenseLinkElement.click();
          }
        }, 200);
      }
    },
    formatLicenseKey() {
      // Remove non-alphanumeric characters from the input
      const alphanumericKey = this.form.license_key.replace(/\W/g, '');

      // Convert the alphanumeric key to uppercase
      const uppercaseKey = alphanumericKey.toUpperCase();

      // Split the uppercase key into groups of 4 characters
      const groups = uppercaseKey.match(/.{1,4}/g);

      // Join the groups with dashes in between
      this.form.license_key = groups ? groups.join('-') : '';
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #00000094;
  z-index: 2;
}

.modals {
  height: 60%;
  text-align: center;
  background-color: white;
  width: 500px;
  margin-top: 10%;
  padding: 60px;
  border-radius: 20px;
}

.close {
  margin: 10% 0 0 16px;
  cursor: pointer;
}

.close-img {
  width: 25px;
}

.check {
  width: 150px;
}

h6 {
  font-weight: 500;
  font-size: 28px;
  margin: 20px 0;
}

p {
  /* font-weight: 500; */
  font-size: 16px;
  margin: 20px 0;
}

.button {
  align-items: center;
  justify-content: center;
  text-align: center;
}

button {
  width: 150px;
  height: 40px;
  font-size: 14px;
}

.button span {
  color: var(--submit);
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

.licenseAddContainer {
  background-color: var(--sidebar);
  padding: 0px;
}

.modal-body {
  background-color: red;

  padding: 0px;
}

.form-control {
  color: var(--font-color);
}

.form-control::placeholder {
  color: var(--font-color);
}
</style>
