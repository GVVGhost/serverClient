<template>
  <div class="m-3">
    <b-card bg-variant="dark" header="User data:" header-tag="h2"
            style="min-width: 600px; max-width: 1200px; margin: 2rem auto;">
      <b-container fluid>
        <b-row>
          <label v-for="item in userNotMod" :key="item[0]">
            User {{ item[0].replace("At", " at") }}: <code>{{ item[1] }}</code>
          </label>
        </b-row>
        <hr>
        <b-row class="my-1" align-v="center" v-for="entry in userMod" :key="entry[0]">
          <b-col sm="2">
            <label :for="entry[0]">User {{ entry[0] }}:</label>
          </b-col>
          <b-col sm="10">
            <b-form-input
                :id="entry[0]"
                v-model="entry[1]"
                class="bg-dark text-white"
                type="text">
            </b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col>
            <b-button class="container-fluid my-1" @click="showUserData" variant="outline-primary">
              Update data
            </b-button>
          </b-col>
          <b-col>
            <b-button class="container-fluid my-1" @click="logOut" variant="outline-warning">
              Log out
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </div>
</template>

<script>
import axios from "@/plugins/axios";

export default {

  data() {
    return {
      userMod: '',
      userNotMod: ''
    }
  },
  mounted() {
    this.showUserData();
  },
  methods: {

    showUserData() {
      axios.get('/user/' + localStorage.getItem('userId'))
          .then((res) => {
            console.log(res.data);
            this.$store.commit('setLocalUser', res.data);
          }).catch((err) => console.log(err));

      let notMod = {...this.$store.state.localUser};
      delete notMod.email;
      delete notMod.name;
      this.userNotMod = Object.entries(notMod);

      let mod = {...this.$store.state.localUser};
      delete mod.id;
      delete mod.createdAt;
      delete mod.updatedAt;
      this.userMod = Object.entries(mod)
    },
    logOut() {
      this.$store.commit('setLoggedIn', false);
      this.$store.commit('setLocalUser', {});
      localStorage.clear();
      this.$router.push('/login');
    }
  },
}

</script>

<style scoped>
h1 {
  text-align: center;
}
</style>