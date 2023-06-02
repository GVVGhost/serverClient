<template>
  <div id="login" style="width: 600px; margin: 2rem auto;">
    <b-card bg-variant="dark">
      <h1>Sign in</h1>
      <p>Please fill all fields below to proceed</p>
      <b-form v-if="show">
        <b-form-group
            id="email"
            label="Email address:"
            label-for="input-email"
            :state="isEmailValid"
            class="my-3">
          <b-form-input
              id="input-email"
              v-model="form.email"
              type="email"
              placeholder="Enter email"
              class="bg-dark text-white"
              required></b-form-input>
          <b-form-invalid-feedback :state="isEmailValid || !form.email.trim()">
            Please enter a valid email
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
            id="password"
            label="Password:"
            label-for="input-password"
            :state="isPasswordValid"
            class="my-3">
          <b-form-input
              id="input-password"
              v-model="form.password"
              type="password"
              placeholder="Enter password"
              class="bg-dark text-white"
              required></b-form-input>
          <b-form-invalid-feedback :state="!form.password.trim() || isPasswordValid">
            Your password must be at least 4 characters long
          </b-form-invalid-feedback>
        </b-form-group>

        <div style="width: max-content; margin: 0 auto;">
          <b-button class="mx-1" @click="onSubmit" variant="outline-primary" :disabled="isButtonDisabled">
            Sign up
          </b-button>
          <b-button class="mx-1" type="reset" variant="outline-warning">Reset</b-button>
        </div>

      </b-form>
      <p class="mt-5">
        Don't have an account?
        <router-link to="/register">Sign up here</router-link>
      </p>
    </b-card>
    <b-card class="mt-3" bg-variant="dark" v-if="errorMessage">
      {{ errorMessage }}
    </b-card>
  </div>
</template>

<script>


export default {
  name: 'LoginComponent',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      errorMessage: '',
      show: true
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.get('getLoggedInStatus');
    },
    isButtonDisabled() {
      return !(this.isEmailValid && this.isPasswordValid);
    },
    isEmailValid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.form.email);
    },
    isPasswordValid() {
      return (this.form.password.length >= 4)
    },

  },
  methods: {
    async onSubmit() {
      try {
        const res = await this.$store.dispatch('login', {...this.form});
        if (res.status === 200) await this.$router.push('/');
      } catch (err) {
        this.showErrorMessage(err);
      }
    },
    showErrorMessage(msg) {
      this.errorMessage = msg;
      setTimeout(() => {
        this.errorMessage = '';
      }, 6000);
    },
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

</style>