<template>
  <h1>Your Notes App</h1>
  <router-view />
</template>
<script>
export default {
  name: "App",
  beforeCreate() {
    this.$store.commit("initialiseStore");
  },
};
</script>
