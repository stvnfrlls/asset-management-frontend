<template>
  <div class="licenseAddContainer">
    <h4>Update dropdown values</h4>
    <hr />
    <br />
    <div>
      <div>
        <label>Dropdown Value</label>
        <input type="text" v-model="form.value" class="form-control" placeholder="Value" />
      </div>
      <div class="button" style="justify-content: center;text-align: center;">
        <button class="btn btn-primary" @click="updateValue()">Update</button>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      form: {
        id: this.$store.getters.getData.id,
        value: '',
      },
    };
  },
  mounted() {
    this.getData();
    this.$store.commit('setAuditAction', 'Update');
  },
  methods: {
    // Retrieve specific data from a list based on ID and list tag, and update form value
    getData() {
      // Get the name of the list from the store
      const list_name = this.$store.getters.getData.tag;

      // Retrieve the list data from localStorage
      const list = JSON.parse(localStorage.getItem(list_name));

      // Filter the list to find data with the matching ID
      const filteredData = list.filter(data => data.id === this.$store.getters.getData.id);

      // Mapping of list names to corresponding property names in the data
      const propertyMap = {
        "Asset_Type_List": "assetType_name",
        "Category_List": "category_name",
        "Classification_List": "class_name",
        "Department_List": "dept_name",
        "Disposal_List": "method",
        "License_Status_List": "status",
        "Manufacturer_List": "manufacturer_name",
        "Role_List": "role",
        "Software_Category_List": "software_category",
        "Status_List": "status_name"
      };

      // Update the form value with the retrieved data, if applicable
      if (propertyMap.hasOwnProperty(list_name)) {
        this.form.value = filteredData.length > 0 ? filteredData[0][propertyMap[list_name]] : '';
      }
    },

    // Update a value in a specific list and perform related actions
    async updateValue() {
      try {
        // Get the name of the list from the store
        const list_name = this.$store.getters.getData.tag;

        // Define the mapping of list names to API endpoints
        const propertyMap = {
          "Asset_Type_List": "/AssetType",
          "Category_List": "/Category",
          "Classification_List": "/Classification",
          "Department_List": "/Department",
          "Disposal_List": "/DisposalMethod",
          "License_Status_List": "/LicenseStatus",
          "Manufacturer_List": "/Manufacturer",
          "Role_List": "/UserRole",
          "Software_Category_List": "/SoftwareCategory",
          "Status_List": "/StatusType"
        };

        // Check if the list name is valid and exists in the mapping
        if (propertyMap.hasOwnProperty(list_name)) {
          // Construct the API endpoint path
          const axios_path = [propertyMap[list_name]];

          // Make a POST request to update the value in the list
          const response = await this.$axios.$post(`${axios_path}/${this.form.id}`, this.form, {
            headers: {
              Authorization: 'Bearer ' + this.$cookies.get('authToken')
            }
          });

          // If update is successful, show success notification
          if (response) {
            Swal.fire({
              title: 'Success!',
              icon: 'success',
              showCancelButton: false,
              confirmButtonText: 'OK'
            }).then(async (result) => {
              if (result.isConfirmed) {
                try {
                  // Define the keys you want to exempt from clearing
                  const exemptKeys = ['username'];

                  // Loop through LocalStorage keys and clear non-exempt ones
                  for (const key in localStorage) {
                    if (!exemptKeys.includes(key)) {
                      localStorage.removeItem(key);
                    }
                  }
                  // Fetch and update dropdown options, then reload the page
                  this.fetchDropdowns();
                  location.reload();
                } catch (error) {
                  Swal.fire('Error', 'An error occurred while fetching data.', 'error');
                }
              }
            }).catch((error) => {
              Swal.fire('Error', 'An error occurred.', 'error');
            });
          }
        }
      } catch (error) {
        // Handle error if any
        console.error(error);
      }
    },

    async fetchDropdowns() {
      //Category
      try {
        const Category_Options = localStorage.getItem('Category_Options');
        const Category_List = localStorage.getItem('Category_List');
        if (!Category_Options && !Category_List) {
          const categories_response = await this.$axios.$get('/getCategories')
          const Category_List = categories_response.categories;
          const Category_Options = [
            { value: null, text: 'Please select an option' },
            ...categories_response.categories.map(categories => ({
              value: categories.id,
              text: categories.category_name
            }))
          ]
          localStorage.setItem('Category_Options', JSON.stringify(Category_Options));
          localStorage.setItem('Category_List', JSON.stringify(Category_List));
        }
      } catch (error) {
        console.error(error);
      }
      //Classification
      try {
        const Classification_Options = localStorage.getItem('Classification_Options');
        const Classification_List = localStorage.getItem('Classification_List');
        if (!Classification_Options && !Classification_List) {
          const classification_response = await this.$axios.$get('/getClassifications')
          const Classification_List = classification_response.classifications;
          const Classification_Options = [
            { value: null, text: 'Please select an option' },
            ...classification_response.classifications.map(classifications => ({
              value: classifications.id,
              text: classifications.class_name
            }))
          ]
          localStorage.setItem('Classification_Options', JSON.stringify(Classification_Options));
          localStorage.setItem('Classification_List', JSON.stringify(Classification_List));
        }
      } catch (error) {
        console.error(error);
      }
      //Asset Type
      try {
        const Asset_Type_Options = localStorage.getItem('Asset_Type_Options');
        const Asset_Type_List = localStorage.getItem('Asset_Type_List');
        if (!Asset_Type_Options && !Asset_Type_List) {
          const asset_type_response = await this.$axios.$get('/getAssetType')
          const Asset_Type_List = asset_type_response.assetTypes;
          const Asset_Type_Options = [
            { value: null, text: 'Please select an option' },
            ...asset_type_response.assetTypes.map(assetTypes => ({
              value: assetTypes.id,
              text: assetTypes.assetType_name
            }))
          ]
          localStorage.setItem('Asset_Type_Options', JSON.stringify(Asset_Type_Options));
          localStorage.setItem('Asset_Type_List', JSON.stringify(Asset_Type_List));
        }
      } catch (error) {
        console.error(error);
      }
      //Manufacturer
      try {
        const Manufacturer_Options = localStorage.getItem('Manufacturer_Options');
        const Manufacturer_List = localStorage.getItem('Manufacturer_List');
        if (!Manufacturer_Options && !Manufacturer_List) {
          const manufacturer_response = await this.$axios.$get('/getManufacturers')
          const Manufacturer_List = manufacturer_response.manufacturers;
          const Manufacturer_Options = [
            { value: null, text: 'Please select an option' },
            ...manufacturer_response.manufacturers.map(manufacturers => ({
              value: manufacturers.id,
              text: manufacturers.manufacturer_name
            }))
          ]
          localStorage.setItem('Manufacturer_Options', JSON.stringify(Manufacturer_Options));
          localStorage.setItem('Manufacturer_List', JSON.stringify(Manufacturer_List));
        }
      } catch (error) {
        console.error(error);
      }
      //Department
      try {
        const Department_Options = localStorage.getItem('Department_Options');
        const Department_List = localStorage.getItem('Department_List');
        if (!Department_Options && !Department_List) {
          const department_response = await this.$axios.$get('/getDepartments')
          const Department_List = department_response.departments;
          const Department_Options = [
            { value: null, text: 'Please select an option' },
            ...department_response.departments.map(departments => ({
              value: departments.id,
              text: departments.dept_name
            }))
          ]
          localStorage.setItem('Department_Options', JSON.stringify(Department_Options));
          localStorage.setItem('Department_List', JSON.stringify(Department_List));
        }
      } catch (error) {
        console.error(error);
      }
      //User Roles
      try {
        const Role_Options = localStorage.getItem('Role_Options');
        const Role_List = localStorage.getItem('Role_List');
        if (!Role_Options && !Role_List) {
          const role_response = await this.$axios.$get('/getUserRoles')
          const Role_List = role_response.roles;
          const Role_Options = [
            { value: null, text: 'Please select an option' },
            ...role_response.roles.map(roles => ({
              value: roles.id,
              text: roles.role
            }))
          ]
          localStorage.setItem('Role_Options', JSON.stringify(Role_Options));
          localStorage.setItem('Role_List', JSON.stringify(Role_List));
        }
      } catch (error) {
        console.error(error);
      }
      //Status
      try {
        const Status_Options = localStorage.getItem('Status_Options');
        const Status_List = localStorage.getItem('Status_List');
        if (!Status_Options && !Status_List) {
          const status_response = await this.$axios.$get('/getStatusType')
          const Status_List = status_response.statusType;
          const Status_Options = [
            { value: null, text: 'Please select an option' },
            ...status_response.statusType.map(statusType => ({
              value: statusType.id,
              text: statusType.status_name
            }))
          ]
          localStorage.setItem('Status_Options', JSON.stringify(Status_Options));
          localStorage.setItem('Status_List', JSON.stringify(Status_List));
        }
      } catch (error) {
        console.error(error);
      }
      //Disposal
      try {
        const Disposal_List = localStorage.getItem('Disposal_List');
        if (!Disposal_List) {
          const disposal_method_response = await this.$axios.$get('/getDisposalMethod')
          const Disposal_List = disposal_method_response.disposal_method;
          localStorage.setItem('Disposal_List', JSON.stringify(Disposal_List));
        }
      } catch (error) {
        console.error(error);
      }
      //Software Category
      try {
        const Software_Category = localStorage.getItem('Software_Category_Options');
        const Software_Category_List = localStorage.getItem('Software_Category_List');
        if (!Software_Category && !Software_Category_List) {
          const software_category_response = await this.$axios.$get('/getSoftwareCategory')
          const Software_Category_List = software_category_response.software_category;
          const Sotware_Category_Options = [
            { value: null, text: 'Please select an option' },
            ...software_category_response.software_category.map(software_categories => ({
              value: software_categories.id,
              text: software_categories.software_category
            }))
          ]
          localStorage.setItem('Software_Category_Options', JSON.stringify(Sotware_Category_Options));
          localStorage.setItem('Software_Category_List', JSON.stringify(Software_Category_List));
        }
      } catch (error) {
        console.error(error);
      }
      //License Status
      try {
        const License_Status_List = localStorage.getItem('License_Status_List');
        if (!License_Status_List) {
          const license_status_response = await this.$axios.$get('/getLicensesStatus')
          const License_Status_List = license_status_response.license_status;
          localStorage.setItem('License_Status_List', JSON.stringify(License_Status_List));
        }
      } catch (error) {
        console.error(error);
      }
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

button {
  width: 150px;
  height: 40px;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 50px;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
