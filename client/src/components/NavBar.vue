<template>
  <b-navbar toggleable type="dark" variant="dark" class="px-5" style="min-height: 80px">
    <b-nav d="nav-collapse" is-nav style="align-items:center;">
      <b-nav-item>
        <router-link to="/">Home</router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link to="/profile">Profile</router-link>
      </b-nav-item>
    </b-nav>
    <b-navbar-nav d="nav-collapse" is-nav style="align-items:center;">
      <b-nav-item sm v-if="isLoggedIn">
        <b-button @click="updateLoggedIn" variant="outline-primary">Logout</b-button>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>

export default {
  methods: {
    updateLoggedIn() {
      this.$store.commit('setLoggedIn', false);
      this.$store.commit('setLocalUser', {});
      localStorage.clear();
      this.$router.push('/login');
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
  }
}

</script>

<style scoped>

</style>