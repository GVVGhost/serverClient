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
        <b-table table-variant="dark" striped hover :items="data" @row-clicked="onRowSelected"></b-table>
      </div>
    </b-card>
    <b-card v-if='showCard'
            class="mt-3"
            header="Fetched data"
            bg-variant="dark"
            style="max-width: 90%;
            margin: 1rem auto;">
      <b-container fluid>
        <b-row class="my-1" v-for="type in currentItemModified" :key="type">
          <b-col sm="3">
            <label :for="`type-${type}`">Type <code>{{ type }}</code>:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input :id="`type-${type}`" :type="type"></b-form-input>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      data: [],
      currentItems: [],
      currentItemModified: [],
      selectedRow: ''
    }
  },
  methods: {
    fetchCustomers() {
      axios.get('http://localhost:3000/customer/')
          .then((res) => {
            this.data = res.data;
          })
          .catch((err) => console.log(err));
    },
    fetchUsers() {
      axios.get('http://localhost:3000/user/')
          .then((res) => this.data = res.data)
          .catch((err) => console.log(err));
    },
    clearTable() {
      this.data = [];
      this.clearForms()
    },
    clearForms() {
      this.selectedRow = '';
      this.currentItems = [];
      this.currentItemModified = [];
    },
    onRowSelected(item) {
      console.log("onRowSelected")
      if (item.id === this.selectedRow) {
        this.clearForms()
      } else {
        console.log(this.currentItems);
        this.selectedRow = item.id;
      }
    },
  },
  computed: {
    showCard() {
      return this.currentItems.length
    }
  }

}

</script>

<style scoped>
h1 {
  text-align: center;
}

</style>