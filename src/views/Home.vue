<template>
  <v-app id="app">
    <TheNavBar/>
    <Login/>
  </v-app>
</template>

<script>
import TheNavBar from '../components/TheNavBar.vue'
import Login from '../components/User/Login.vue'
export default {
  name: "Home",
  components: {
    Login,
    TheNavBar
  },
};
</script>
