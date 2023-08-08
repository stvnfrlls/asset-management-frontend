<template>
  <div class="disposal">
    <div class="disposal-header">
      <h2>Asset Disposal</h2>
    </div>
    <br />
    <div style="padding: 0 2%">
      <div class="disposal-title">
        <div>
          <h5>Disposed By</h5>
        </div>
        <div>
          <hr />
        </div>
      </div>
      <div class="disposal-owner">
        <div class="form-group">
          <label for="disposalOwner">Name:</label>
          <input type="text" v-model="form.responsible" id="disposalOwner" class="form-control" />
          <span class="errors" v-if="this.error_List['information.responsible']">{{
            this.error_List["information.responsible"][0] }}</span>
        </div>
        <div class="form-group">
          <label for="">Department:</label>
          <b-form-select v-model="form.department" id="disposalDepartment" class="form-control"
            :options="Department_Options" />
          <span class="errors" v-if="this.error_List['information.department']">{{
            this.error_List["information.department"][0] }}</span>
        </div>
      </div>
      <br />
      <div class="disposal-title">
        <div>
          <h5>Disposal Method</h5>
        </div>
        <div>
          <hr />
        </div>
      </div>
      <div class="disposal-method" style="display: flex; justify-content: space-between; padding: 0 5%">
        <div class="form-group" v-for="method in Disposal_Options">
          <label class="form-check-label" style="color: var(--font-color;)">
            <input type="radio" name="radio" v-model="form.method" :value="method.id" required />&nbsp;&nbsp;{{
              method.method }}
          </label>
        </div>
      </div>
      <span class="errors" v-if="this.error_List['information.method']">{{ this.error_List["information.method"][0]
      }}</span>
      <div class="divider">
        <div class="form-group">
          <label for="disposalTradeTo">Trade To</label>
          <input type="text" v-model="form.tradeTo" id="disposalTradeTo" class="form-control" placeholder="Trade To" />
        </div>
        <div class="form-group">
          <label for="">Value</label>
          <input type="number" v-model="form.value" id="disposalValue" class="form-control" placeholder="Value " />
        </div>
      </div>
      <br />
      <div class="disposal-title">
        <div>
          <h5>Asset Details</h5>
        </div>
        <div>
          <hr />
        </div>
      </div>
      <DisposalAsset v-for="index in divCount" :key="index" :index="index" ref="assets" />
      <button class="btn btn-primary" @click="addDiv" :disabled="divCount >= 5">Add Asset</button>
      <button class="btn btn-primary" @click="minusDiv" :disabled="divCount <= 1">Remove Asset</button>
      <button type="button" class="btn btn-primary" @click="submitForm" :disabled="isLoading">
        <div v-if="isLoading" style="flex">
          <div class="spinner-border text-primary" role="status">
          </div>
        </div>
        <div v-else>
          <span class="submit">Submit</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import DisposalAsset from '@/components/Dispose/Disposal.vue';
import Swal from 'sweetalert2';
export default {

  data() {
    return {
      form: {
        responsible: null,
        department: null,
        method: null,
        status: null,
        tradeTo: null,
        value: null,

        asset_no: null,
        quantity: 1,
        purpose: null,
        date: new Date().toISOString().slice(0, 10)
      },
      isLoading: false,
      errors: null,
      error_List: [],
      divCount: 1,
      inputValues: [],
      Department_Options: [],
      Disposal_Options: [],
    };
  },
  components: {
    DisposalAsset,
  },
  mounted() {
    this.fetchDropdowns();
    this.$store.commit("setAuditPage", 'Asset');

  },
  methods: {
    // Method to add a new div up to a maximum of 5
    addDiv() {
      if (this.divCount < 5) {
        this.divCount++;
      }
    },

    // Method to remove a div with a minimum of 1
    minusDiv() {
      if (this.divCount > 1) {
        this.divCount--;
      }
    },

    // Method to submit the disposal form
    async submitForm() {
      this.isLoading = true;
      this.$store.commit("setAuditItemNo", 'Disposed Asset(s)');
      try {
        // Collect input values from refs
        this.inputValues = this.$refs.assets.map((asset) => ({ ...asset.asset }));
        const disposalForm = {
          information: this.form,
          assets: this.inputValues
        };

        const response = await this.$axios.$post('/dispose', disposalForm, {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('authToken')
          }
        });

        if (response.status === 200) {
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
                this.isLoading = false;
              }
            }
          });
        }
      } catch (error) {
        if (error.response.status) {
          this.errors = Object.values(error.response.data.errors).flat();
          this.error_List = error.response.data.errors;
          console.log(this.error_List);
          this.showValidationErrorAlert();
        }
      }
    },

    // Method to show validation error alert
    showValidationErrorAlert() {
      const errorMessages = this.errors.join('\n');
      console.log(errorMessages);
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        html: errorMessages,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
      this.isLoading = false;
    },

    async fetchDropdowns() {
      try {
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
      } catch (error) {
        console.error(error);
      }
      try {
        //Department
        const Disposal_Options = localStorage.getItem('Disposal_Options');
        if (Disposal_Options) {
          const responseData = JSON.parse(Disposal_Options);
          // Use the response data as needed
          this.Disposal_Options = responseData;
        } else {
          const disposal_options_response = await this.$axios.$get('/getDisposalMethod')
          const Disposal_Options = disposal_options_response.disposal_method;
          localStorage.setItem('Disposal_Options', JSON.stringify(Disposal_Options));
        }
      } catch (error) {
        console.error(error);
      }
    }
  },
};
</script>

<style scoped>
.disposal {
  overflow-x: auto;
}

.disposal .disposal-owner {
  display: grid;
  grid-template-columns: 49% 49%;
  justify-content: space-between;
}

.button {
  justify-content: center;
  text-align: right;
}

.button .btn {
  width: 25%;
}

.submit {
  color: white;
}

.disposal-title {
  display: grid;
  grid-template-columns: 17% 85%;
}

.disposal-title hr {
  margin-top: 12px;
  background-color: rgb(0, 0, 0, 0.2);
}

.disposal-header {
  justify-content: center;
  text-align: center;
  border-bottom: 1px solid rgb(0, 0, 0, 0.1);
}

.disposal .others {
  border: none;
  border-radius: 0;
  border: 1px solid black;
}

/* =========== Disposal Method ============ */
.disposal .disposal-method .form-group label {
  margin-top: 5px;
}

.disposal .disposal-method .form-group input[type="radio"] {
  transform: scale(1.1);
}

.disposal .divider {
  /* ====disposal Method*/
  display: grid;
  grid-template-columns: 49% 49%;
  justify-content: space-between;
}

/* =========== Disposal Asset ============ */
.disposal .disposal-asset {
  display: grid;
  grid-template-columns: 14% 21% 30% 31%;
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

input[readonly] {
  background-color: var(--read-only);
  /* Replace this with your preferred background color */
}
</style>
