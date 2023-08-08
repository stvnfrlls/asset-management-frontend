<template>
  <div>
    <h2>Asset Device Specification</h2>
    <hr />
    <label for="AssetNo">Asset No.</label>
    <input type="hidden" v-model="form.assetID" />
    <input type="text" v-model="form.assetNo" id="AssetNo" class="form-control" list="AssetNoOptions"
      placeholder="Asset No." style="width: 40%" @blur="checkAsset()" />
    <datalist id="AssetNoOptions">
      <option v-for="assetNo in AssetNo" :value="assetNo.asset_no"></option>
    </datalist>
    <span class="errors" v-if="this.error_List.assetID">{{ this.error_List.assetID[0] }}</span>
    <div class="Divider-3">
      <div>
        <label for="AssetCategory">Category</label>
        <input type="text" v-model="form.category" id="AssetCategory" class="form-control" readonly />
        <span class="errors" v-if="this.error_List.category">{{ this.error_List.category[0] }}</span>

      </div>
      <div>
        <label for="AssetManufacturer">Manufacturer</label>
        <input type="text" v-model="form.manufacturer" id="AssetManufacturer" class="form-control" readonly />
      </div>
      <div>
        <label for="AssetSerialNo">Serial No.</label>
        <input type="text" v-model="form.serialNo" id="SerialNo" class="form-control" readonly />
      </div>
    </div>
    <div class="Divider">
      <div>
        <label for="AssetModel">Model</label>
        <input type="text" v-model="form.model" id="AssetModel" class="form-control" readonly />
      </div>
      <div>
        <label for="AssetProccessor">Proccessor</label>
        <input type="text" v-model="form.processor" id="AssetProccessor" class="form-control" placeholder="Proccessor" />
        <span class="errors" v-if="this.error_List.processor">{{ this.error_List.processor[0] }}</span>
      </div>
    </div>
    <hr />
    <div class="Divider">
      <div>
        <label for="AssetMemory">Memory</label>
        <div class="Divider">
          <div>
            <input type="text" v-model="form.memoryType" id="AssetMemoryType" class="form-control"
              placeholder="Memory Type" />
            <span class="errors" v-if="this.error_List.memoryType">{{ this.error_List.memoryType[0] }}</span>
          </div>
          <div>
            <input type="text" v-model="form.memorySize" id="AssetMemorySize" class="form-control"
              placeholder="Memory Size(GB)" />
            <span class="errors" v-if="this.error_List.memorySize">{{ this.error_List.memorySize[0] }}</span>
          </div>
        </div>
      </div>
      <div>
        <label for="AssetMemoryType">Storage</label>
        <div class="Divider">
          <div>
            <input type="text" v-model="form.storageType" id="AssetMemoryType" class="form-control"
              placeholder="StorageType" />
            <span class="errors" v-if="this.error_List.storageType">{{ this.error_List.storageType[0] }}</span>
          </div>
          <div>
            <input type="text" v-model="form.storageSize" id="AssetMemorySize" class="form-control"
              placeholder="StorageSize(GB)" />
            <span class="errors" v-if="this.error_List.storageSize">{{ this.error_List.storageSize[0] }}</span>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="Divider">
      <div>
        <label for="AssetOS">Oprating System</label>
        <input type="hidden" v-model="form.licenseID" />
        <b-form-select v-model="form.operatingSystem" id="AssetOS" class="form-control" :options="OS_Options"
          placeholder="Operating System" />
        <span class="errors" v-if="this.error_List.licenseID">{{ this.error_List.licenseID[0] }}</span>
      </div>
      <div>
        <label for="AssetOS"></label>
        <input type="text" v-model="form.version" id="AssetOSVersion" class="form-control" placeholder="Version"
          readonly />
      </div>
    </div>
    <div class="Divider">
      <div>
        <label for="AssetOS"></label>
        <input type="text" v-model="form.licenseKey" id="AssetOSLicense" class="form-control" placeholder="License Key"
          readonly />
      </div>
      <div>
        <label for="AssetOS"></label>
        <input type="text" v-model="form.priorKey" id="AssetOSPrior" class="form-control" placeholder="Prior License" />
      </div>
    </div>
    <hr />
    <div class="Divider">
      <div>
        <label for="AssetOffice">Document Suite</label>
        <b-form-select v-model="form.documentSuite" id="AssetOfficeVersion" class="form-control"
          :options="DocuentSuite_Options" placeholder="Document Suite" />
      </div>
      <div>
        <label for="AssetOfficeLicense"></label>
        <input type="text" v-model="documentSuite_key" id="AssetOfficeLicense" class="form-control"
          placeholder="License Key" readonly />
      </div>
    </div>

    <div class="button" style="justify-content: right; margin-top: 2%">
      <button type="button" class="btn btn-primary" @click="submitForm" :disabled="isLoading">
        <div v-if="isLoading" style="flex">
          <div class="spinner-border text-primary" role="status"></div>
        </div>
        <div v-else>
          <span>Submit</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {
      form: {
        assetID: null,
        assetNo: null,
        category: null,
        manufacturer: null,
        serialNo: null,
        model: null,

        processor: null,
        memoryType: null,
        memorySize: null,
        storageType: null,
        storageSize: null,

        licenseID: null,
        operatingSystem: null,
        version: null,
        licenseKey: null,
        priorKey: null,

        documentSuite: null,
      },
      isLoading: false,
      AssetList: [],
      errors: null,
      error_List: [],
      AssetNo: null,
      AssetDetails: this.$store.getters.getAssetDetails,
      OS_Options: null,
      OS_Details: null,
      DocuentSuite_Options: [],
      DocumentSuite_Details: [],
      documentSuite_key: null
    };
  },
  created() {
    this.fetchAssetNo();
    this.fetchAssetDetails();
    this.fetchOS();
    this.getAssetNo();
    this.fetchDocSuite();
  },
  watch: {
    "form.assetNo"() {
      this.GET_ASSET_DETAILS();
    },
    "form.operatingSystem"() {
      this.GET_OS_INFO();
    },
    "form.documentSuite"() {
      this.GET_DOCSUITE_INFO();
    }
  },
  methods: {
    // Function to format the 'priorKey' value by removing non-alphanumeric characters, converting to uppercase, and grouping with dashes
    formatPriorKey() {
      // Remove non-alphanumeric characters from the input
      const alphanumericKey = this.form.priorKey.replace(/\W/g, '');

      // Convert the alphanumeric key to uppercase
      const uppercaseKey = alphanumericKey.toUpperCase();

      // Split the uppercase key into groups of 4 characters
      const groups = uppercaseKey.match(/.{1,4}/g);

      // Join the groups with dashes in between
      this.form.priorKey = groups ? groups.join('-') : '';
    },

    // Function to check if an asset number exists in the provided list of assets
    isAssetExist(assetNo, AssetList) {
      return AssetList.includes(assetNo); // Check if the asset number is present in the AssetList array
    },

    // Function to validate asset existence and take appropriate actions
    checkAsset() {
      var inputElement = document.getElementById("AssetNo"); // Get the input element with ID "AssetNo"
      if (this.isAssetExist(this.form.assetNo, this.AssetList)) {
        console.log(this.form.category); // Log the category if the asset exists
      } else {
        alert("Asset No. Doesn't Exist"); // Show an alert if the asset doesn't exist
        this.form.assetNo = ""; // Clear the asset number input field
      }
    },

    // Asynchronous function to fetch asset numbers for device specifications
    async getAssetNo() {
      try {
        const assetList_response = await this.$axios.$get("/getDeviceAssetNo", {
          headers: {
            Authorization: "Bearer " + this.$cookies.get("authToken"),
          },
        });
        // Store the asset numbers and the corresponding list for selection
        this.AssetNo = assetList_response.Asset_List;
        this.AssetList = assetList_response.Asset_List.map(
          (data) => data.asset_no
        );
      } catch (error) {
        console.error(error);
      }
    },

    // Asynchronous function to submit the form data for device specifications
    async submitForm() {
      this.$store.commit("setAuditItemNo", this.form.assetNo);

      this.isLoading = true;
      try {
        const response = await this.$axios.$post('/addDevspec', this.form, {
          headers: {
            Authorization: "Bearer " + this.$cookies.get("authToken"),
          },
        });
        this.isLoading = false;
        if (response.status === 200) {
          // Show success alert and post audit logs
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
                Swal.fire('Error', 'Error occurred while posting audit logs', 'error');
              }
            }
          });
        }
      } catch (error) {
        // Handle validation errors
        if (error.response.status) {
          this.errors = Object.values(error.response.data.errors).flat();
          this.error_List = error.response.data.errors;
          this.showValidationErrorAlert();
        }
      }
    },

    // Function to show a validation error alert with error messages
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

    // Function to fetch asset numbers from the server
    fetchAssetNo() {
      this.$axios
        .$get("/getAssetNo", {
          headers: {
            Authorization: "Bearer " + this.$cookies.get("authToken"),
          },
        })
        .then((res) => {
          this.AssetNo = res.Asset_List; // Store the response in the AssetNo variable
        });
    },

    // Function to fetch asset details from the server
    fetchAssetDetails() {
      this.$axios
        .$get("/getDevice", {
          headers: {
            Authorization: "Bearer " + this.$cookies.get("authToken"),
          },
        })
        .then((res) => {
          this.AssetDetails = res.Asset_List; // Store the response in the AssetNo variable
        });
    },

    // Function to fetch available operating systems from the server
    fetchOS() {
      this.$axios.$get("/availableOS", {
        headers: {
          Authorization: "Bearer " + this.$cookies.get("authToken"),
        },
      }).then((res) => {
        // Store the available OS options and details
        this.OS_Options = [
          { value: null, text: "Please select an option" },
          ...res.available_OS.map((available_OS) => ({
            value: available_OS.id,
            text: available_OS.software,
          })),
        ];
        this.OS_Details = res.available_OS;
      });
    },

    // Function to fetch available document suite options from the server
    fetchDocSuite() {
      this.$axios.$get("/availableOffice", {
        headers: {
          Authorization: "Bearer " + this.$cookies.get("authToken"),
        },
      }).then((res) => {
        // Store the available document suite options and details
        this.DocuentSuite_Options = [
          { value: null, text: "Please select an option" },
          ...res.available_Office.map((Office) => ({
            value: Office.id,
            text: Office.software,
          })),
        ];
        this.DocumentSuite_Details = res.available_Office;
      });
    },

    // Function to fetch asset details based on the selected asset number
    GET_ASSET_DETAILS() {
      // Find the matching data based on the selected asset number
      const assetDetails = this.AssetDetails.find(
        (AssetDetails) => AssetDetails.asset_no === this.form.assetNo
      );
      // If matching data is found, update the form properties
      if (assetDetails) {
        this.form.assetID = assetDetails.id;
        this.form.category = assetDetails.category;
        this.form.manufacturer = assetDetails.manufacturer;
        this.form.serialNo = assetDetails.serial_no;
        this.form.model = assetDetails.model;
      } else {
        // Clear the form properties if no matching asset data
        this.form.assetID = null;
        this.form.category = null;
        this.form.manufacturer = null;
        this.form.serialNo = null;
        this.form.model = null;
      }
    },

    // Function to fetch OS information based on the selected operating system
    GET_OS_INFO() {
      // Find the matching OS data based on the selected software
      const matchingOS = this.OS_Details.find(
        (OS_Details) => OS_Details.id == this.form.operatingSystem
      );
      // If matching OS data is found, update the form properties
      if (matchingOS) {
        this.form.licenseID = matchingOS.id;
        this.form.version = matchingOS.version;
        this.form.licenseKey = matchingOS.license_key;
      } else {
        // Clear the form properties if no matching OS data
        this.form.licenseID = null;
        this.form.version = null;
        this.form.licenseKey = null;
      }
    },

    // Function to fetch document suite information based on the selected document suite
    GET_DOCSUITE_INFO() {
      // Find the matching document suite data based on the selected suite
      const matchingDocSuite = this.DocumentSuite_Details.find(
        (DocumentSuite_Details) => DocumentSuite_Details.id == this.form.documentSuite
      );

      if (matchingDocSuite) {
        this.documentSuite_key = matchingDocSuite.license_key;
      } else {
        this.documentSuite_key = null;
      }
    }

  },
};
</script>

<style scoped>
input[readonly] {
  background-color: var(--read-only);
  /* Replace this with your preferred background color */
}

.Divider-4 {
  display: grid;
  grid-template-columns: 24.5% 24.5% 24.5% 24.5%;
  justify-content: space-between;
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

.button {
  justify-content: center;
  text-align: right;
}

.button .btn {
  width: 20%;
}

.button span {
  color: white;
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

::v-deep .form-control .form-control-icon {
  color: red;
  /* Replace 'red' with your desired icon color */
}
</style>
