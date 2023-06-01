<template>
  <div id="register" style="width: 600px; margin: 2rem auto;">
    <b-card bg-variant="dark">
      <h1>Sign up</h1>
      <p>Please fill all fields below to proceed</p>
      <b-form>
        <b-form-group
            id="email"
            label="Email address:"
            label-for="email-input"
            :state="isEmailValid"
            class="my-3">
          <b-form-input
              id="email-input"
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
            label-for="password-input"
            :state="isPasswordValid"
            class="my-3">
          <b-form-input
              id="password-input"
              v-model="form.password"
              type="password"
              placeholder="Enter password"
              class="bg-dark text-white"
              required></b-form-input>
          <b-form-invalid-feedback :state="!form.password.trim() || isPasswordValid">
            Your password must be at least 4 characters long
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
            id="firstName"
            label="First name:"
            label-for="firstName-input"
            :state="isFirstNameValid"
            class="my-3">
          <b-form-input
              id="firstName-input"
              v-model="form.firstName"
              type="text"
              placeholder="Enter first name"
              class="bg-dark text-white"
              required></b-form-input>
        </b-form-group>

        <b-form-group
            id="secondName"
            label="Second name:"
            label-for="secondName-input"
            :state="isSecondNameValid"
            class="my-3">
          <b-form-input
              id="secondName-input"
              v-model="form.secondName"
              type="text"
              placeholder="Enter second name"
              class="bg-dark text-white"
              required></b-form-input>
        </b-form-group>
        <div style="width: max-content; margin: 0 auto;">
          <b-button class="mx-1" @click="onSubmit" variant="outline-primary" :disabled="isButtonDisabled">
            Sign up
          </b-button>
          <b-button class="mx-1" type="reset" variant="outline-warning">Reset</b-button>
        </div>

      </b-form>

      <p class="mt-5">
        <router-link to="/login">Go back</router-link>
      </p>
    </b-card>
    <b-card class="mt-3" header="Form Data Result" bg-variant="dark">
      <pre class="m-0">{{ form }}</pre>
    </b-card>


  </div>
</template>

<script>

export default {
  name: 'RegisterComponent',
  data() {
    return {
      show: true,
      form: {
        firstName: '',
        secondName: '',
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async onSubmit() {
      const data = {
        "name": `${this.form.firstName.trim()} ${this.form.secondName.trim()}`,
        "email": this.form.email.trim(),
        "password": this.form.password.trim()
      };
      const register = await this.$store.dispatch('registration', data);
      console.log('register result: ', register);
      if (register.status === 200) {
        const login = await this.$store.dispatch('login', {...this.form});
        if (login && login.status === 200) this.$router.push('/');
        else alert(`Error occurred, code: ${login.status}`);
      }
    },
    onReset() {

    },
    // onSubmit(event) {
    //   console.log('event', event);
    //   event.preventDefault()
    //   axios.post('http://localhost:3000/user/', {
    //     "name": `${this.form.firstName} ${this.form.secondName}`,
    //     "email": this.form.email.trim(),
    //     "password": this.form.password.trim()
    //   }).then((res) => {
    //     if (res.status === 200) {
    //       this.$store.commit('setLoggedIn', true);
    //       console.log(res);
    //       this.$store.commit('setLocalUser', res.data);
    //       this.$router.push('/')
    //     } else {
    //       console.log('Something went wrong');
    //     }
    //   }).catch((err) => {
    //     if (err) console.log(err)
    //   });
    // },
  },
  computed: {
    isButtonDisabled() {
      return !(this.isEmailValid
          && this.isPasswordValid
          && this.isFirstNameValid
          && this.isSecondNameValid);
    },
    isEmailValid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.form.email);
    },
    isPasswordValid() {
      return (this.form.password.length >= 4)
    },
    isFirstNameValid() {
      return !!(this.form.firstName.trim());
    },
    isSecondNameValid() {
      return !!(this.form.secondName.trim());
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

b-form-input {
  color: #2c3e50;
}

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
