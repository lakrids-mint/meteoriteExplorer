<template>
  <v-container>
    <!-- This is the sorting bar on top of the results -->
    <v-layout row>
      <v-btn small flat color="grey">
        <v-icon left small>arrow_downward</v-icon>
        <span class="caption text--lowecase">Sort by name</span>
      </v-btn>
    </v-layout>
    <!-- Iterating over results -->

    <v-flex xs12 v-for="landing in meteoriteLandings" :key="landing.id">
      <Meteorite :landing="landing" :key="landing.id"></Meteorite>
    </v-flex>
    <!-- Pagination -->
    <template>
      <div class="text-xs-center mt-4">
        <v-pagination v-model="page" @next="next" @previous="previous"></v-pagination>
      </div>
    </template>
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
      error: "",
      page: 1
    };
  },
  methods: {
    //pagination
    next: function() {
      console.log("next");
      bus.$emit("next", 15);
    },
    previous: function() {
      console.log("previous");
    }
  },
  //look at this whwn sober!
  computed: {
    filteredSearch: function() {
      return this.meteoriteLandings.filter(landing => {
        return blog.name.match(this.input);
      });
    }
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
