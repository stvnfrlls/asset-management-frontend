<template>
  <div class="Accounts">
    <div class="account-btn">
      <p style="margin-left: 2.5%;">Dev tools/Manage Accounts</p>
      <b-button v-b-modal.AccountModal variant="primary">New</b-button>
    </div>
    <div class="table100 ver2 m-b-110">
      <div class="table100-head">
        <table>
          <thead>
            <tr class="head">
              <th class="column1">ID</th>
              <th class="column2">Name</th>
              <th class="column3">Email address</th>
              <th class="column4">Account Type</th>
              <th class="column5">Password</th>
              <th class="column6">Delete</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="table100-body js-pscroll">
        <table>
          <tbody>
            <template v-if="userList.length > 0" v-for="(row, index) in userList">
              <tr class="body">
                <td class="column1">{{ index + 1 }}</td>
                <td class="column2">{{ row.name }}</td>
                <td class="column3">{{ row.email }}</td>
                <td class="column4">{{ row.account_type }}</td>
                <td class="column5">
                  <template v-if="row.account_type != 'MAIN'">
                    <button class="btn btn-primary" @click="generatePass(row.id)">
                      Generate
                      <i class='bx bx-edit-alt' style="color:white;"></i>
                    </button>
                  </template>
                </td>
                <td class="column6" style="text-align:center">
                  <template v-if="row.id != 1 && row.account_type != 'MAIN'">
                    <i class='bx bx-trash' @click="deleteAccount(row.id)"></i>
                  </template>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr class="body">
                <td colspan="6" class="text-center">No data</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <b-modal id="AccountModal" size="md" title="Small Modal" hide-header hide-footer style="overflow-y: auto">
      <accountCreate />
    </b-modal>
  </div>
</template>
<script>
import Swal from 'sweetalert2';
import accountCreate from "~/components/Dev/accountCreate.vue";
export default {
  components: { accountCreate },
  data() {
    return {
      userList: []
    }
  },
  created() {
    this.getUserList();
  },
  methods: {
    // Generate a new password for a user and update it on the server
    async generatePass(id) {
      // Generate a random password
      var genPass = Math.random().toString(36).slice(-8);
      try {
        // Make a POST request to update the user's password
        const response = await this.$axios.$post(`/updatePassword/${id}`, { 'genPass': genPass }, {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('authToken')
          }
        });

        // If password update is successful, show success notification
        if (response.status == 200) {
          Swal.fire({
            title: 'Your new password is ' + genPass,
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'OK'
          }).then((result) => {
            // Reload the page after the user clicks "OK"
            if (result.isConfirmed) {
              location.reload();
            }
          });
        }
      } catch (error) {
        // Handle error while updating the password
        Swal.fire('Error', 'An error occurred while updating the password.', 'error');
      }
    },

    // Get the list of users from the server
    async getUserList() {
      try {
        // Make a GET request to fetch the user list
        const userlist_response = await this.$axios.$get('/getUserList', {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('authToken')
          }
        });

        // Store fetched user list in the userList variable
        this.userList = userlist_response.list;
      } catch (error) {
        // Handle error while fetching the user list
        console.error(error);
      }
    },

    // Delete a user account
    async deleteAccount($id) {
      try {
        // Make a POST request to delete a user account
        const response = await this.$axios.$post(`delete/${$id}`, {}, {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('authToken'),
            Accept: 'application/json'
          }
        });

        // If account deletion is successful, show success notification
        if (response.status === 200) {
          Swal.fire({
            title: 'Account Deleted',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'OK'
          }).then((result) => {
            // Reload the page after the user clicks "OK"
            if (result.isConfirmed) {
              location.reload();
            }
          });
        }
      } catch (error) {
        // Handle error while deleting the user account
        Swal.fire('Error', 'An error occurred while deleting the user account.', 'error');
      }
    }

  }
}
</script>
<style scoped>
.Accounts {
  width: 95%;
  margin: auto;
}

.account-btn {
  display: flex;
  justify-content: space-between;
  text-align: right;
  align-items: right;
  margin-bottom: 7px;
}

.column1 {
  width: 10%;
}

.column2 {
  width: 25%;
}

.column3 {
  width: 25%;
}

.column4 {
  width: 20%;
}

.column5 {
  width: 10%;
  text-align: center;

}

.column6 {
  width: 10%;
  justify-content: center;
  text-align: center;
}

.column6 i {
  padding: 0;
  font-size: 20px;
}

.btn i {
  padding: 0;
  font-size: 20px;
  color: var(--sidebar);
}

.column6 i:hover {
  color: var(--blue);
}
</style>
