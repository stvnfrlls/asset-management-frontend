<template>
  <div class="assetCreateContent">
    <div class="assetCreateHeader">
      <h2>Create</h2>
    </div>
    <br />
    <div class="assetCreate-body">
      <!-- MODAL ASSET DETAILS -->
      <div class="asset-asset-details">
        <div class="asset-title">
          <div>
            <h5>Asset Details</h5>
          </div>
          <div>
            <hr />
          </div>
        </div>
        <div class="Divider">
          <div>
            <label for="AssetNo">Asset No.</label>
            <input type="text" v-model="form.asset_no" id="AssetNo" class="form-control" placeholder="Asset No."
              style="width: 100%" @blur="checkAsset()" required />
            <!-- <button @click="uploadImage()">click</button> -->
          </div>
        </div>
        <div class="Divider">
          <div>
            <label for="AssetClassification">Classification</label>
            <b-form-select v-model="form.classification" required id="classification" class="form-control"
              :options="Classification_Options"></b-form-select>
          </div>
          <div>
            <label for="AssetCategory">Category</label>
            <b-form-select v-model="form.category" required id="category" class="form-control"
              :options="Category_Options"></b-form-select>
          </div>
        </div>
        <div class="Divider">
          <div>
            <label for="AssetType">Asset Type</label>
            <b-form-select v-model="form.asset_type" required id="asset_type" class="form-control"
              :options="Asset_Type_Options"></b-form-select>
          </div>
          <div>
            <label for="AssetManufacturer">Manufacturer</label>
            <b-form-select v-model="form.manufacturer" required id="manufacturer" class="form-control"
              :options="Manufacturer_Options"></b-form-select>
          </div>
        </div>
        <div class="Divider">
          <div>
            <label for="AssetSerialNo">Serial No.</label>
            <input type="text" v-model="form.serial_no" class="form-control" placeholder="Serial No." />
          </div>
          <div>
            <label for="AssetModel">Model</label>
            <input type="text" v-model="form.model" class="form-control" placeholder="Model" />
          </div>
        </div>
        <label for="AddDescription">Description</label>
        <textarea class="form-control" v-model="form.description" name="" cols="50" rows="7"
          placeholder="Description"></textarea>
      </div>
      <!-- ======================== asset ASSET PURCHASE =================== -->
      <div class="asset-asset-purchase">
        <br />
        <div class="asset-title">
          <div>
            <h5>Asset Purchase</h5>
          </div>
          <div>
            <hr />
          </div>
        </div>
        <label for="assetItemCode">Item Code</label>
        <input type="text" v-model="form.item_code" class="form-control" placeholder="Item Code" style="width: 40%" />
        <div class="Divider">
          <div>
            <label for="assetCompany">Company</label>
            <input type="text" v-model="form.company" class="form-control" placeholder="Company" />
          </div>
          <div>
            <label for="assetSupplier">Supplier</label>
            <input type="text" v-model="form.supplier" class="form-control" placeholder="Supplier" />
          </div>
        </div>
        <div class="Divider">
          <div>
            <label for="assetAmount">Amount</label>
            <input type="number" v-model="form.amount" list="TypeOptions" class="form-control" placeholder="Amount" />
          </div>
          <div>
            <label for="assetDate">Date</label>
            <input type="date" v-model="form.date" class="form-control" placeholder="Date" />
          </div>
        </div>
      </div>
      <!-- ======================== asset ASSET LOCATION =================== -->
      <div class="asset-asset-location">
        <br />
        <div class="asset-title">
          <div>
            <h5>Asset Location</h5>
          </div>
          <div>
            <hr />
          </div>
        </div>
        <div class="Divider">
          <div>
            <label for="assetArea">Area</label>
            <input type="text" v-model="form.area" class="form-control" placeholder="Area" />
          </div>
        </div>
        <div class="Divider-3">
          <div>
            <label for="assetResponsible">Responsible</label>
            <input type="text" v-model="form.responsible" class="form-control" placeholder="Responsible" />
          </div>
          <div>
            <label for="assetDepartment">Department</label>
            <b-form-select v-model="form.department" class="form-control" :options="Department_Options"></b-form-select>
          </div>
          <div>
            <label for="assetRoles">Roles</label>
            <b-form-select v-model="form.role_id" class="form-control" :options="Role_Options"></b-form-select>
          </div>
        </div>
        <div class="Divider">
          <div>
            <label for="assetStatus">Status</label>
            <b-form-select v-model="form.status_id" class="form-control" :options="Status_Options"></b-form-select>
          </div>
          <div>
            <label for="assetRemarks">Remarks</label>
            <input type="text" v-model="form.remarks" class="form-control" placeholder="Remarks" />
          </div>
        </div>
        <br />
        <br />
        <div class="Divider-button">
          <div></div>
          <b-button variant="primary" @click="replaceComponent">Submit</b-button>
        </div>
      </div>
    </div>
    <b-modal id="ModalAdd" size="xl" title="Small Modal" hide-header hide-footer style="overflow-y: auto">
      <AssetModalAdd />
    </b-modal>
  </div>
</template>

<script>
import AssetModalAdd from "~/components/Asset/ModalAdd.vue";
export default {
  data() {
    return {
      form: {
        asset_no: null,
        classification: null,
        category: null,
        asset_type: null,
        manufacturer: null,
        serial_no: null,
        model: null,
        description: null,

        item_code: null,
        company: null,
        supplier: null,
        amount: null,
        date: null,

        site: null,
        area: null,
        responsible: null,
        department: null,
        role_id: null,
        status_id: 1,
        remarks: null,
      },

      AssetList: [],
      Classification_Options: [],
      Category_Options: [],
      Asset_Type_Options: [],
      Manufacturer_Options: [],
      Department_Options: [],
      Role_Options: [],
      Status_Options: [],
      Image: null,
    };
  },
  created() {
    const inputData = this.$store.getters.getData;
    if (inputData) {
      const properties = [
        "asset_no",
        "classification",
        "category",
        "asset_type",
        "manufacturer",
        "serial_no",
        "model",
        "description",
        "item_code",
        "company",
        "supplier",
        "amount",
        "date",
        "site",
        "area",
        "responsible",
        "department",
        "role_id",
        "status_id",
        "remarks",
      ];
      properties.forEach((property) => {
        if (inputData.hasOwnProperty(property)) {
          this.form[property] = inputData[property];
        }
      });
    }
    this.fetchDropdowns();
    this.getAssetNo();
  },
  methods: {
    // Function to handle file change event when a new image is selected
    onFileChange(event) {
      // Set the 'Image' property to the selected file
      this.Image = event.target.files[0];
    },

    // Function to upload the selected image to the server
    async uploadImage() {
      // Check if an image has been selected
      if (!this.Image) {
        return; // If no image, exit the function
      }

      // Create a FormData object to prepare the image for upload
      const formData = new FormData();
      formData.append('image', this.Image); // Append the selected image to the FormData

      try {
        // Send a POST request to the '/api/upload' endpoint with the FormData
        const response = await axios.post('/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }, // Set appropriate headers for the image upload
        });
      } catch (error) {
        console.error('Error uploading the image:', error); // Log an error if image upload fails
      }
    },

    // Function to check if an asset number exists in the provided list of assets
    isAssetExist(asset_no, AssetList) {
      return AssetList.includes(asset_no); // Check if the asset number is present in the AssetList array
    },

    // Function to check if the entered asset number already exists and provide feedback
    checkAsset() {
      var inputElement = document.getElementById("AssetNo"); // Get the input element with ID "AssetNo"

      // Call the 'isAssetExist' function to check if the entered asset number exists in 'AssetList'
      if (this.isAssetExist(this.form.asset_no, this.AssetList)) {
        alert("Asset number already exists."); // If asset number exists, show an alert
        this.form.asset_no = ""; // Clear the asset number input field
      } else {
        // If asset number doesn't exist, proceed with other actions (not shown in provided code)
      }
    },

    // Asynchronous function to retrieve the list of asset numbers from the server
    async getAssetNo() {
      // Send a GET request to '/getAll' endpoint to fetch the list of assets
      const assetList_response = await this.$axios.$get("/getAll", {
        headers: {
          Authorization: "Bearer " + this.$cookies.get("authToken"), // Attach authorization token to the request headers
        },
      });

      // Extract and store the asset numbers from the fetched response
      this.AssetList = assetList_response.Asset_List.map(
        (data) => data.asset_no
      );
    },

    // Function to validate form input and trigger component replacement
    replaceComponent() {
      // Get references to form input elements
      const AssetNo = document.getElementById("AssetNo");
      const classification = document.getElementById("classification");
      const category = document.getElementById("category");
      const asset_type = document.getElementById("asset_type");
      const manufacturer = document.getElementById("manufacturer");

      // Check if all form inputs are valid
      if (
        AssetNo.checkValidity() &&
        classification.checkValidity() &&
        category.checkValidity() &&
        asset_type.checkValidity() &&
        manufacturer.checkValidity()
      ) {
        // If all inputs are valid, commit the form data to the store and show the modal
        this.$store.commit("setData", this.form);
        this.$bvModal.show("ModalAdd"); // Show the BootstrapVue modal with ID "ModalAdd"
      } else {
        // If any input is invalid, report the validity of each input to show validation messages
        AssetNo.reportValidity();
        classification.reportValidity();
        category.reportValidity();
        asset_type.reportValidity();
        manufacturer.reportValidity();
        // You can also show an alert message if needed
      }
    },

    async fetchDropdowns() {
      try {
        //Category
        const Category_Options = localStorage.getItem("Category_Options");
        if (Category_Options) {
          const responseData = JSON.parse(Category_Options);
          // Use the response data as needed
          this.Category_Options = responseData;
        } else {
          const categories_response = await this.$axios.$get("/getCategories");
          const Category_Options = [
            { value: null, text: "Please select an option" },
            ...categories_response.categories.map((categories) => ({
              value: categories.id,
              text: categories.category_name,
            })),
          ];
          localStorage.setItem(
            "Category_Options",
            JSON.stringify(Category_Options)
          );
        }
      } catch (error) {
        console.error(error);
      }
      try {
        //Classification
        const Classification_Options = localStorage.getItem(
          "Classification_Options"
        );
        if (Classification_Options) {
          const responseData = JSON.parse(Classification_Options);
          // Use the response data as needed
          this.Classification_Options = responseData;
        } else {
          const classification_response = await this.$axios.$get(
            "/getClassifications"
          );
          const Classification_Options = [
            { value: null, text: "Please select an option" },
            ...classification_response.classifications.map(
              (classifications) => ({
                value: classifications.id,
                text: classifications.class_name,
              })
            ),
          ];
          localStorage.setItem(
            "Classification_Options",
            JSON.stringify(Classification_Options)
          );
        }
      } catch (error) {
        console.error(error);
      }
      try {
        //Manufacturer
        const Manufacturer_Options = localStorage.getItem(
          "Manufacturer_Options"
        );
        if (Manufacturer_Options) {
          const responseData = JSON.parse(Manufacturer_Options);
          // Use the response data as needed
          this.Manufacturer_Options = responseData;
        } else {
          const manufacturer_response = await this.$axios.$get(
            "/getManufacturers"
          );
          const Manufacturer_Options = [
            { value: null, text: "Please select an option" },
            ...manufacturer_response.manufacturers.map((manufacturers) => ({
              value: manufacturers.id,
              text: manufacturers.manufacturer_name,
            })),
          ];
          localStorage.setItem(
            "Manufacturer_Options",
            JSON.stringify(Manufacturer_Options)
          );
        }
      } catch (error) {
        console.error(error);
      }
      try {
        //Asset Type
        const Asset_Type_Options = localStorage.getItem("Asset_Type_Options");
        if (Asset_Type_Options) {
          const responseData = JSON.parse(Asset_Type_Options);
          // Use the response data as needed
          this.Asset_Type_Options = responseData;
        } else {
          const asset_type_response = await this.$axios.$get("/getAssetType");
          const Asset_Type_Options = [
            { value: null, text: "Please select an option" },
            ...asset_type_response.assetTypes.map((assetTypes) => ({
              value: assetTypes.id,
              text: assetTypes.assetType_name,
            })),
          ];
          localStorage.setItem(
            "Asset_Type_Options",
            JSON.stringify(Asset_Type_Options)
          );
        }
      } catch (error) {
        console.error(error);
      }
      try {
        //Department
        const Department_Options = localStorage.getItem("Department_Options");
        if (Department_Options) {
          const responseData = JSON.parse(Department_Options);
          // Use the response data as needed
          this.Department_Options = responseData;
        } else {
          const department_response = await this.$axios.$get("/getDepartments");
          const Department_Options = [
            { value: null, text: "Please select an option" },
            ...department_response.departments.map((departments) => ({
              value: departments.id,
              text: departments.dept_name,
            })),
          ];
          localStorage.setItem(
            "Department_Options",
            JSON.stringify(Department_Options)
          );
        }
      } catch (error) {
        console.error(error);
      }
      try {
        //User Roles
        const Role_Options = localStorage.getItem("Role_Options");
        if (Role_Options) {
          const responseData = JSON.parse(Role_Options);
          // Use the response data as needed
          this.Role_Options = responseData;
        } else {
          const role_response = await this.$axios.$get("/getUserRoles");
          const Role_Options = [
            { value: null, text: "Please select an option" },
            ...role_response.roles.map((roles) => ({
              value: roles.id,
              text: roles.role,
            })),
          ];
          localStorage.setItem("Role_Options", JSON.stringify(Role_Options));
        }
      } catch (error) {
        console.error(error);
      }
      try {
        //Status
        const Status_Options = localStorage.getItem("Status_Options");
        if (Status_Options) {
          const responseData = JSON.parse(Status_Options);
          // Use the response data as needed
          this.Status_Options = responseData;
        } else {
          const status_response = await this.$axios.$get("/getStatusType");
          const Status_Options = [
            { value: null, text: "Please select an option" },
            ...status_response.statusType.map((statusType) => ({
              value: statusType.id,
              text: statusType.status_name,
            })),
          ];
          localStorage.setItem(
            "Status_Options",
            JSON.stringify(Status_Options)
          );
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  components: { AssetModalAdd },
};
</script>

<style scoped>
.container {
  position: relative;
  height: 1300px;
  margin-top: 6.25%;
}

.assetCreateContent {
  border: none;
}

.assetCreateHeader {
  position: sticky;
  padding: 0 15px;
  border-bottom: 1px solid rgb(0, 0, 0, 0.1);
  justify-content: center;
  text-align: center;
}

.assetCreate-body {
  padding: 0 30px;
}

.asset-title {
  display: grid;
  grid-template-columns: 15% 85%;
}

.asset-title hr {
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

.Divider-button {
  display: flex;
  justify-content: space-between;
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
