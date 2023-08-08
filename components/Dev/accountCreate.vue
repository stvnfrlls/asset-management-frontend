<template>
  <div>
    <div class="modal-header">
      <h2>Create Account</h2>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label for="">Name:</label>
        <input type="text" v-model="form.name" class="form-control" id="name" placeholder="Full Name" />
      </div>
      <div class="form-group">
        <label for="">Email:</label>
        <input type="email" v-model="form.email" class="form-control" id="username" placeholder="Email address" />
      </div>
      <div class="form-group">
        <label for="">Password:</label>
        <input type="password" v-model="form.password" class="form-control" id="password" placeholder="Password" />
      </div>
      <div class="form-group">
        <label for="">Confirm Password:</label>
        <input type="password" v-model="form.confirm" class="form-control" id="cPassword"
          placeholder="Confirm Password" />
      </div>
      <div class="form-group">
        <label for="">Account Type:</label>
        <select class="form-control" v-model="form.account_type" @change="permit()">
          <option value="null">Please select an option</option>
          <option value="ADMIN">ADMIN</option>
          <option value="USER">USER</option>
        </select>
      </div>
      <h5>Permission</h5>
      <div class="Permission">
        <div>
          <div class="form-group">
            <label for=""><input type="checkbox" class="custom-checkbox" checked readonly disabled />&nbsp;<span>Asset
                List</span></label>
          </div>
          <div class="form-group">
            <label for=""><input type="checkbox" class="custom-checkbox" v-model="form.Asset_create" true-value="1"
                false-value="0" />&nbsp;<span>Asset Create</span></label>
          </div>
          <div class="form-group">
            <label for=""><input type="checkbox" class="custom-checkbox" v-model="form.Asset_update" true-value="1"
                false-value="0" />&nbsp;<span>Asset Update</span></label>
          </div>
          <div class="form-group">
            <label for=""><input type="checkbox" class="custom-checkbox" v-model="form.Asset_transfer" true-value="1"
                false-value="0" />&nbsp;<span>Asset Allocate</span></label>
          </div>
          <div class="form-group">
            <label for=""><input type="checkbox" class="custom-checkbox" v-model="form.Asset_device" true-value="1"
                false-value="0" />&nbsp;<span>Asset Device</span></label>
          </div>
          <div class="form-group">
            <label for=""><input type="checkbox" class="custom-checkbox" v-model="form.Asset_dispose" true-value="1"
                false-value="0" />&nbsp;<span>Asset Dispose</span></label>
          </div>
          <div class="form-group">
            <label for=""><input type="checkbox" class="custom-checkbox" v-model="form.Asset_download" true-value="1"
                false-value="0" />&nbsp;<span>Asset Download</span></label>
          </div>
        </div>
        <div>
          <div class="form-group">
            <label for=""><input type="checkbox" class="custom-checkbox" checked readonly disabled />&nbsp;<span>License
                List</span></label>
          </div>
          <div class="form-group">
            <label for=""><input type="checkbox" class="custom-checkbox" v-model="form.Dashboard" true-value="1"
                false-value="0" />&nbsp;<span>Dashboard</span></label>
          </div>
          <div class="form-group">
            <label for=""><input type="checkbox" class="custom-checkbox" v-model="form.License_create" true-value="1"
                false-value="0" />&nbsp;<span>License Create</span></label>
          </div>
          <div class="form-group">
            <label for=""><input type="checkbox" class="custom-checkbox" v-model="form.License_update" true-value="1"
                false-value="0" />&nbsp;<span>License Update</span></label>
          </div>
          <div class="form-group">
            <label for=""><input type="checkbox" class="custom-checkbox" v-model="form.License_delete" true-value="1"
                false-value="0" />&nbsp;<span>License Delete</span></label>
          </div>
          <div class="form-group">
            <label for=""><input type="checkbox" class="custom-checkbox" v-model="form.Asset_upload" true-value="1"
                false-value="0" />&nbsp;<span>Asset Upload</span></label>
          </div>
          <div class="form-group">
            <label for=""><input type="checkbox" class="custom-checkbox" v-model="form.View_logs" true-value="1"
                false-value="0" />&nbsp;<span>History</span></label>
          </div>
          <div class="form-group">
            <input type="hidden" class="custom-checkbox" v-model="form.Dev_tools" />
          </div>
        </div>
      </div>
      <div class="form-group" style="justify-content: center; align-items: center; text-align: right">
        <input type="button" class="btn btn-primary" @click="addAccount" value="Submit" />
      </div>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {
      form: {
        name: null,
        email: null,
        password: null,
        confirm: null,
        account_type: null,
        Dashboard: "0",
        Asset_create: "0",
        Asset_update: "0",
        Asset_transfer: "0",
        Asset_device: "0",
        Asset_dispose: "0",
        Asset_download: "0",
        License_create: "0",
        License_update: "0",
        License_delete: "0",
        Asset_upload: "0",
        View_logs: "0",
        Dev_tools: "0",
      },
      errors: null,
    };
  },
  methods: {
    // Add a new account
    async addAccount() {
      try {
        // Check if the entered passwords match
        if (this.form.password == this.form.confirm) {
          // Make a POST request to register a new account
          const response = await this.$axios.$post("/register", this.form, {
            headers: {
              Authorization: "Bearer " + this.$cookies.get("authToken"),
            },
          });

          // If registration is successful, show success notification
          if (response.status == 200) {
            Swal.fire({
              title: "Success!",
              icon: "success",
              showCancelButton: false,
              confirmButtonText: "OK",
            }).then((result) => {
              // Reload the page after the user clicks "OK"
              if (result.isConfirmed) {
                location.reload();
              }
            });
          }
        } else {
          // If passwords don't match, show an error notification
          Swal.fire({
            icon: "error",
            title: "Password does not match.",
            text: "",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        // Handle validation errors if the server returns a response with errors
        if (error.response.status) {
          this.errors = Object.values(error.response.data.errors).flat();
          this.showValidationErrorAlert();
        }
      }
    },

    // Show validation error alert with error messages
    showValidationErrorAlert() {
      const errorMessages = this.errors.join("\n");
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: errorMessages,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    },

    permit() {
      if (this.form.account_type === "ADMIN") {
        this.form.Dashboard = "1";
        this.form.Asset_create = "1";
        this.form.Asset_update = "1";
        this.form.Asset_transfer = "1";
        this.form.Asset_device = "1";
        this.form.Asset_dispose = "1";
        this.form.Asset_download = "1";
        this.form.License_create = "1";
        this.form.License_update = "1";
        this.form.License_delete = "1";
        this.form.Asset_upload = "1";
        this.form.View_logs = "1";
        this.form.Dev_tools = "1";
      } else if (this.form.account_type === "USER") {
        this.form.Dashboard = "0";
        this.form.Asset_create = "0";
        this.form.Asset_update = "0";
        this.form.Asset_transfer = "0";
        this.form.Asset_device = "0";
        this.form.Asset_dispose = "0";
        this.form.Asset_download = "0";
        this.form.License_create = "0";
        this.form.License_update = "0";
        this.form.License_delete = "0";
        this.form.Asset_upload = "0";
        this.form.View_logs = "0";
        this.form.Dev_tools = "0";
      }
    },
  },
};
</script>
<style scoped>
.modal-header {
  justify-content: center;
  text-align: center;
  border-bottom: 1px solid var(--font-color);
}

.Permission {
  display: grid;
  grid-template-columns: 50% 50%;
}

.custom-checkbox {
  width: 15px;
  height: 15px;
}
</style>
