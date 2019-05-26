<template>
  <v-app>
    <v-content>
      <Home/>
    </v-content>
  </v-app>
</template>

<script>
import Home from "./view/Home";

export default {
  name: "App",
  components: {
    Home
  },
  data() {
    return {
      //
    };
  }
};
</script>
<style>
</style>
