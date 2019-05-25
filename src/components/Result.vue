<template>
  <v-container>
    <!-- This is the sorting bar on top of the results plus pagination -->
    <v-layout row>
      <v-btn small flat color="grey">
        <v-icon left small>arrow_downward</v-icon>
        <span class="caption text--lowecase">Sort by name</span>
      </v-btn>
      <!--   <v-btn small flat color="grey" @click="previous">
        <v-icon left large>arrow_left</v-icon>
        <span class="caption text--lowecase"></span>
      </v-btn>
      <v-btn small flat color="grey" @click="next">
        <v-icon left large>arrow_right</v-icon>
        <span class="caption text--lowecase"></span>
      </v-btn>-->
    </v-layout>
    <!-- Iterating over results -->

    <v-flex xs12 v-for="landing in meteoriteLandings" :key="landing.id">
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
      //Local list of meteorites & errors
      meteoriteLandings: [],
      error: ""
      // offset: 0
    };
  },
  methods: {
    //pagination
    /*    next: function() {
      this.offset += 15;
      bus.$emit("next", this.offset);
      console.log(this.offset);
    },
    previous: function() {
      if (this.offset <= 0) {
        this.offset = 0;
      } else {
        this.offset -= 15;
        bus.$emit("previous", this.offset);
        console.log(this.offset);
      }
    } */
  },

  created() {
    //listening for search events from search component
    bus.$on("searchResult", result => {
      //loads result into local array
      if (result) {
        this.meteoriteLandings = result;
      }
      //Checks if result array is empty and emits error
      if (this.meteoriteLandings.length == 0) {
        this.error = "No match was found";
        bus.$emit("showErrors", this.error);
      }
    });
  }
};
</script>

<style>
</style>
