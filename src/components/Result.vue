<template>
  <v-container>
    <v-snackbar v-model="snackbar" color="success" :timeout="5000" bottom>
      <span>{{meteoriteLandings.length}} landings matches your query</span>
      <v-btn flat color="white" @click="snackbar=false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
    <!-- Iterating over results -->
    <v-flex xs12 v-for="landing in meteoriteLandings" :key="landing.id">
      <!-- passing down props to meteorite component -->
      <Meteorite :landing="landing" :key="landing.id"></Meteorite>
    </v-flex>
  </v-container>
</template>
 

<script>
import Meteorite from "@/components/Meteorite";
import { bus } from "../main";

export default {
  components: {
    Meteorite
  },
  data() {
    return {
      //Local list of meteorites
      meteoriteLandings: [],
      snackbar: false
    };
  },
  created() {
    //listening for search events from search component
    bus.$on("searchResult", result => {
      //loads result into local array
      if (result) {
        this.meteoriteLandings = result;
        this.snackbar = true;
      }
      //Checks if result array is empty and emits error
      if (this.meteoriteLandings.length == 0) {
        bus.$emit("showErrors", "Sorry, no match was found:/");
      }
    });
  }
};
</script>

<style>
</style>
