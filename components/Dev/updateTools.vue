<template>
  <div style="padding:15px">
    <div class="Update Header">
      <h1>Edit Selections</h1>
    </div>
    <hr>
    <div class="updateTools">
      <!-- ============Categories================ -->
      <div class="items">
        <div class="items-header">
          <h5>Categories</h5>
          <i class="bx bx-plus" id="search-Btn" style="font-size: 25px; cursor: pointer" @click="toggleCategoryAdd"></i>
        </div>
        <div class="items-add" v-if="showCategoryAdd">
          <input type="text" v-model="form.Category_Input" class="form-control" placeholder="New Categories" />
          <button class="btn btn-primary" @click="CategoryAdd">submit</button>
        </div>
        <div class="items-content">
          <ul>
            <li v-for="(options, index) in Category_Options" v-b-modal.Update @click="getID(options.id, 'Category_List')">
              <div>
                {{ index + 1 }} - {{ options.category_name }}
              </div>
              <div>
                <i class='bx bx-trash' @click.stop="CategoryDelete(options.id)"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- ============Classification================ -->
      <div class="items">
        <div class="items-header">
          <h5>Classification</h5>
          <i class="bx bx-plus" id="search-Btn" style="font-size: 25px; cursor: pointer"
            @click="toggleClassificationAdd"></i>
        </div>
        <div class="items-add" v-if="showClassificationAdd">
          <input type="text" v-model="form.Classification_Input" class="form-control" placeholder="New Classification" />
          <button class="btn btn-primary" @click="ClassificationAdd">submit</button>
        </div>
        <div class="items-content">
          <ul>
            <li v-for="(options, index) in Classification_Options" v-b-modal.Update
              @click="getID(options.id, 'Classification_List')">
              <div>
                {{ index + 1 }} - {{ options.class_name }}
              </div>
              <div>
                <i class='bx bx-trash' @click.stop="ClassificationDelete(options.id)"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- ============AssetType================ -->
      <div class="items">
        <div class="items-header">
          <h5>Asset Type</h5>
          <i class="bx bx-plus" id="search-Btn" style="font-size: 25px; cursor: pointer" @click="toggleAssetTypeAdd"></i>
        </div>
        <div class="items-add" v-if="showAssetTypeAdd">
          <input type="text" v-model="form.AssetType_Input" class="form-control" placeholder="New Asset Type" />
          <button class="btn btn-primary" @click="AssetTypeAdd">submit</button>
        </div>
        <div class="items-content">
          <ul>
            <li v-for="(options, index) in Asset_Type_Options" v-b-modal.Update
              @click="getID(options.id, 'Asset_Type_List')">
              <div>
                {{ index + 1 }} - {{ options.assetType_name }}
              </div>
              <div>
                <i class='bx bx-trash' @click.stop="AssetTypeDelete(options.id)"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- ============Manufacturer================ -->
      <div class="items">
        <div class="items-header">
          <h5>Manufacturer</h5>
          <i class="bx bx-plus" id="search-Btn" style="font-size: 25px; cursor: pointer"
            @click="toggleManufacturerAdd"></i>
        </div>
        <div class="items-add" v-if="showManufacturerAdd">
          <input type="text" v-model="form.Manufacturer_Input" class="form-control" placeholder="New Manufacturer" />
          <button class="btn btn-primary" @click="ManufacturerAdd">submit</button>
        </div>
        <div class="items-content">
          <ul>
            <li v-for="(options, index) in Manufacturer_Options" v-b-modal.Update
              @click="getID(options.id, 'Manufacturer_List')">
              <div>
                {{ index + 1 }} - {{ options.manufacturer_name }}
              </div>
              <div>
                <i class='bx bx-trash' @click.stop="ManufacturerDelete(options.id)"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- ============Department================ -->
      <div class="items">
        <div class="items-header">
          <h5>Department</h5>
          <i class="bx bx-plus" id="search-Btn" style="font-size: 25px; cursor: pointer" @click="toggleDepartmentAdd"></i>
        </div>
        <div class="items-add" v-if="showDepartmentAdd">
          <input type="text" v-model="form.Department_Input" class="form-control" placeholder="New Department" />
          <button class="btn btn-primary" @click="DepartmentAdd">submit</button>
        </div>
        <div class="items-content">
          <ul>
            <li v-for="(options, index) in Department_Options" v-b-modal.Update
              @click="getID(options.id, 'Department_List')">
              <div>
                {{ index + 1 }} - {{ options.dept_name }}
              </div>
              <div>
                <i class='bx bx-trash' @click.stop="DepartmentDelete(options.id)"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- ============Roles================ -->
      <div class="items">
        <div class="items-header">
          <h5>Roles</h5>
          <i class="bx bx-plus" id="search-Btn" style="font-size: 25px; cursor: pointer" @click="toggleRolesAdd"></i>
        </div>
        <div class="items-add" v-if="showRolesAdd">
          <input type="text" v-model="form.Roles_Input" class="form-control" placeholder="New Roles" />
          <button class="btn btn-primary" @click="RolesAdd">submit</button>
        </div>
        <div class="items-content">
          <ul>
            <li v-for="(options, index) in Role_Options" v-b-modal.Update @click="getID(options.id, 'Role_List')">
              <div>
                {{ index + 1 }} - {{ options.role }}
              </div>
              <div>
                <i class='bx bx-trash' @click.stop="RolesDelete(options.id)"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- ============Status================ -->
      <div class="items">
        <div class="items-header">
          <h5>Status</h5>
          <i class="bx bx-plus" id="search-Btn" style="font-size: 25px; cursor: pointer" @click="toggleStatusAdd"></i>
        </div>
        <div class="items-add" v-if="showStatusAdd">
          <input type="text" v-model="form.Status_Input" class="form-control" placeholder="New Status" />
          <button class="btn btn-primary" @click="StatusAdd">submit</button>
        </div>
        <div class="items-content">
          <ul>
            <li v-for="(options, index) in Status_Options" v-b-modal.Update @click="getID(options.id, 'Status_List')">
              <div>
                {{ index + 1 }} - {{ options.status_name }}
              </div>
              <div>
                <i class='bx bx-trash' @click.stop="StatusDelete(options.id)"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- ============DisposalMethod================ -->
      <div class="items">
        <div class="items-header">
          <h5>Disposal Method</h5>
          <i class="bx bx-plus" id="search-Btn" style="font-size: 25px; cursor: pointer"
            @click="toggleDisposalMethodAdd"></i>
        </div>
        <div class="items-add" v-if="showDisposalMethodAdd">
          <input type="text" v-model="form.DisposalMethod_Input" class="form-control" placeholder="New Disposal Method" />
          <button class="btn btn-primary" @click="DisposalMethodAdd">submit</button>
        </div>
        <div class="items-content">
          <ul>
            <li v-for="(options, index) in Disposal_Method" v-b-modal.Update @click="getID(options.id, 'Disposal_List')">
              <div>
                {{ index + 1 }} - {{ options.method }}
              </div>
              <div>
                <i class='bx bx-trash' @click.stop="DisposalMethodDelete(options.id)"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- ============Software================ -->
      <div class="items">
        <div class="items-header">
          <h5>Software Category</h5>
          <i class="bx bx-plus" id="search-Btn" style="font-size: 25px; cursor: pointer" @click="toggleSoftwareAdd"></i>
        </div>
        <div class="items-add" v-if="showSoftwareAdd">
          <input type="text" v-model="form.Software_Input" class="form-control" placeholder="New Software Category" />
          <button class="btn btn-primary" @click="SoftwareAdd">submit</button>
        </div>
        <div class="items-content">
          <ul>
            <li v-for="(options, index) in Software_Category" v-b-modal.Update
              @click="getID(options.id, 'Software_Category_List')">
              <!-- bago dito ^ axios path -->
              <div>
                {{ index + 1 }} - {{ options.software_category }}
              </div>
              <div>
                <i class='bx bx-trash' @click.stop="SoftwareDelete(options.id)"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- ============LicenseStatus================ -->
      <div class="items">
        <div class="items-header">
          <h5>License Status</h5>
          <i class="bx bx-plus" id="search-Btn" style="font-size: 25px; cursor: pointer"
            @click="toggleLicenseStatusAdd"></i>
        </div>
        <div class="items-add" v-if="showLicenseStatusAdd">
          <input type="text" v-model="form.LicenseStatus_Input" class="form-control" placeholder="New License Status" />
          <button class="btn btn-primary" @click="LicenseStatusAdd">submit</button>
        </div>
        <div class="items-content">
          <ul>
            <li v-for="(options, index) in License_Status" v-b-modal.Update
              @click="getID(options.id, 'License_Status_List')">
              <div>
                {{ index + 1 }} - {{ options.status }}
              </div>
              <div>
                <i class='bx bx-trash' @click.stop="RolesDelete(options.id)"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <b-modal id="Update" size="sm" title="Small Modal" hide-header hide-footer style="overflow-y: auto;height:500px">
      <updateModal />
    </b-modal>
  </div>
</template>
<script>
import Swal from 'sweetalert2';
import updateModal from '~/components/Dev/updateModal.vue';
export default {
  components: {
    updateModal
  },
  data() {
    return {
      showCategoryAdd: false,
      showClassificationAdd: false,
      showAssetTypeAdd: false,
      showManufacturerAdd: false,
      showDepartmentAdd: false,
      showRolesAdd: false,
      showStatusAdd: false,
      showDisposalMethodAdd: false,
      showSoftwareAdd: false,
      showLicenseStatusAdd: false,

      updateData: {
        id: null,
        tag: null,
      },

      form: {
        Category_Input: null,
        Classification_Input: null,
        AssetType_Input: null,
        Manufacturer_Input: null,
        Department_Input: null,
        Roles_Input: null,
        Status_Input: null,
        DisposalMethod_Input: null,
        Software_Input: null,
        LicenseStatus_Input: null,
      },

      Category_Options: [],
      Classification_Options: [],
      Asset_Type_Options: [],
      Manufacturer_Options: [],
      Department_Options: [],
      Role_Options: [],
      Status_Options: [],
      Disposal_Method: [],
      Software_Category: [],
      License_Status: [],
    };
  },
  created() {
    this.fetchDropdowns();
    this.$store.commit('setAuditAction', 'Added');
  },
  methods: {
    getID(id, tag) {
      this.updateData.id = id;
      this.updateData.tag = tag;

      this.$store.commit("setData", this.updateData);
    },
    async fetchDropdowns() {
      try {
        //Category
        const Category_List = localStorage.getItem('Category_List');
        if (Category_List) {
          const responseData = JSON.parse(Category_List);
          // Use the response data as needed
          this.Category_Options = responseData;
        } else {
          const categories_response = await this.$axios.$get('/getCategories')
          const Category_List = categories_response.categories;
          localStorage.setItem('Category_List', JSON.stringify(Category_List));

          const responseData = JSON.parse(localStorage.getItem('Category_List'));
          this.Category_Options = responseData;
        }
        //Classification
        const Classification_List = localStorage.getItem('Classification_List');
        if (Classification_List) {
          const responseData = JSON.parse(Classification_List);
          // Use the response data as needed
          this.Classification_Options = responseData;
        } else {
          const classification_response = await this.$axios.$get('/getClassifications')
          const Classification_List = classification_response.classifications;
          localStorage.setItem('Classification_List', JSON.stringify(Classification_List));

          const responseData = JSON.parse(localStorage.getItem('Classification_List'));
          this.Classification_Options = responseData;
        }
        //Asset Type
        const Asset_Type_List = localStorage.getItem('Asset_Type_List');
        if (Asset_Type_List) {
          const responseData = JSON.parse(Asset_Type_List);
          // Use the response data as needed
          this.Asset_Type_Options = responseData;
        } else {
          const asset_type_response = await this.$axios.$get('/getAssetType')
          const Asset_Type_List = asset_type_response.assetTypes;
          localStorage.setItem('Asset_Type_List', JSON.stringify(Asset_Type_List));

          const responseData = JSON.parse(localStorage.getItem('Asset_Type_List'));
          this.Asset_Type_Options = responseData;
        }
        //Manufacturer
        const Manufacturer_List = localStorage.getItem('Manufacturer_List');
        if (Manufacturer_List) {
          const responseData = JSON.parse(Manufacturer_List);
          // Use the response data as needed
          this.Manufacturer_Options = responseData;
        } else {
          const manufacturer_response = await this.$axios.$get('/getManufacturers')
          const Manufacturer_List = manufacturer_response.manufacturers;
          localStorage.setItem('Manufacturer_List', JSON.stringify(Manufacturer_List));

          const responseData = JSON.parse(localStorage.getItem('Manufacturer_List'));
          this.Manufacturer_Options = responseData;
        }
        //Department
        const Department_List = localStorage.getItem('Department_List');
        if (Department_List) {
          const responseData = JSON.parse(Department_List);
          // Use the response data as needed
          this.Department_Options = responseData;
        } else {
          const department_response = await this.$axios.$get('/getDepartments')
          const Department_List = department_response.departments;
          localStorage.setItem('Department_List', JSON.stringify(Department_List));

          const responseData = JSON.parse(localStorage.getItem('Department_List'));
          this.Department_Options = responseData;
        }
        //User Roles
        const Role_List = localStorage.getItem('Role_List');
        if (Role_List) {
          const responseData = JSON.parse(Role_List);
          // Use the response data as needed
          this.Role_Options = responseData;
        } else {
          const role_response = await this.$axios.$get('/getUserRoles')
          const Role_List = role_response.roles;
          localStorage.setItem('Role_List', JSON.stringify(Role_List));

          const responseData = JSON.parse(localStorage.getItem('Role_List'));
          this.Role_Options = responseData;
        }
        //Status
        const Status_List = localStorage.getItem('Status_List');
        if (Status_List) {
          const responseData = JSON.parse(Status_List);
          // Use the response data as needed
          this.Status_Options = responseData;
        } else {
          const status_response = await this.$axios.$get('/getStatusType')
          const Status_List = status_response.statusType;
          localStorage.setItem('Status_List', JSON.stringify(Status_List));

          const responseData = JSON.parse(localStorage.getItem('Status_List'));
          this.Status_Options = responseData;
        }
        //Disposal
        const Disposal_List = localStorage.getItem('Disposal_List');
        if (Disposal_List) {
          const responseData = JSON.parse(Disposal_List);
          // Use the response data as needed
          this.Disposal_Method = responseData;
        } else {
          const disposal_method_response = await this.$axios.$get('/getDisposalMethod')
          const Disposal_List = disposal_method_response.disposal_method;
          localStorage.setItem('Disposal_List', JSON.stringify(Disposal_List));

          const responseData = JSON.parse(localStorage.getItem('Disposal_List'));
          this.Disposal_Method = responseData;
        }
        //Software Category
        const Software_Category_List = localStorage.getItem('Software_Category_List');
        if (Software_Category_List) {
          const responseData = JSON.parse(Software_Category_List);
          // Use the response data as needed
          this.Software_Category = responseData;
        } else {
          const software_category_response = await this.$axios.$get('/getSoftwareCategory')
          const Software_Category_List = software_category_response.software_category;
          localStorage.setItem('Software_Category_List', JSON.stringify(Software_Category_List));

          const responseData = JSON.parse(localStorage.getItem('Software_Category_List'));
          this.Software_Category = responseData;
        }
        //License Status
        const License_Status_List = localStorage.getItem('License_Status_List');
        if (License_Status_List) {
          const responseData = JSON.parse(License_Status_List);
          // Use the response data as needed
          this.License_Status = responseData;
        } else {
          const license_status_response = await this.$axios.$get('/getLicensesStatus')
          const License_Status_List = license_status_response.license_status;
          localStorage.setItem('License_Status_List', JSON.stringify(License_Status_List));

          const responseData = JSON.parse(localStorage.getItem('License_Status_List'));
          this.License_Status = responseData;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async AssetTypeAdd() {
      this.$store.commit('setAuditAction', 'Update');
      try {
        await this.$axios.$post('/AssetType', this.form, {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('authToken')
          }
        });

        Swal.fire({
          title: 'Success!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then(async (result) => {
          localStorage.removeItem('Asset_Type_List');
          localStorage.removeItem('Asset_Type_Options');
          if (result.isConfirmed) {
            location.reload();
          }
        });
      } catch (error) {
        Swal.fire('Error', 'An error occurred.', 'error');
      }
    },
    async CategoryAdd() {
      try {
        await this.$axios.$post('/Category', this.form, {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('authToken')
          }
        });
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then(async (result) => {
          localStorage.removeItem('Category_List');
          localStorage.removeItem('Category_Options');
          if (result.isConfirmed) {
            location.reload();
          }
        });
      } catch (error) {
        Swal.fire('Error', 'An error occurred.', 'error');
      }
    },
    async ClassificationAdd() {
      try {
        await this.$axios.$post('/Classification', this.form, {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('authToken')
          }
        });
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then(async (result) => {
          localStorage.removeItem('Classification_List');
          localStorage.removeItem('Classification_Options');
          if (result.isConfirmed) {
            location.reload();
          }
        });
      } catch (error) {
        Swal.fire('Error', 'An error occurred.', 'error');
      }
    },
    async DepartmentAdd() {
      try {
        await this.$axios.$post('/Department', this.form, {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('authToken')
          }
        });
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then(async (result) => {
          localStorage.removeItem('Department_List');
          localStorage.removeItem('Department_Options');
          if (result.isConfirmed) {
            location.reload();
          }
        });
      } catch (error) {
        Swal.fire('Error', 'An error occurred.', 'error');
      }
    },
    async DisposalMethodAdd() {
      try {
        await this.$axios.$post('/DisposalMethod', this.form, {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('authToken')
          }
        });
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then(async (result) => {
          localStorage.removeItem('Disposal_List');
          localStorage.removeItem('Disposal_Options');
          if (result.isConfirmed) {
            location.reload();
          }
        });
      } catch (error) {
        Swal.fire('Error', 'An error occurred.', 'error');
      }
    },
    async LicenseStatusAdd() {
      try {
        await this.$axios.$post('/LicenseStatus', this.form, {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('authToken')
          }
        });
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then(async (result) => {
          localStorage.removeItem('License_Status_List');
          localStorage.removeItem('License_Status_Options');
          if (result.isConfirmed) {
            location.reload();
          }
        });
      } catch (error) {
        Swal.fire('Error', 'An error occurred.', 'error');
      }
    },
    async ManufacturerAdd() {
      try {
        await this.$axios.$post('/Manufacturer', this.form, {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('authToken')
          }
        });
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then(async (result) => {
          localStorage.removeItem('Manufacturer_List');
          localStorage.removeItem('Manufacturer_Options');
          if (result.isConfirmed) {
            location.reload();
          }
        });
      } catch (error) {
        Swal.fire('Error', 'An error occurred.', 'error');
      }
    },
    async SoftwareAdd() {
      try {
        await this.$axios.$post('/SoftwareCategory', this.form, {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('authToken')
          }
        });
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then(async (result) => {
          localStorage.removeItem('Software_Category_List');
          localStorage.removeItem('Software_Category_Options');
          if (result.isConfirmed) {
            location.reload();
          }
        });
      } catch (error) {
        Swal.fire('Error', 'An error occurred.', 'error');
      }
    },
    async StatusAdd() {
      try {
        await this.$axios.$post('/StatusType', this.form, {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('authToken')
          }
        });
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then(async (result) => {
          localStorage.removeItem('License_Status_List');
          localStorage.removeItem('License_Status_Options');
          if (result.isConfirmed) {
            location.reload();
          }
        });
      } catch (error) {
        Swal.fire('Error', 'An error occurred.', 'error');
      }
    },
    async RolesAdd() {
      try {
        await this.$axios.$post('/UserRole', this.form, {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('authToken')
          }
        });
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then(async (result) => {
          localStorage.removeItem('Role_List');
          localStorage.removeItem('Role_Options');
          if (result.isConfirmed) {
            location.reload();
          }
        });
      } catch (error) {
        Swal.fire('Error', 'An error occurred.', 'error');
      }
    },

    async AssetTypeDelete(id) {
      try {
        await this.$axios.$post(`/DeleteAssetType/${id}`, {}, {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('authToken')
          }
        });
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then(async (result) => {
          localStorage.removeItem('Asset_Type_List');
          localStorage.removeItem('Asset_Type_Options');
          if (result.isConfirmed) {
            location.reload();
          }
        });
      } catch (error) {
        Swal.fire('Error', 'An error occurred.', 'error');
      }
    },
    async CategoryDelete(id) {
      try {
        await this.$axios.$post(`/DeleteCategory/${id}`, {}, {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('authToken')
          }
        });
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then(async (result) => {
          localStorage.removeItem('Category_List');
          localStorage.removeItem('Category_Options');
          if (result.isConfirmed) {
            location.reload();
          }
        });
      } catch (error) {
        Swal.fire('Error', 'An error occurred.', 'error');
      }
    },
    async ClassificationDelete(id) {
      try {
        await this.$axios.$post(`/DeleteClassification/${id}`, {}, {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('authToken')
          }
        });
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then(async (result) => {
          localStorage.removeItem('Classification_List');
          localStorage.removeItem('Classification_Options');
          if (result.isConfirmed) {
            location.reload();
          }
        });
      } catch (error) {
        Swal.fire('Error', 'An error occurred.', 'error');
      }
    },
    async DepartmentDelete(id) {
      try {
        await this.$axios.$post(`/DeleteDepartment/${id}`, {}, {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('authToken')
          }
        });
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then(async (result) => {
          localStorage.removeItem('Department_List');
          localStorage.removeItem('Department_Options');
          if (result.isConfirmed) {
            location.reload();
          }
        });
      } catch (error) {
        Swal.fire('Error', 'An error occurred.', 'error');
      }
    },
    async DisposalMethodDelete(id) {
      try {
        await this.$axios.$post(`/DeleteDisposalMethod/${id}`, {}, {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('authToken')
          }
        });
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then(async (result) => {
          localStorage.removeItem('Disposal_List');
          localStorage.removeItem('Disposal_Options');
          if (result.isConfirmed) {
            location.reload();
          }
        });
      } catch (error) {
        Swal.fire('Error', 'An error occurred.', 'error');
      }
    },
    async LicenseStatusDelete(id) {
      try {
        await this.$axios.$post(`/DeleteLicenseStatus/${id}`, this.form, {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('authToken')
          }
        });
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then(async (result) => {
          localStorage.removeItem('License_Status_List');
          localStorage.removeItem('License_Status_Options');
          if (result.isConfirmed) {
            location.reload();
          }
        });
      } catch (error) {
        Swal.fire('Error', 'An error occurred.', 'error');
      }
    },
    async ManufacturerDelete(id) {
      try {
        await this.$axios.$post(`/DeleteManufacturer/${id}`, {}, {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('authToken')
          }
        });
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then(async (result) => {
          localStorage.removeItem('Manufacturer_List');
          localStorage.removeItem('Manufacturer_Options');
          if (result.isConfirmed) {
            location.reload();
          }
        });
      } catch (error) {
        Swal.fire('Error', 'An error occurred.', 'error');
      }
    },
    async SoftwareDelete(id) {
      try {
        await this.$axios.$post(`/DeleteSoftwareCategory/${id}`, {}, {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('authToken')
          }
        });
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then(async (result) => {
          localStorage.removeItem('Software_Category_List');
          localStorage.removeItem('Software_Category_Options');
          if (result.isConfirmed) {
            location.reload();
          }
        });
      } catch (error) {
        Swal.fire('Error', 'An error occurred.', 'error');
      }
    },
    async StatusDelete(id) {
      try {
        await this.$axios.$post(`/DeleteStatusType/${id}`, {}, {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('authToken')
          }
        });
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then(async (result) => {
          localStorage.removeItem('License_Status_List');
          localStorage.removeItem('License_Status_Options');
          if (result.isConfirmed) {
            location.reload();
          }
        });
      } catch (error) {
        Swal.fire('Error', 'An error occurred.', 'error');
      }
    },
    async RolesDelete(id) {
      try {
        await this.$axios.$post(`/DeleteUserRole/${id}`, {}, {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('authToken')
          }
        });
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then(async (result) => {
          localStorage.removeItem('Role_List');
          localStorage.removeItem('Role_Options');
          if (result.isConfirmed) {
            location.reload();
          }
        });
      } catch (error) {
        Swal.fire('Error', 'An error occurred.', 'error');
      }
    },

    toggleAssetTypeAdd() {
      this.showAssetTypeAdd = !this.showAssetTypeAdd;
    },
    toggleCategoryAdd() {
      this.showCategoryAdd = !this.showCategoryAdd;
    },
    toggleClassificationAdd() {
      this.showClassificationAdd = !this.showClassificationAdd;
    },
    toggleDepartmentAdd() {
      this.showDepartmentAdd = !this.showDepartmentAdd;
    },
    toggleDisposalMethodAdd() {
      this.showDisposalMethodAdd = !this.showDisposalMethodAdd;
    },
    toggleLicenseStatusAdd() {
      this.showLicenseStatusAdd = !this.showLicenseStatusAdd;
    },
    toggleManufacturerAdd() {
      this.showManufacturerAdd = !this.showManufacturerAdd;
    },
    toggleSoftwareAdd() {
      this.showSoftwareAdd = !this.showSoftwareAdd;
    },
    toggleStatusAdd() {
      this.showStatusAdd = !this.showStatusAdd;
    },
    toggleRolesAdd() {
      this.showRolesAdd = !this.showRolesAdd;
    },
  },
};
</script>
<style scoped>
.updateTools {
  display: grid;
  width: 100%;
  justify-content: space-between;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 10px;
  padding: 10px 0;
}

.updateTools .items {
  background-color: var(--sidebar);
  border: 1px solid rgba(0, 0, 0, 0.459);
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  align-content: center;
  padding: 10px;
  height: 250px;
  margin-bottom: 15px;
  overflow-y: auto;
  padding-top: 0;
}

.updateTools .items .items-header {
  padding-top: 10px;
  background-color: var(--sidebar);
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.459);
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
}

.updateTools .items .items-header i {
  font-size: 20px;
}

.updateTools .items .items-content {
  padding: 20px 20px 0 20px;
  font-size: 16px;

}

.updateTools .items .items-content li {
  border-bottom: 1px solid var(--dark-grey);
  list-style: none;
  padding-top: 5px;
  display: flex;
  justify-content: space-between;
}

.updateTools .items .items-content li:hover {
  background: var(--white);
}

.updateTools .items .items-add {
  margin-top: 5px;
  width: 100%;
  justify-content: space-between;
  column-gap: 10px;
}

.updateTools .items .items-add .btn {
  height: 38px;
  width: 100%;
}

@media (max-width: 1440px) {
  .updateTools {
    grid-template-columns: repeat(4, 1fr);
    column-gap: 15px;
  }
}

@media (max-width: 1025px) {
  .updateTools {
    grid-template-columns: repeat(3, 1fr);
    column-gap: 20px;
  }
}
</style>
