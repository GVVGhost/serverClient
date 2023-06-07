<template>
  <div>
    <b-card bg-variant="dark" style="max-width: 90%; margin: 1rem auto;">
      <b-card-header><h1>Customers | Users</h1></b-card-header>
      <b-row class="m-3">
        <b-col>
          <b-button class="container-fluid mx-1" @click="fetchCustomers" variant="outline-primary">
            Fetch all customers
          </b-button>
        </b-col>
        <b-col>
          <b-button class="container-fluid mx-1" @click="fetchUsers" variant="outline-primary">
            Fetch all users
          </b-button>
        </b-col>
        <b-col>
          <b-button class="container-fluid mx-1" @click="clearTable" variant="outline-primary">
            Clear
          </b-button>
        </b-col>
      </b-row>
      <div>
        <b-table table-variant="dark" striped hover :items="data"></b-table>
      </div>
    </b-card>
  </div>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  data() {
    return {
      data: []
    }
  },
  methods: {
    fetchCustomers() {
      axios.get('/customer/')
          .then((res) => this.data = res.data)
          .catch((err) => console.log(err));
    },
    fetchUsers() {
      axios.get('/user/')
          .then((res) => this.data = res.data)
          .catch((err) => console.log(err));
    },
    clearTable() {
      this.data = [];
    }
  }
}

</script>

<style scoped>
h1 {
  text-align: center;
}

</style>