<template>
  <div class="m-3">
    <b-card bg-variant="dark"
            header-tag="h2"
            header="User data:"
            style="min-width: 600px; max-width: 1200px; margin: 2rem auto;">
      <b-container fluid>
        <b-row>
          <label v-for="item in userNotMod" :key="item[0]"> User {{ item[0].replace("At", " at") }}:
            <code>{{ item[1] }}</code></label>
        </b-row>
        <hr>
        <b-row class="my-1" align-v="center" v-for="entry in userMod" :key="entry[0]">
          <b-col sm="2">
            <label :for="entry[0]">User {{ entry[0] }}:</label>
          </b-col>
          <b-col sm="10">
            <b-form-input
                class="bg-dark text-white"
                v-model="entry[1]"
                :id="entry[0]"
                type="text">
            </b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col>
            <b-button disabled class="container-fluid my-1" @click="updateUserData" variant="outline-primary">
              Update values
            </b-button>
          </b-col>
          <b-col>
            <b-button disabled class="container-fluid my-1" @click="resetData" variant="outline-warning">
              Reset
            </b-button>
          </b-col>
          <b-col>
            <b-button disabled class="container-fluid my-1" @click="deleteUser" variant="outline-danger">
              Delete account
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </div>
</template>

<script>
export default {

  data() {
    return {
      userMod: '',
      userNotMod: ''
    }
  },
  mounted() {
    let usr = {...this.$store.state.localUser};
    delete usr.email;
    delete usr.name;
    this.userNotMod = Object.entries(usr)
    this.resetData();
  },
  methods: {
    resetData() {
      let usr = {...this.$store.state.localUser};
      delete usr.id;
      delete usr.createdAt;
      delete usr.updatedAt;
      this.userMod = Object.entries(usr)
    },
    updateUserData() {

    },
    deleteUser(){

    }
  },
}

</script>

<style scoped>
h1 {
  text-align: center;
}
</style>