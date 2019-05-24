<template>
  <v-layout column align-center>
    <v-flex>
      <v-form ref="form" @submit.prevent="search" class="form">
        <v-text-field
          solo
          append-icon="close"
          v-model="input"
          type="text"
          placeholder="Enter name"
          required
          class="my-4"
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
//TODO: handle edge cases
//TODO: implement dynamic search

//TODO: style result

//TODO: make it look nice and interesting!

import { bus } from "../main";
export default {
  data() {
    return {
      input: "".trim(),
      meteoriteLandings: [],
      errors: [],
      api: "https://data.nasa.gov/resource/gh4g-9sfh.json"
    };
  },
  methods: {
    reset: function() {
      this.$refs.form.reset();
      this.getMeteorites(`$limit=15`);
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
      //rather crude way to check for response - also it (the else clause)doesn't work:(
      if (this.meteoriteLandings) {
        //emits data to event bus component so result is updated every time this function is triggered
        bus.$emit("searchResult", this.meteoriteLandings);
        return data;
      } else {
        this.errors.push("Something went wrong:( ");
        console.log("something went wrong", this.errors);
        bus.$emit("showErrors", this.errors);
      }
    },

    search: async function() {
      //check input for empty string
      if (!this.input) {
        //push error message to error list
        this.errors.push("You must give somthing to get something:)");
        //emits error list
        bus.$emit("showErrors", this.errors);
      } else if (this.input) {
        //capitalize input
        const searchTerm = this.capitalize(this.input);
        console.log(searchTerm);

        //Try/catch for nice error handling
        try {
          //API call
          this.getMeteorites(`name=${searchTerm}`);
        } catch (error) {
          // Pretty sure this doesn't work for some reason
          this.errors.push(error.message);
        }
      }
    }
  },
  created() {
    //loads first 15 results of data on creation
    this.getMeteorites(`$limit=15`);
  }
};
</script>

<style scoped>
.form {
  max-width: 400px;
}
</style>
