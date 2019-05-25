<template>
  <v-layout column align-center>
    <v-flex>
      <v-form ref="form" @submit.prevent="search" class="form">
        <v-text-field
          solo
          append-icon="close"
          v-model.trim="input"
          type="text"
          placeholder="Search by name"
          class="my-4"
          @input="dynamicSearch"
        ></v-text-field>
      </v-form>
    </v-flex>
    <v-flex>
      <v-btn dark @click.prevent="search" class="pink">
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn dark class="pink" @click="reset">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
//TODO: fix snackbar
//TODO: handle edge cases
//TODO: check reset requirements
//TODO: check case sentisivity requirements (arabic city edge case)
//TODO: like search query

//TODO: make responsive
//TODO: make it look nice and interesting!

import { bus } from "../main";
export default {
  data() {
    return {
      input: "",
      meteoriteLandings: [],
      error: "",
      api: "https://data.nasa.gov/resource/gh4g-9sfh.json"
    };
  },
  methods: {
    reset: function() {
      this.$refs.form.reset();
      this.getMeteorites("$limit=15&$offset=0");
    },
    //method to capitalize each word in sentence
    capitalize: function(str) {
      return str
        .toLowerCase()
        .split(" ")
        .map(word => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
    },
    // get data method
    getMeteorites: async function(query) {
      //API call
      const response = await fetch(`${this.api}?${query}`);
      const data = await response.json();
      //populates local list
      this.meteoriteLandings = data;
      if (this.meteoriteLandings) {
        //if data emits it to event bus component so result is updated every time this function is triggered
        bus.$emit("searchResult", this.meteoriteLandings);
        return data;
      } else {
        this.error = "Something went wrong:( ";
        bus.$emit("showErrors", this.error);
        return this.error;
      }
    },
    dynamicSearch: function() {
      //capitalize input
      const searchTerm = this.capitalize(this.input);
      //like query: (`$where=name like '%25${this.input}%25'`)
      this.getMeteorites(`$where=starts_with(name, '${searchTerm}')`);
      //starts with
      //`$where=starts_with(name, '%25${this.input}%25')`
    },
    //exact match
    search: function() {
      //check input for empty string
      if (!this.input) {
        //checks for no input
        this.error = "Please input something before you click search:)";
        //emits error list
        bus.$emit("showErrors", this.error);
      } else if (this.input) {
        //capitalize input
        const searchTerm = this.capitalize(this.input);
        try {
          //API call with exact match query
          this.getMeteorites(`name=${searchTerm}`);
        } catch (error) {
          // Pretty sure this doesn't work for some reason:(
          this.error = error.message;
        }
      }
    }
  },
  created() {
    //loads first 15 results of data on creation
    this.getMeteorites("$limit=15&$offset=0");
  }
};
</script>

<style scoped>
.form {
  max-width: 400px;
}
</style>
