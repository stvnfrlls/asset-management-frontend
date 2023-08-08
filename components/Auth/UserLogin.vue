<template>
  <div class="shadow row container justify-content-center mx-auto px-0"
    style="position:absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
    <div id="column1" class="col-md-12 col-lg-6 column-image">
      <div class="card-img imagebackground"></div>
    </div>
    <div id="column2" class="col-md-12 col-lg-6">
      <div>
        <div>
          <!-- Start: Login Form Basic -->
          <div class="position-relative py-4 py-xl-5">
            <div class="container position-relative">
              <div class="row mb-5">
                <div class="col-md-12 col-xl-12 text-center mx-auto">
                  <h2 class="font-weight-bold"> User Login</h2>
                </div>
              </div>
              <div class="row d-flex justify-content-center">
                <div class="col-md-12 col-xl-12">
                  <div class="card">
                    <div class="card-body text-center d-flex flex-column align-items-center">
                      <div class="mb-3">
                        <label>Email</label>
                        <input class="form-control" v-model="form.email" type="email" name="email" placeholder="Email">
                      </div>
                      <div class="mb-3">
                        <label>Password</label>
                        <input class="form-control" v-model="form.password" type="password" name="password"
                          placeholder="Password">
                      </div>
                      <div class="mb-3">
                        <button type="button" class="btn btn-primary d-block w-100" @click="submitForm">Login</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div><!-- End: Login Form Basic -->
        </div>
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
        email: null,
        password: null,
      },
    };
  },
  methods: {
    // Method to submit the login form and handle the response
    async submitForm() {
      try {
        // Send a POST request to the server to authenticate the user
        const response = await this.$axios.$post('/login', this.form);

        // Set cookies to store authentication and user information
        this.$cookies.set('authToken', response.token, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7 // 1 week
        });
        this.$cookies.set('username', response.username);
        this.$cookies.set('accountType', response.accountType);

        // Store user's permission as a JSON string in a cookie
        const permissionJsonString = JSON.stringify(response.permission);
        this.$cookies.set('permission', permissionJsonString);

        // Redirect the user to the home page after successful login
        this.$router.push('/');
      } catch (error) {
        // Handle invalid credentials error
        if (error.response.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Invalid Credentials',
            text: 'Please check your username and password and try again.',
          });
        }
      }
    }
  },
}
</script>

<style scoped>
.bs-icon {
  --bs-icon-size: 0.75rem;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  font-size: var(--bs-icon-size);
  width: calc(var(--bs-icon-size) * 2);
  height: calc(var(--bs-icon-size) * 2);
  color: var(--primary);
}

.bs-icon-xs {
  --bs-icon-size: 1rem;
  width: calc(var(--bs-icon-size) * 1.5);
  height: calc(var(--bs-icon-size) * 1.5);
}

.bs-icon-sm {
  --bs-icon-size: 1rem;
}

.bs-icon-md {
  --bs-icon-size: 1.5rem;
}

.bs-icon-lg {
  --bs-icon-size: 2rem;
}

.bs-icon-xl {
  --bs-icon-size: 2.5rem;
}

.bs-icon.bs-icon-primary {
  color: var(--white);
  background: var(--primary);
}

.bs-icon.bs-icon-primary-light {
  color: var(--primary);
  background: rgba(0, 123, 255, 0.2);
}

.bs-icon.bs-icon-semi-white {
  color: var(--primary);
  background: rgba(255, 255, 255, .5);
}

.bs-icon.bs-icon-rounded {
  border-radius: .5rem;
}

.bs-icon.bs-icon-circle {
  border-radius: 50%;
}

form {
  width: 80%;
}

#column1 {
  width: 100%;
  padding: 0px;
}


#colimage {
  width: inherit;
}

.column-image {
  width: initial;
}

.imagebackground {
  background-image: url("static/img/faqs-img.png");
  background-size: cover;
  height: 100%;
  width: 100%;
  transform: ();
}

.card {
  background-color: transparent;
  border: none;
}

.mb-3 {
  text-align: left;
  width: 70%;
}

.mb-3 label {
  color: var(--black);
}

.mb-3 .form-control {
  font-size: 15px;
}
</style>
