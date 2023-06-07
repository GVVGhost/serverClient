<template>
  <div id="register" style="width: 600px; margin: 2rem auto;">
    <b-card bg-variant="dark">
      <h1>Sign up</h1>
      <p>Please fill all fields below to proceed</p>
      <b-form>
        <b-form-group v-for="(item, index) in inputs" :key="index"
                      :id="item.name"
                      :state="states[index].value"
                      class="my-3"
                      :label="`${capitalize(replaceN(item.name))}:`"
                      :label-for="`${item.name}-input`">
          <b-form-input :id="`${item.name}-input`"
                        v-model="item.value"
                        class="bg-dark text-white"
                        :placeholder="`Enter ${replaceN(item.name)}`"
                        required
                        :type="`${typeOfInput(item.name)}`"></b-form-input>
          <b-form-invalid-feedback v-if="(item.name === 'email' || item.name === 'password')"
                                   :state="states[index].value || !item.value.trim()">
            Please enter a valid {{ item.name }}
          </b-form-invalid-feedback>
        </b-form-group>

        <div style="width: max-content; margin: 0 auto;">
          <b-button class="mx-1" @click="onSubmit" variant="outline-primary" :disabled="isButtonDisabled">
            Sign up
          </b-button>
          <b-button class="mx-1" @click="onReset" type="reset" variant="outline-warning">Reset</b-button>
        </div>
      </b-form>
      <p class="mt-3">
        <router-link to="/login">Go back</router-link>
      </p>
    </b-card>
    <b-card class="mt-3" bg-variant="dark" v-if="errorMessage">
      {{ errorMessage }}
    </b-card>
  </div>
</template>

<script>
import debounce from "debounce";

export default {
  name: 'RegisterComponent',
  data() {
    return {
      errorMessage: '',
      isButtonDisabled: true,
      inputs: [
        {name: 'email', value: ''},
        {name: 'password', value: ''},
        {name: 'firstName', value: ''},
        {name: 'secondName', value: ''},
      ],
      states: [
        {value: true},
        {value: true},
        {value: true},
        {value: true},
      ]
    }
  },
  watch: {
    inputs: {
      handler: debounce(function (val) {
        for (let i = 0; i < val.length; i++) {
          let item = this.inputs[i];
          switch (item.name) {
            case "email":
              this.states[i].value = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(item.value);
              break;
            case "password":
              this.states[i].value = (item.value.length >= 4)
              break;
            case "firstName":
            case "secondName":
              this.states[i].value = !!(item.value.trim());
              break;
          }
        }
      }, 1500),
      deep: true
    },
    states: {
      handler: function () {
        this.isButtonDisabled = !this.states.every(el => el.value === true);
      }, deep: true
    }
  },
  methods: {
    async onSubmit() {
      const data = this.makeRegisterData();
      try {
        const register = await this.$store.dispatch('registration', data);
        if (register.status === 200) {
          const login = await this.$store.dispatch('login', {
            "email": this.getValue(this.inputs, 'email'),
            "password": this.getValue(this.inputs, 'password')
          });
          if (login.status === 200) await this.$router.push('/');
        }
      } catch (err) {
        this.showErrorMessage(err);
      }
    },
    replaceN(line) {
      return line.replace('N', ' n');
    },
    capitalize(line) {
      return line.charAt(0).toUpperCase() + line.slice(1);
    },
    typeOfInput(line) {
      return (line === 'email' || line === 'password') ? line : 'text'
    },
    makeRegisterData() {
      return {
        "name": `${this.getValue(this.inputs, 'firstName')} ${this.getValue(this.inputs, 'secondName')}`,
        "email": this.getValue(this.inputs, 'email'),
        "password": this.getValue(this.inputs, 'password')
      };
    },
    getValue(item, name) {
      return item.find(el => el.name === name).value;
    },
    showErrorMessage(msg) {
      this.errorMessage = msg;
      setTimeout(() => {
        this.errorMessage = '';
      }, 6000);
    },
    onReset() {
      this.inputs.forEach(el => el.value = '');
    }
  },
}
</script>

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