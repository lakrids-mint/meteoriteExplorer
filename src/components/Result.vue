<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 v-for="landing in meteoriteLandings" :key="landing.id">
        <Meteorite :landing="landing" :key="landing.id"></Meteorite>
      </v-flex>
    </v-layout>
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
      //Local list of meteorites & errors
      meteoriteLandings: [],
      errors: []
    };
  },
  methods: {},

  created() {
    //listening for search events from search component
    bus.$on("searchResult", result => {
      //loads result into local array
      if (result) {
        this.meteoriteLandings = result;
      }
      //Checks if result array is empty and emits error
      if (this.meteoriteLandings.length == 0) {
        this.errors.push("No match was found");
        bus.$emit("showErrors", this.errors);
      }
    });
  }
};
</script>

<style>
</style>
