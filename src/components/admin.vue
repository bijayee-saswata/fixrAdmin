<template>
  <main>
    <NavAdmin v-if="isLoggedIn"></NavAdmin>
    <login v-else></login>
  </main>
</template>

<script>
import firebase from "firebase";
const login = () => import("./login");
const NavAdmin = () => import("./NavAdmin");
export default {
  name: "admin",
  components: {
    login,
    NavAdmin
  },
  data() {
    return {
      isLoggedIn: false
    };
  },
  created() {
    if (firebase.auth().currentUser) this.value = true;
  }
};
</script>

<style lang="css" scoped>
</style>