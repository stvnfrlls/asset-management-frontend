<template>
  <div class="upload-container">
    <div class="card upload-file">
      <div class="card-header">Upload template for Asset Inventory</div>
      <div class="card-body">
        <div style="display: flex; column-gap: 1%">
          <input type="file" class="UploadAsset_excel_file" name="" id="UploadAsset_excel_file" placeholder="sadasd"
            style="border-radius: 2px" ref="fileInput" />
          <button class="btn btn-primary" @click="handleFileUpload" style="color:white;">
            Submit
          </button>
        </div>
        <a href="/upload_template.xlsx" download>Download File</a>
      </div>
    </div>
    <div>
      <div id="error-container"></div>
    </div>
  </div>
</template>


<script>
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      AssetList: [],
    };
  },
  created() {
    this.getAssetNo();
  },
  methods: {
    async getAssetNo() {
      // Fetch asset numbers from the server
      const assetList_response = await this.$axios.$get("/getAssetNo", {
        headers: {
          Authorization: "Bearer " + this.$cookies.get("authToken"),
        },
      });

      // Extract and store asset numbers in the AssetList array
      this.AssetList = assetList_response.Asset_List.map(
        (data) => data.asset_no
      );
    },

    async uploadData(data) {
      try {
        // Make a POST request to upload data
        const response = await this.$axios.$post("/upload", data, {
          headers: {
            Authorization: "Bearer " + this.$cookies.get("authToken"),
          },
        });

        // Check if the upload was successful
        if (response.status === 200) {
          // Show a success notification
          Swal.fire({
            title: "Success!",
            icon: "success",
            showCancelButton: false,
            confirmButtonText: "OK",
          }).then(async (result) => {
            // After the user confirms the success notification

            // Refresh the asset numbers list
            this.getAssetNo();

            // Check if the confirmation is confirmed
            if (result.isConfirmed) {
              // Update audit action and item details
              this.$store.commit("setAuditAction", "Uploaded");
              this.$store.commit("setAuditItemNo", "Excel File");

              try {
                // Post audit logs
                await this.$axios.$post(
                  "/auditlogs",
                  this.$store.getters.getAuditList,
                  {
                    headers: {
                      Authorization: "Bearer " + this.$cookies.get("authToken"),
                    },
                  }
                );
                // Reload the page
                location.reload();
              } catch (error) {
                // Handle error while posting audit logs
                Swal.fire(
                  "Error",
                  "Error occurred while posting audit logs",
                  "error"
                );
                this.isLoading = false;
              }
            }
          });
        }
      } catch (error) {
        // Handle error during data upload
        Swal.fire("Error", "Error occurred while uploading file", "error");
      }
    },

    goToPage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.numPages) {
        this.currentPage = pageNumber;
      }
    },
    downloadMe() {
      const link = document.createElement("a");
      link.href = "~/file/file.xlxs";
      link.download = "Intructions.xlxs";
      link.target = "_blank";
      link.click();
    },
    arraysEqual(arr1, arr2) {
      if (arr1.length !== arr2.length) return false;
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
      }
      return true;
    },
    isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    },
    clearFileInput() {
      this.$refs.fileInput.value = ""; // Reset file input field value
    },
    handleFileUpload() {
      const file = this.$refs.fileInput.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const contents = e.target.result;
        const workbook = XLSX.read(contents, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const cellAsset = worksheet["A1"].v;
        const cellPurchase = worksheet["I1"].v;
        const cellLocation = worksheet["N1"].v;

        if (
          cellAsset != "ASSET DETAILS" &&
          cellPurchase != "PURCHASE DETAILS" &&
          cellLocation != "LOCATION DETAILS"
        ) {
          alert("Wrong format: Please use the format in download below");
          return;
        }

        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const unlowercasedData = JSON.parse(JSON.stringify(jsonData.slice(1)));

        for (let i = 2; i < jsonData.length; i++) {
          const row = jsonData[i];

          // Iterate over each cell in the row
          for (let j = 0; j < row.length; j++) {
            const cell = row[j];

            // Convert the cell value to lowercase
            if (typeof cell === "string") {
              row[j] = cell.toLowerCase();
            }
          }
        }

        const expectedColumnNames = [
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
        ];

        const actualColumnNames = jsonData[1];
        if (!this.arraysEqual(actualColumnNames, expectedColumnNames)) {
          alert("Wrong format: Please use the format in download below1");
          this.clearFileInput();
          return;
        }
        const CellColumn = [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
        ];
        // Extract data
        const columnNames = actualColumnNames;
        const colm = 3;
        let errorcount = 0;
        let colcounter = colm;
        const data = jsonData.slice(2).map((row) => {
          const obj = {};
          columnNames.forEach((colName, index) => {
            const value = row[index];
            if (colName === "Asset No." && !value) {
              const errorDiv = document.createElement("div");
              errorDiv.classList.add("error-message");
              errorDiv.textContent = "Cell A" + colcounter + " is required.";
              const errorContainer = document.getElementById("error-container");
              errorContainer.appendChild(errorDiv);
              errorcount++;
            } else if (colName === "Asset No.") {
              if (this.AssetList.includes(value.toString())) {
                const errorDiv = document.createElement("div");
                errorDiv.classList.add("error-message");
                errorDiv.textContent =
                  "Cell A" + colcounter + ": Asset No. already exist.";
                const errorContainer =
                  document.getElementById("error-container");
                errorContainer.appendChild(errorDiv);
                errorcount++;
              }
            }
            if (colName === "Amount") {
              if (isNaN(value)) {
                const errorDiv = document.createElement("div");
                errorDiv.classList.add("error-message");
                errorDiv.textContent =
                  "Cell L" + colcounter + " is not a valid number";
                const errorContainer =
                  document.getElementById("error-container");
                errorContainer.appendChild(errorDiv);
                errorcount++;
              }
            }
            if (colName === "Department" && !value) {
              const errorDiv = document.createElement("div");
              errorDiv.classList.add("error-message");
              errorDiv.textContent = "Cell Q" + colcounter + " is required.";
              const errorContainer = document.getElementById("error-container");
              errorContainer.appendChild(errorDiv);
              errorcount++;
            } else if (colName === "Department") {
              const DepartmentList = localStorage.getItem("Department_List");
              const lowercasedDepartmentList = DepartmentList.toLowerCase();
              if (!lowercasedDepartmentList) {
                const errorDiv = document.createElement("div");
                errorDiv.classList.add("error-message");
                errorDiv.textContent =
                  "Cell Q" + colcounter + ": Department is not available.";
                const errorContainer =
                  document.getElementById("error-container");
                errorContainer.appendChild(errorDiv);
                errorcount++;
              } else {
                const list = JSON.parse(lowercasedDepartmentList);
                const deptName = list.map((list) => list.dept_name);
                if (!deptName.includes(value)) {
                  const errorDiv = document.createElement("div");
                  errorDiv.classList.add("error-message");
                  errorDiv.textContent =
                    "Cell Q" +
                    colcounter +
                    ": Department do not include the provided value";
                  const errorContainer =
                    document.getElementById("error-container");
                  errorContainer.appendChild(errorDiv);
                  errorcount++;
                }
              }
            }
            if (colName === "Classification" && !value) {
              const errorDiv = document.createElement("div");
              errorDiv.classList.add("error-message");
              errorDiv.textContent = "Cell B" + colcounter + " is required.";
              const errorContainer = document.getElementById("error-container");
              errorContainer.appendChild(errorDiv);
              errorcount++;
            } else if (colName === "Classification") {
              const classificationList = localStorage.getItem(
                "Classification_List"
              );
              const lowercasedclassificationList =
                classificationList.toLowerCase();
              if (!lowercasedclassificationList) {
                const errorDiv = document.createElement("div");
                errorDiv.classList.add("error-message");
                errorDiv.textContent =
                  "Cell B" + colcounter + " Classification is not available.";
                const errorContainer =
                  document.getElementById("error-container");
                errorContainer.appendChild(errorDiv);
                errorcount++;
              } else {
                const list = JSON.parse(lowercasedclassificationList);
                const classNames = list.map((list) => list.class_name);
                if (!classNames.includes(value)) {
                  const errorDiv = document.createElement("div");
                  errorDiv.classList.add("error-message");
                  errorDiv.textContent =
                    "Cell B" +
                    colcounter +
                    ": Classification do not include the provided value";
                  const errorContainer =
                    document.getElementById("error-container");
                  errorContainer.appendChild(errorDiv);
                  errorcount++;
                }
              }
            }
            if (colName === "Category" && !value) {
              const errorDiv = document.createElement("div");
              errorDiv.classList.add("error-message");
              errorDiv.textContent = "Cell C" + colcounter + " is required.";
              const errorContainer = document.getElementById("error-container");
              errorContainer.appendChild(errorDiv);
              errorcount++;
            } else if (colName === "Category") {
              const categoryList = localStorage.getItem("Category_List");
              const lowercasedcategoryList = categoryList.toLowerCase();
              if (!lowercasedcategoryList) {
                const errorDiv = document.createElement("div");
                errorDiv.classList.add("error-message");
                errorDiv.textContent =
                  "Cell C" + colcounter + " Category is not available.";
                const errorContainer =
                  document.getElementById("error-container");
                errorContainer.appendChild(errorDiv);
                errorcount++;
              } else {
                const list = JSON.parse(lowercasedcategoryList);
                const categoryName = list.map((list) => list.category_name);
                if (!categoryName.includes(value)) {
                  const errorDiv = document.createElement("div");
                  errorDiv.classList.add("error-message");
                  errorDiv.textContent =
                    "Cell C" +
                    colcounter +
                    ": Category do not include the provided value";
                  const errorContainer =
                    document.getElementById("error-container");
                  errorContainer.appendChild(errorDiv);
                  errorcount++;
                }
              }
            }
            if (colName === "Asset Type" && !value) {
              const errorDiv = document.createElement("div");
              errorDiv.classList.add("error-message");
              errorDiv.textContent = "Cell D" + colcounter + " is required.";
              const errorContainer = document.getElementById("error-container");
              errorContainer.appendChild(errorDiv);
              errorcount++;
            } else if (colName === "Asset Type") {
              const AssetTypeList = localStorage.getItem("Asset_Type_List");
              const lowercasedAssetTypeList = AssetTypeList.toLowerCase();
              if (!lowercasedAssetTypeList) {
                const errorDiv = document.createElement("div");
                errorDiv.classList.add("error-message");
                errorDiv.textContent =
                  "Cell D" + colcounter + " Asset Type is not available.";
                const errorContainer =
                  document.getElementById("error-container");
                errorContainer.appendChild(errorDiv);
                errorcount++;
              } else {
                const list = JSON.parse(lowercasedAssetTypeList);
                const assetTypeName = list.map((list) => list.assettype_name);
                if (!assetTypeName.includes(value)) {
                  const errorDiv = document.createElement("div");
                  errorDiv.classList.add("error-message");
                  errorDiv.textContent =
                    "Cell D" +
                    colcounter +
                    ": Asset Type do not include the provided value";
                  const errorContainer =
                    document.getElementById("error-container");
                  errorContainer.appendChild(errorDiv);
                  errorcount++;
                }
              }
            }
            if (colName === "Manufacturer" && !value) {
              const errorDiv = document.createElement("div");
              errorDiv.classList.add("error-message");
              errorDiv.textContent = "Cell E" + colcounter + " is required.";
              const errorContainer = document.getElementById("error-container");
              errorContainer.appendChild(errorDiv);
              errorcount++;
            } else if (colName === "Manufacturer") {
              const ManufacturerList =
                localStorage.getItem("Manufacturer_List");
              const lowercasedManufacturerList = ManufacturerList.toLowerCase();
              if (!lowercasedManufacturerList) {
                const errorDiv = document.createElement("div");
                errorDiv.classList.add("error-message");
                errorDiv.textContent =
                  "Cell D" + colcounter + " Manufacturer is not available.";
                const errorContainer =
                  document.getElementById("error-container");
                errorContainer.appendChild(errorDiv);
                errorcount++;
              } else {
                const list = JSON.parse(lowercasedManufacturerList);
                const manufacturerName = list.map(
                  (list) => list.manufacturer_name
                );
                if (!manufacturerName.includes(value)) {
                  const errorDiv = document.createElement("div");
                  errorDiv.classList.add("error-message");
                  errorDiv.textContent =
                    "Cell D" +
                    colcounter +
                    ": Manufacturer do not include the provided value";
                  const errorContainer =
                    document.getElementById("error-container");
                  errorContainer.appendChild(errorDiv);
                  errorcount++;
                }
              }
            }
            if (colName === "Serial No." && !value) {
              const errorDiv = document.createElement("div");
              errorDiv.classList.add("error-message");
              errorDiv.textContent = "Cell F" + colcounter + " is required.";
              const errorContainer = document.getElementById("error-container");
              errorContainer.appendChild(errorDiv);
              errorcount++;
            }
            // Additional validation for "Age" column
            if (colName === "Model" && !value) {
              const errorDiv = document.createElement("div");
              errorDiv.classList.add("error-message");
              errorDiv.textContent = "Cell G" + colcounter + " is required.";
              const errorContainer = document.getElementById("error-container");
              errorContainer.appendChild(errorDiv);
              errorcount++;
            }
            // Additional validation for "Age" column
            if (colName === "Description" && !value) {
              const errorDiv = document.createElement("div");
              errorDiv.classList.add("error-message");
              errorDiv.textContent = "Cell H" + colcounter + " is required.";
              const errorContainer = document.getElementById("error-container");
              errorContainer.appendChild(errorDiv);
              errorcount++;
            }

            obj[colName] = value;
          });
          colcounter++;
          return obj;
        });
        if (errorcount === 0) {
          const uploadedData = {
            excelData: data,
          };
          this.uploadData(uploadedData);
        } else {
          Swal.fire("Error", "Error occurred while uploading file", "error");
        }
      };
      reader.readAsBinaryString(file);
    },
  },
};
</script>

<style scoped>
.upload-container {
  width: 90%;
  margin: auto;
  padding: 0;
}

.upload-file {
  background-color: var(--sidebar);
}

#table-container {
  overflow-x: auto;
}

.UploadAsset_excel_file {
  width: 100%;
  border: 1px solid rgb(0, 0, 0, 0.3);
  border-radius: 15px;
}

.UploadAsset_excel_file::-webkit-file-upload-button {
  background-color: transparent;
  border: none;
  border-right: 1px solid var(--blue) !important;
  box-shadow: none;
  height: 100%;
  width: 10%;
  margin-right: 15px;
  background-color: var(--blue);
  color: white;
  cursor: pointer;
}

.UploadAsset_excel_file::-webkit-file-upload-button:hover {
  opacity: 80%;
}

.card {
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
}
</style>
