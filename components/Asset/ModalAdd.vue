<template>
  <div class="modal-content">
    <div class="modaladd-header">
      <h2>Review Submit</h2>
    </div>
    <br>
    <div class="modaladd-body">
      <!-- MODAL ASSET DETAILS -->
      <div class="modal-asset-details">
        <div class="modal-title">
          <div>
            <h5>Asset Details</h5>
          </div>
          <div>
            <hr>
          </div>
        </div>
        <div class="Divider">
          <div>
            <label for="AssetNo">Asset No.</label>
            <input type="text" v-model="form.asset_no" class="form-control" placeholder="Asset No." disabled>
            <!-- <button @click="uploadImage()">click</button> -->
          </div>
          <div>
            <label for="Image">Image Upload</label>
            <div>
              <input type="file" id="Image" ref="imageInput" @change="handleFileChange" />
            </div>
          </div>
        </div>

        <div class="Divider">
          <div>
            <label for="AssetClassification">Classification</label>
            <b-form-select v-model="form.classification" class="form-control" :options="Classification_Options"
              disabled></b-form-select>
          </div>
          <div>
            <label for="AssetCategory">Category</label>
            <b-form-select v-model="form.category" class="form-control" :options="Category_Options"
              disabled></b-form-select>
          </div>
        </div>
        <div class="Divider">
          <div>
            <label for="AssetType">Asset Type</label>
            <b-form-select v-model="form.asset_type" class="form-control" :options="Asset_Type_Options"
              disabled></b-form-select>
          </div>
          <div>
            <label for="AssetManufacturer">Manufacturer</label>
            <b-form-select v-model="form.manufacturer" class="form-control" :options="Manufacturer_Options"
              disabled></b-form-select>
          </div>
        </div>
        <div class="Divider">
          <div>
            <label for="AssetSerialNo">Serial No.</label>
            <input type="text" v-model="form.serial_no" class="form-control" placeholder="Serial No." disabled>
          </div>
          <div>
            <label for="AssetModel">Model</label>
            <input type="text" v-model="form.model" class="form-control" placeholder="Model" disabled>
          </div>
        </div>
        <label for="AddDescription">Description</label>
        <textarea class="form-control" v-model="form.description" name="" cols="50" rows="7" placeholder="Description"
          disabled></textarea>
      </div>
      <!-- ======================== MODAL ASSET PURCHASE =================== -->
      <div class="modal-asset-purchase">
        <br>
        <div class="modal-title">
          <div>
            <h5>Asset Purchase</h5>
          </div>
          <div>
            <hr>
          </div>
        </div>
        <label for="assetItemCode">Item Code</label>
        <input type="text" v-model="form.item_code" class="form-control" placeholder="Item Code" style="width: 40%;"
          disabled>
        <div class="Divider">
          <div>
            <label for="assetCompany">Company</label>
            <input type="text" v-model="form.company" class="form-control" placeholder="Company" disabled>
          </div>
          <div>
            <label for="assetSupplier">Supplier</label>
            <input type="text" v-model="form.supplier" class="form-control" placeholder="Supplier" disabled>
          </div>
        </div>
        <div class="Divider">
          <div>
            <label for="assetAmount">Amount</label>
            <input type="number" v-model="form.amount" list="TypeOptions" class="form-control" placeholder="Amount"
              disabled>
          </div>
          <div>
            <label for="assetDate">Date</label>
            <input type="date" v-model="form.date" class="form-control" placeholder="Date" disabled>
          </div>
        </div>
      </div>
      <!-- ======================== MODAL ASSET LOCATION =================== -->
      <div class="modal-asset-location">
        <br>
        <div class="modal-title">
          <div>
            <h5>Asset Location</h5>
          </div>
          <div>
            <hr>
          </div>
        </div>
        <div class="Divider">
          <div>
            <label for="assetArea">Area</label>
            <input type="text" v-model="form.area" class="form-control" placeholder="Area" disabled>
          </div>
        </div>
        <div class="Divider-3">
          <div>
            <label for="assetResponsible">Responsible</label>
            <input type="text" v-model="form.responsible" class="form-control" placeholder="Responsible" disabled>
          </div>
          <div>
            <label for="assetDepartment">Department</label>
            <b-form-select v-model="form.department" class="form-control" :options="Department_Options"
              disabled></b-form-select>
          </div>
          <div>
            <label for="assetRoles">Roles</label>
            <b-form-select v-model="form.role_id" class="form-control" :options="Role_Options" disabled></b-form-select>
          </div>
        </div>
        <div class="Divider">
          <div>
            <label for="assetStatus">Status</label>
            <b-form-select v-model="form.status_id" class="form-control" :options="Status_Options"
              disabled></b-form-select>
          </div>
          <div>
            <label for="assetRemarks">Remarks</label>
            <input type="text" v-model="form.remarks" class="form-control" placeholder="Remarks" disabled>
          </div>
        </div>
        <br>
        <br>
        <div class="Divider">
          <div>
          </div>
          <div class="button" style="text-align: right;justify-content: right;">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      form: {
        asset_no: this.$store.getters.getData.asset_no,
        classification: this.$store.getters.getData.classification,
        category: this.$store.getters.getData.category,
        asset_type: this.$store.getters.getData.asset_type,
        manufacturer: this.$store.getters.getData.manufacturer,
        serial_no: this.$store.getters.getData.serial_no,
        model: this.$store.getters.getData.model,
        description: this.$store.getters.getData.description,

        item_code: this.$store.getters.getData.item_code,
        company: this.$store.getters.getData.company,
        supplier: this.$store.getters.getData.supplier,
        amount: this.$store.getters.getData.amount,
        date: this.$store.getters.getData.date,

        site: this.$store.getters.getData.site,
        area: this.$store.getters.getData.area,
        responsible: this.$store.getters.getData.responsible,
        department: this.$store.getters.getData.department,
        role_id: this.$store.getters.getData.role_id,
        status_id: this.$store.getters.getData.status_id,
        remarks: this.$store.getters.getData.remarks,

        selectedFile: null,
      },

      isLoading: false,
      errors: null,

      Classification_Options: [],
      Category_Options: [],
      Asset_Type_Options: [],
      Manufacturer_Options: [],
      Department_Options: [],
      Role_Options: [],
      Status_Options: [],

    }
  },
  created() {
    this.fetchDropdowns();
  },
  methods: {
    async submitForm() {
      // Set the audit item number in the store
      this.$store.commit('setAuditItemNo', this.form.asset_no);

      this.isLoading = true;
      try {
        // Create a FormData object and append form data to it
        const formData = new FormData();
        formData.append('asset_no', this.form.asset_no);
        formData.append('classification', this.form.classification);
        formData.append('category', this.form.category);
        formData.append('asset_type', this.form.asset_type);
        formData.append('manufacturer', this.form.manufacturer);
        formData.append('serial_no', this.form.serial_no);
        formData.append('model', this.form.model);
        formData.append('description', this.form.description);
        formData.append('item_code', this.form.item_code);
        formData.append('company', this.form.company);
        formData.append('supplier', this.form.supplier);
        formData.append('amount', this.form.amount);
        formData.append('date', this.form.date);
        formData.append('site', this.form.site);
        formData.append('area', this.form.area);
        formData.append('responsible', this.form.responsible);
        formData.append('department', this.form.department);
        formData.append('role_id', this.form.role_id);
        formData.append('status_id', this.form.status_id);
        formData.append('remarks', this.form.remarks);

        formData.append('image', this.form.selectedFile);

        // Send a POST request to addAsset endpoint with the form data
        const response = await this.$axios.$post('/addAsset', formData, {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('authToken'),
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.status === 200) {
          // Show success alert and handle audit logs posting
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
                location.reload(); // Reload the page
              } catch (error) {
                Swal.fire('Error', 'Error occurred while posting audit logs', 'error');
                this.isLoading = false;
              }
            }
          });
        }
      } catch (error) {
        if (error.response.status === 422) {
          // Handle validation errors
          this.errors = Object.values(error.response.data.errors).flat();
          this.showValidationErrorAlert();
        }
      }
    },
    async fetchDropdowns() {
      try {
        //Category
        const Category_Options = localStorage.getItem('Category_Options');
        if (Category_Options) {
          const responseData = JSON.parse(Category_Options);
          // Use the response data as needed
          this.Category_Options = responseData;
        } else {
          const categories_response = await this.$axios.$get('/getCategories')
          const Category_Options = [
            { value: null, text: 'Please select an option' },
            ...categories_response.categories.map(categories => ({
              value: categories.id,
              text: categories.category_name
            }))
          ]
          localStorage.setItem('Category_Options', JSON.stringify(Category_Options));
        }
        //Classification
        const Classification_Options = localStorage.getItem('Classification_Options');
        if (Classification_Options) {
          const responseData = JSON.parse(Classification_Options);
          // Use the response data as needed
          this.Classification_Options = responseData;
        } else {
          const classification_response = await this.$axios.$get('/getClassifications')
          const Classification_Options = [
            { value: null, text: 'Please select an option' },
            ...classification_response.classifications.map(classifications => ({
              value: classifications.id,
              text: classifications.class_name
            }))
          ]
          localStorage.setItem('Classification_Options', JSON.stringify(Classification_Options));
        }
        //Manufacturer
        const Manufacturer_Options = localStorage.getItem('Manufacturer_Options');
        if (Manufacturer_Options) {
          const responseData = JSON.parse(Manufacturer_Options);
          // Use the response data as needed
          this.Manufacturer_Options = responseData;
        } else {
          const manufacturer_response = await this.$axios.$get('/getManufacturers')
          const Manufacturer_Options = [
            { value: null, text: 'Please select an option' },
            ...manufacturer_response.manufacturers.map(manufacturers => ({
              value: manufacturers.id,
              text: manufacturers.manufacturer_name
            }))
          ]
          localStorage.setItem('Manufacturer_Options', JSON.stringify(Manufacturer_Options));
        }
        //Asset Type
        const Asset_Type_Options = localStorage.getItem('Asset_Type_Options');
        if (Asset_Type_Options) {
          const responseData = JSON.parse(Asset_Type_Options);
          // Use the response data as needed
          this.Asset_Type_Options = responseData;
        } else {
          const asset_type_response = await this.$axios.$get('/getAssetType')
          const Asset_Type_Options = [
            { value: null, text: 'Please select an option' },
            ...asset_type_response.assetTypes.map(assetTypes => ({
              value: assetTypes.id,
              text: assetTypes.assetType_name
            }))
          ]
          localStorage.setItem('Asset_Type_Options', JSON.stringify(Asset_Type_Options));
        }
        //Department
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
      } catch (error) {
        console.error(error);
      }
    },
    handleFileChange(event) {
      // Update the selectedFile property in the form with the chosen file
      this.form.selectedFile = event.target.files[0];

      // Create a new FormData object and append the selected file to it
      const formData = new FormData();
      formData.append('image', this.form.selectedFile);
    },
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
    }

  }
}
</script>

<style scoped>
.container {
  position: relative;
  height: 1300px;
  margin-top: 6.25%;
}

.modal-content {
  border: none;
}

.modaladd-header {
  position: sticky;
  padding: 0 15px;
  border-bottom: 1px solid rgb(0, 0, 0, .1);
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
  background-color: rgb(0, 0, 0, .3);
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

span {
  color: var(--white);
}
</style>
