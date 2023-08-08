<template>
  <div class="container">
    <div class="tab_box">
      <button class="tab_btn">Details</button>
      <button class="tab_btn">Purchase</button>
      <button class="tab_btn">Location</button>
      <button class="tab_btn" v-if="(asset_type == 'Desktop' || asset_type == 'Laptop') &&
        DeviceExist === 1
        ">
        Device Spec
      </button>
      <div class="line"></div>
    </div>
    <div class="content_box">
      <!-- =============Details=========== -->
      <div class="assetContent details active">
        <div class="title-header assetdetails">
          <h2>Asset Details</h2>
          <i class="bx bx-edit" id="details-edit"></i>
        </div>
        <div class="img">
          <img v-if="imageSRC" :src="imageUrl" alt="Uploaded Image" v-b-modal.ViewImage />
          <img v-else src="@/static/img/not_found.jpg" alt="Uploaded Image" />
          <input type="file" class="form-control image-update details_input" @change="handleFileChange" />
        </div>
        <b-container fluid>
          <!-- ASSET NO -->
          <b-row class="my-1">
            <b-col class="label" sm="2">
              <label for="input-none">Asset No.</label>
              <label for="input-none">:</label>
            </b-col>
            <b-col sm="10">
              <b-form-input v-model="form.asset_no" class="b-form-input details_input" id="input-none" :state="null"
                placeholder="Asset No"></b-form-input>
            </b-col>
          </b-row>
          <!-- ASSET CLASSIFICATION -->
          <b-row class="my-1">
            <b-col class="label" sm="2">
              <label for="input-none">Classification</label>
              <label for="input-none">:</label>
            </b-col>
            <b-col sm="10">
              <b-form-select v-model="form.classification" class="b-form-input details_input" id="input-none"
                :state="null" :options="Classification_Options"></b-form-select>
            </b-col>
          </b-row>
          <!-- ASSET Category -->
          <b-row class="my-1">
            <b-col class="label" sm="2">
              <label for="input-none">Category</label>
              <label for="input-none">:</label>
            </b-col>
            <b-col sm="10">
              <b-form-select v-model="form.category" class="b-form-input details_input" id="input-none" :state="null"
                :options="Category_Options"></b-form-select>
            </b-col>
          </b-row>
          <!-- ASSET Asset Type-->
          <b-row class="my-1">
            <b-col class="label" sm="2">
              <label for="input-none">Asset Type</label>
              <label for="input-none">:</label>
            </b-col>
            <b-col sm="10">
              <b-form-select v-model="form.asset_type" class="b-form-input details_input" id="input-none" :state="null"
                :options="Asset_Type_Options"></b-form-select>
            </b-col>
          </b-row>
          <!-- ASSET Manufacturer-->
          <b-row class="my-1">
            <b-col class="label" sm="2">
              <label for="input-none">Manufacturer</label>
              <label for="input-none">:</label>
            </b-col>
            <b-col sm="10">
              <b-form-select v-model="form.manufacturer" class="b-form-input details_input" id="input-none" :state="null"
                :options="Manufacturer_Options"></b-form-select>
            </b-col>
          </b-row>
          <!-- ASSET Serial No.-->
          <b-row class="my-1">
            <b-col class="label" sm="2">
              <label for="input-none">Serial No.</label>
              <label for="input-none">:</label>
            </b-col>
            <b-col sm="10">
              <b-form-input v-model="form.serial_no" class="b-form-input details_input" id="input-none" :state="null"
                placeholder="Serial No."></b-form-input>
            </b-col>
          </b-row>
          <!-- ASSET Model-->
          <b-row class="my-1">
            <b-col class="label" sm="2">
              <label for="input-none">Model</label>
              <label for="input-none">:</label>
            </b-col>
            <b-col sm="10">
              <b-form-input v-model="form.model" class="b-form-input details_input" id="input-none" :state="null"
                placeholder="Model"></b-form-input>
            </b-col>
          </b-row>
          <!-- ASSET Description-->
          <b-row class="my-1">
            <b-col class="label" sm="2">
              <label for="input-none">Description</label>
              <label for="input-none">:</label>
            </b-col>
            <b-col sm="10">
              <b-form-textarea v-model="form.description" class="b-form-input details_input"
                style="border: 1px solid black" id="textarea-small" rows="8" placeholder="Description"></b-form-textarea>
            </b-col>
          </b-row>
          <!-- BUTTON -->
          <b-row class="my-1 button-details" style="
              justify-content: right;
              align-items: right;
              text-align: right;
              bottom: 20px;
              right: 20px;
            ">
            <b-col style="text-align: right">
              <button class="btn btn-primary" @click="updateAssetDetails">
                Update
              </button>
            </b-col>
          </b-row>
        </b-container>
      </div>
      <!--===================  PURCHASE ===================-->
      <div class="assetContent purchase">
        <div class="title-header">
          <h2>Asset Purchase</h2>
          <i class="bx bx-edit" id="purchase-edit"></i>
        </div>
        <!-- ASSET Item Code-->
        <b-row class="my-1">
          <b-col class="label" sm="2">
            <label for="input-none">Item Code</label>
            <label for="input-none">:</label>
          </b-col>
          <b-col sm="10">
            <b-form-input v-model="form.item_code" class="b-form-input purchase_input" id="input-none" :state="null"
              placeholder="Item Code"></b-form-input>
          </b-col>
        </b-row>
        <!-- ASSET Company-->
        <b-row class="my-1">
          <b-col class="label" sm="2">
            <label for="input-none">Company</label>
            <label for="input-none">:</label>
          </b-col>
          <b-col sm="10">
            <b-form-input v-model="form.company" class="b-form-input purchase_input" id="input-none" :state="null"
              placeholder="Company"></b-form-input>
          </b-col>
        </b-row>
        <!-- ASSET Supplier-->
        <b-row class="my-1">
          <b-col class="label" sm="2">
            <label for="input-none">Supplier</label>
            <label for="input-none">:</label>
          </b-col>
          <b-col sm="10">
            <b-form-input v-model="form.supplier" class="b-form-input purchase_input" id="input-none" :state="null"
              placeholder="Supplier"></b-form-input>
          </b-col>
        </b-row>
        <!-- ASSET Amount-->
        <b-row class="my-1">
          <b-col class="label" sm="2">
            <label for="input-none">Amount</label>
            <label for="input-none">:</label>
          </b-col>
          <b-col sm="10">
            <b-form-input type="number" v-model="form.amount" class="b-form-input purchase_input" id="input-none"
              :state="null" placeholder="Amount"></b-form-input>
          </b-col>
        </b-row>
        <!-- ASSET Purchase Date-->
        <b-row class="my-1">
          <b-col class="label" sm="2">
            <label for="input-none">Date</label>
            <label for="input-none">:</label>
          </b-col>
          <b-col sm="10">
            <b-form-input type="date" v-model="form.date" class="b-form-input purchase_input" id="input-none"
              :state="null" placeholder="Date"></b-form-input>
          </b-col>
        </b-row>
        <!-- BUTTON PURCHASE -->
        <b-row class="my-1 button-purchase" style="
            justify-content: right;
            align-items: right;
            text-align: right;
            bottom: 20px;
            right: 20px;
          ">
          <b-col style="text-align: right">
            <button class="btn btn-primary" @click="updatedPurchaseDetails">
              Update
            </button>
          </b-col>
        </b-row>
      </div>
      <!--=================== LOCATION =================== -->
      <div class="assetContent location">
        <div class="title-header">
          <h2>Asset Location</h2>
        </div>
        <!-- ASSET Area-->
        <b-row class="my-1">
          <b-col class="label" sm="2">
            <label for="input-none">Area</label>
            <label for="input-none">:</label>
          </b-col>
          <b-col sm="10">
            <b-form-input v-model="form.area" class="b-form-input location_input" id="input-none" :state="null"
              placeholder="Area"></b-form-input>
          </b-col>
        </b-row>
        <!-- ASSET Responsible-->
        <b-row class="my-1">
          <b-col class="label" sm="2">
            <label for="input-none">Responsible</label>
            <label for="input-none">:</label>
          </b-col>
          <b-col sm="10">
            <b-form-input v-model="form.responsible" class="b-form-input location_input" id="input-none" :state="null"
              placeholder="Responsible"></b-form-input>
          </b-col>
        </b-row>
        <!-- ASSET Responsible-->
        <b-row class="my-1">
          <b-col class="label" sm="2">
            <label for="input-none">Department</label>
            <label for="input-none">:</label>
          </b-col>
          <b-col sm="10">
            <b-form-select v-model="form.department" class="b-form-input location_input" id="input-none" :state="null"
              :options="Department_Options"></b-form-select>
          </b-col>
        </b-row>
        <!-- ASSET Roles-->
        <b-row class="my-1">
          <b-col class="label" sm="2">
            <label for="input-none">Roles</label>
            <label for="input-none">:</label>
          </b-col>
          <b-col sm="10">
            <b-form-select v-model="form.role_id" class="b-form-input location_input" id="input-none" :state="null"
              :options="Role_Options"></b-form-select>
          </b-col>
        </b-row>
        <!-- ASSET Status-->
        <b-row class="my-1">
          <b-col class="label" sm="2">
            <label for="input-none">Status</label>
            <label for="input-none">:</label>
          </b-col>
          <b-col sm="10">
            <b-form-select v-model="form.status_id" class="b-form-input location_input" id="input-none" :state="null"
              :options="Status_Options"></b-form-select>
          </b-col>
        </b-row>
        <!-- ASSET Remarks-->
        <b-row class="my-1">
          <b-col class="label" sm="2">
            <label for="input-none">Remarks</label>
            <label for="input-none">:</label>
          </b-col>
          <b-col sm="10">
            <b-form-input v-model="form.remarks" class="b-form-input location_input" id="input-none" :state="null"
              placeholder="Remarks"></b-form-input>
          </b-col>
        </b-row>
        <!-- BUTTON -->
        <b-row class="my-1 button-location" style="
            justify-content: right;
            align-items: right;
            text-align: right;
            bottom: 20px;
            right: 20px;
          ">
          <b-col style="text-align: right">
            <button class="btn btn-primary" @click="updatedLocationDetails()">
              Update
            </button>
          </b-col>
        </b-row>
      </div>
      <!--=================== Device Spec =================== -->
      <div class="assetContent device">
        <div class="title-header">
          <h2>Asset Device</h2>
          <i class="bx bx-edit" id="device-edit"></i>
        </div>
        <!-- ASSET Area-->
        <b-row class="my-1">
          <b-col class="label" sm="2">
            <label for="input-none">Processor</label>
            <label for="input-none">:</label>
          </b-col>
          <b-col sm="10">
            <b-form-input v-model="form.processor" class="b-form-input device_input" id="input-none" :state="null"
              placeholder="Processor"></b-form-input>
          </b-col>
        </b-row>
        <!-- ASSET Responsible-->
        <b-row class="my-1">
          <b-col class="label" sm="2">
            <label for="input-none">Memory Type</label>
            <label for="input-none">:</label>
          </b-col>
          <b-col sm="10">
            <b-form-input v-model="form.memory_type" class="b-form-input device_input" id="input-none" :state="null"
              placeholder="Memory Type"></b-form-input>
          </b-col>
        </b-row>
        <!-- ASSET Responsible-->
        <b-row class="my-1">
          <b-col class="label" sm="2">
            <label for="input-none">Memory Size</label>
            <label for="input-none">:</label>
          </b-col>
          <b-col sm="10">
            <b-form-input v-model="form.memory_size" class="b-form-input device_input" id="input-none" :state="null"
              placeholder="Memory Size"></b-form-input>
          </b-col>
        </b-row>
        <!-- ASSET Roles-->
        <b-row class="my-1">
          <b-col class="label" sm="2">
            <label for="input-none">Storage Type</label>
            <label for="input-none">:</label>
          </b-col>
          <b-col sm="10">
            <b-form-input v-model="form.storage_type" class="b-form-input device_input" id="input-none" :state="null"
              placeholder="Storage Type"></b-form-input>
          </b-col>
        </b-row>
        <!-- ASSET Status-->
        <b-row class="my-1">
          <b-col class="label" sm="2">
            <label for="input-none">Storage Size</label>
            <label for="input-none">:</label>
          </b-col>
          <b-col sm="10">
            <b-form-input v-model="form.storage_size" class="b-form-input device_input" id="input-none" :state="null"
              placeholder="Storage Size"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col class="label" sm="2">
            <label for="input-none">Operating System</label>
            <label for="input-none">:</label>
          </b-col>
          <b-col sm="10">
            <b-form-input v-model="form.software" class="b-form-input device_input" id="input-none" :state="null"
              placeholder="Operating System"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col class="label" sm="2">
            <label for="input-none">Version</label>
            <label for="input-none">:</label>
          </b-col>
          <b-col sm="10">
            <b-form-input v-model="form.version" class="b-form-input device_input" id="input-none" :state="null"
              placeholder="Version"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col class="label" sm="2">
            <label for="input-none">License Key</label>
            <label for="input-none">:</label>
          </b-col>
          <b-col sm="10">
            <b-form-input v-model="form.license_key" class="b-form-input device_input" id="input-none" :state="null"
              placeholder="License Key"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col class="label" sm="2">
            <label for="input-none">Prior License Key</label>
            <label for="input-none">:</label>
          </b-col>
          <b-col sm="10">
            <b-form-input v-model="form.prior_key" class="b-form-input device_input" id="input-none" :state="null"
              placeholder="Prior License Key"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col class="label" sm="2">
            <label for="input-none">Document Suite</label>
            <label for="input-none">:</label>
          </b-col>
          <b-col sm="10">
            <b-form-input v-model="form.docSuite" class="b-form-input device_input" id="input-none" :state="null"
              placeholder="Software Name"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col class="label" sm="2">
            <label for="input-none">Document Suite Key</label>
            <label for="input-none">:</label>
          </b-col>
          <b-col sm="10">
            <b-form-input v-model="form.docSuite_key" class="b-form-input device_input" id="input-none" :state="null"
              placeholder="Document Suite License Key"></b-form-input>
          </b-col>
        </b-row>
        <!-- button-->
        <b-row class="my-1 button-device" style="
            justify-content: right;
            align-items: right;
            text-align: right;
            bottom: 20px;
            right: 20px;
          ">
          <b-col style="text-align: right">
            <button class="btn btn-primary" @click="updatedDeviceDetails()">
              Update
            </button>
          </b-col>
        </b-row>
      </div>
      <!-- </template> -->
    </div>
    <b-modal id="ViewImage" size="xl" title="Small Modal" hide-header hide-footer
      style="overflow-y: auto; margin-top: 5vh">
      <div :style="{
        height: '90vh',
        'background-image': `url(${imageUrl})`,
        'background-size': 'cover',
        'background-repeat': 'no-repeat',
      }"></div>
    </b-modal>
  </div>
</template>
<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {
      asset_id: this.$store.getters.getData.asset_id,
      asset_type: this.$store.getters.getData.asset_type,
      asset_data: null,

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
        status_id: null,
        remarks: null,

        processor: null,
        memory_type: null,
        memory_size: null,
        storage_type: null,
        storage_size: null,

        software: null,
        version: null,
        license_key: null,
        prior_key: null,

        docSuite: null,
        docSuite_key: null,

        selectedFile: null,
      },
      Classification_Options: [],
      Category_Options: [],
      Asset_Type_Options: [],
      Manufacturer_Options: [],
      Department_Options: [],
      Role_Options: [],
      Status_Options: [],
      imageUrl: null,
      imageSRC: null,
      asset_update: null,
      AssetNo: null,
      AssetList: [],
      DeviceExist: 0,
    };
  },
  created() {
    this.getAssetNo();
  },
  mounted() {
    const permissions = this.$cookies.get("permission");
    this.asset_update = permissions[0].asset_update;

    const updateDetails = document.querySelectorAll(".bx-edit");
    if (this.asset_update === "0") {
      for (let i = 0; i < updateDetails.length; i++) {
        updateDetails[i].style.display = "none";
      }
    }
    this.fetchDropdowns();
    this.$store
      .dispatch("getAssetDetailsByID", { id: this.asset_id })
      .then(() => {
        const assetDetails = this.$store.getters.getAssetView;
        if (assetDetails) {
          const asset = assetDetails.asset_details;
          const purchase = assetDetails.purchaseDetails;
          const location = assetDetails.location_details;
          const specDetails = assetDetails.specDetails;

          if (asset) {
            this.form.asset_no = asset.asset_no;
            this.form.classification = asset.classification;

            this.imageSRC = asset.img_url;
            this.imageUrl = process.env.BASE_URL + asset.img_url; //palitan to ng base url

            this.form.category = asset.category;
            this.form.asset_type = asset.asset_type;
            this.form.manufacturer = asset.manufacturer;
            this.form.serial_no = asset.serial_no;
            this.form.model = asset.model;
            this.form.description = asset.description;
          }
          this.checkAsset();
          if (purchase) {
            this.form.item_code = purchase.item_code;
            this.form.company = purchase.company;
            this.form.supplier = purchase.supplier;
            this.form.amount = purchase.amount;
            this.form.date = purchase.date;
          }
          if (location) {
            this.form.site = location.site;
            this.form.area = location.area;
            this.form.responsible = location.responsible;
            this.form.department = location.department;
            this.form.role_id = location.role_id;
            this.form.status_id = location.status_id;
          }
          if (specDetails) {
            this.form.processor = specDetails.processor;
            this.form.memory_type = specDetails.memory_type;
            this.form.memory_size = specDetails.memory_size;
            this.form.storage_type = specDetails.storage_type;
            this.form.storage_size = specDetails.storage_size;

            this.form.software = specDetails.software;
            this.form.version = specDetails.version;
            this.form.license_key = specDetails.license_key;
            this.form.prior_key = specDetails.os_prior_license_key;

            this.form.docSuite = specDetails.software_document;
            this.form.docSuite_key = specDetails.document_key;
          }
        }
      });
    const elements = [
      {
        editButton: document.getElementById("details-edit"),
        content: document.querySelector(".details"),
        inputs: document.querySelectorAll(".details_input"),
      },
      {
        editButton: document.getElementById("purchase-edit"),
        content: document.querySelector(".purchase"),
        inputs: document.querySelectorAll(".purchase_input"),
      },
      {
        editButton: document.getElementById("device-edit"),
        content: document.querySelector(".device"),
        inputs: document.querySelectorAll(".device_input"),
      },
    ];
    elements.forEach(({ editButton, content, inputs }) => {
      editButton.addEventListener("click", () => {
        content.classList.toggle("update");
        inputs.forEach((el) => {
          el.classList.toggle("edit");
        });

        elements.forEach((element) => {
          if (element.content !== content) {
            element.content.classList.remove("update");
            element.inputs.forEach((el) => {
              el.classList.remove("edit");
            });
          }
        });
      });
    });
    const storedArray = localStorage.getItem("myArray");
    if (storedArray) {
      this.myArray = JSON.parse(storedArray);
    }
  },
  methods: {
    isAssetExist(assetNo, AssetList) {
      return AssetList.includes(assetNo);
    },
    checkAsset() {
      if (this.isAssetExist(this.form.asset_no, this.AssetList)) {
        this.DeviceExist = 1;
      }
      setTimeout(() => {
        const tabs = document.querySelectorAll(".tab_btn");
        const all_content = document.querySelectorAll(".assetContent");
        const line = document.querySelector(".line");
        tabs.forEach((tab, index) => {
          tab.addEventListener("click", (e) => {
            tabs.forEach((tab) => {
              tab.classList.remove("active");
            });
            tab.classList.add("active");
            line.style.width = e.target.offsetWidth + "px";
            line.style.left = e.target.offsetLeft + "px";

            all_content.forEach((content) => {
              content.classList.remove("active");
            });
            all_content[index].classList.add("active");
          });
        });
      }, 500);
    },
    async getAssetNo() {
      const assetList_response = await this.$axios.$get(
        "/getAssetsWithDeviceSpecs",
        {
          headers: {
            Authorization: "Bearer " + this.$cookies.get("authToken"),
          },
        }
      );
      this.AssetList = assetList_response.AssetsWithDeviceSpecs.map(
        (data) => data.asset_no
      );
    },
    handleFileChange(event) {
      this.form.selectedFile = event.target.files[0];

      const formData = new FormData();
      formData.append("image", this.form.selectedFile);
    },
    async updateAssetDetails() {
      this.$store.commit("setAuditAction", "Update-Details");

      try {
        const formData = new FormData();
        formData.append("asset_no", this.form.asset_no);
        formData.append("classification", this.form.classification);
        formData.append("category", this.form.category);
        formData.append("asset_type", this.form.asset_type);
        formData.append("manufacturer", this.form.manufacturer);
        formData.append("serial_no", this.form.serial_no);
        formData.append("model", this.form.model);
        formData.append("description", this.form.description);
        formData.append("image", this.form.selectedFile);

        const update_response = await this.$axios.$post(
          `/updateAsset/${this.asset_id}`,
          formData,
          {
            headers: {
              Authorization: "Bearer " + this.$cookies.get("authToken"),
            },
          }
        );
        if (update_response.status === 200) {
          Swal.fire({
            title: "Success!",
            icon: "success",
            showCancelButton: false,
            confirmButtonText: "OK",
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                await this.$axios.$post(
                  "/auditlogs",
                  this.$store.getters.getAuditList,
                  {
                    headers: {
                      Authorization: "Bearer " + this.$cookies.get("authToken"),
                    },
                  }
                );
                location.reload();
              } catch (error) {
                Swal.fire(
                  "Error",
                  "Error occurred while posting audit logs",
                  "error"
                );
              }
            }
          });
        } else {
          Swal.fire("Error Occur");
        }
      } catch (error) {
        console.error("Error occurred while updating asset details:", error);
      }
    },
    async updatedPurchaseDetails() {
      this.$store.commit("setAuditAction", "Update-Purchase");

      const submittedForm = {
        item_code: this.form.item_code,
        company: this.form.company,
        supplier: this.form.supplier,
        amount: this.form.amount,
        date: this.form.date,
      };

      try {
        const update_response = await this.$axios.$post(
          `/updatePurchases/${this.asset_id}`,
          submittedForm,
          {
            headers: {
              Authorization: "Bearer " + this.$cookies.get("authToken"),
            },
          }
        );

        if (update_response.status === 200) {
          Swal.fire({
            title: "Success!",
            icon: "success",
            showCancelButton: false,
            confirmButtonText: "OK",
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                await this.$axios.$post(
                  "/auditlogs",
                  this.$store.getters.getAuditList,
                  {
                    headers: {
                      Authorization: "Bearer " + this.$cookies.get("authToken"),
                    },
                  }
                );
                location.reload();
              } catch (error) {
                Swal.fire(
                  "Error",
                  "Error occurred while posting audit logs",
                  "error"
                );
              }
            }
          });
        } else {
          Swal.fire("Error Occur");
        }
      } catch (error) {
        console.error("Error occurred while updating purchase details:", error);
      }
    },
    async updatedLocationDetails() {
      this.$store.commit("setAuditAction", "Update-Location");

      const submittedForm = {
        site: this.form.site,
        area: this.form.area,
        department: this.form.department,
        responsible: this.form.responsible,
        role_id: this.form.role_id,
        status_id: this.form.status_id,
      };

      try {
        const update_response = await this.$axios.$post(
          `/updateLocation/${this.asset_id}`,
          submittedForm,
          {
            headers: {
              Authorization: "Bearer " + this.$cookies.get("authToken"),
            },
          }
        );
        if (update_response.status === 200) {
          Swal.fire({
            title: "Success!",
            icon: "success",
            showCancelButton: false,
            confirmButtonText: "OK",
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                await this.$axios.$post(
                  "/auditlogs",
                  this.$store.getters.getAuditList,
                  {
                    headers: {
                      Authorization: "Bearer " + this.$cookies.get("authToken"),
                    },
                  }
                );
                location.reload();
              } catch (error) {
                Swal.fire(
                  "Error",
                  "Error occurred while posting audit logs",
                  "error"
                );
              }
            }
          });
        } else {
          Swal.fire("Error Occur");
        }
      } catch (error) {
        console.error("Error occurred while updating location details:", error);
      }
    },
    async updatedDeviceDetails() {
      this.$store.commit("setAuditAction", "Update-DeviceSpecs");

      const submittedForm = {
        processor: this.form.processor,
        memory_type: this.form.memory_type,
        memory_size: this.form.memory_size,
        storage_type: this.form.storage_type,
        storage_size: this.form.storage_size,

        software: this.form.software,
        version: this.form.version,
        license_key: this.form.license_key,
        prior_key: this.form.prior_key,

        docSuite: this.form.docSuite,
        docSuite_key: this.form.docSuite_key,
      };

      try {
        const update_response = await this.$axios.$post(
          `/updateDevspec/${this.asset_id}`,
          submittedForm,
          {
            headers: {
              Authorization: "Bearer " + this.$cookies.get("authToken"),
            },
          }
        );
        if (update_response.status === 200) {
          Swal.fire({
            title: "Success!",
            icon: "success",
            showCancelButton: false,
            confirmButtonText: "OK",
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                await this.$axios.$post(
                  "/auditlogs",
                  this.$store.getters.getAuditList,
                  {
                    headers: {
                      Authorization: "Bearer " + this.$cookies.get("authToken"),
                    },
                  }
                );
                location.reload();
              } catch (error) {
                Swal.fire(
                  "Error",
                  "Error occurred while posting audit logs",
                  "error"
                );
              }
            }
          });
        }
      } catch (error) {
        Swal.fire(
          "Error",
          "Error occurred while updating device specs",
          "error"
        );
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
};
</script>
<style scoped>
.container {
  /* position: absolute; */
  /* padding: 40px; */
  height: 90vh;
  width: 110%;
  overflow: auto;
  /* top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow-y: auto;
    background-color: var(--sidebar);
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.1); */
}

*::-webkit-scrollbar {
  display: block;
  /* Chrome and Safari */
}

.title-header {
  display: flex;
  justify-content: space-between;
}

.title-header i {
  font-size: 20px;
  color: blue;
  cursor: pointer;
}

.tab_box {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 2px solid grey;
  position: relative;
}

.tab_box .tab_btn {
  font-size: 18px;
  font-weight: 600;
  color: var(--font-color);
  background: none;
  border: none;
  padding: 18px;
  cursor: pointer;
}

.tab_box .tab_btn.active {
  color: #7360ff;
}

.assetContent {
  padding: 20px;
  overflow-x: auto;
}

.content_box .assetContent {
  display: none;
  animation: moving 0.5s ease;
}

@keyframes moving {
  from {
    transform: translateX(50px);
    opacity: 0;
  }

  to {
    transform: translateX(0px);
    opacity: 1;
  }
}

.content_box .assetContent.active {
  display: block;
}

.content_box .assetContent h2 {
  margin-bottom: 10px;
}

.line {
  position: absolute;
  top: 62px;
  left: 39px;
  width: 43px;
  height: 5px;
  background-color: #7360ff;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.button-details {
  display: none;
}

.button-purchase {
  display: none;
}

.button-location {
  display: none;
}

.button-device {
  display: none;
}

.b-form-input {
  border: none;
  border-radius: 0;
  border-bottom: 1px solid black;
  pointer-events: none;
}

.label {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.label label {
  color: black;
}

.img {
  justify-content: left;
  text-align: left;
  align-items: left;
}

img {
  height: 150px;
  width: 150px;
  border: 3px solid var(--font-color);
}

.image-update {
  width: 100%;
  border: 1px solid rgb(0, 0, 0, 0.3);
  border-radius: 15px;
  border: none;
  display: none;
}

.image-update::-webkit-file-upload-button {
  background-color: transparent;
  border: none;
  border-right: 1px solid var(--blue) !important;
  box-shadow: none;
  height: 100%;
  width: 15%;
  margin-right: 15px;
  background-color: var(--blue);
  color: var(--white);
  cursor: pointer;
  border-radius: 15px;
}

.assetContent.details.update .image-update.details_input.edit {
  display: block;
  border: none;
  border-radius: 5px;
  pointer-events: auto;
  background-color: rgb(242, 242, 242, 0);
  margin-left: -15px;
}

.assetContent.details.update .details_input.edit {
  border: 1px solid black;
  border-radius: 5px;
  pointer-events: auto;
  background-color: rgb(242, 242, 242);
}

.assetContent.details.update .button-details {
  display: block;
}

.assetContent.purchase.update .purchase_input.edit {
  border: 1px solid black;
  border-radius: 5px;
  pointer-events: auto;
  background-color: rgb(242, 242, 242);
}

.assetContent.purchase.update .button-purchase {
  display: block;
}

.assetContent.location.update .location_input.edit {
  border: 1px solid black;
  border-radius: 5px;
  pointer-events: auto;
  background-color: rgb(242, 242, 242);
}

.assetContent.location.update .button-location {
  display: block;
}

.assetContent.device.update .device_input.edit {
  border: 1px solid black;
  border-radius: 5px;
  pointer-events: auto;
  background-color: rgb(242, 242, 242);
}

.assetContent.device.update .button-device {
  display: block;
}
</style>
