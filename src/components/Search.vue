<template>
  <v-flex>
    <v-form @submit="search" class="form flex">
      <v-text-field
        solo
        append-icon="close"
        v-model="input"
        type="text"
        placeholder="Enter name of location"
        required
        class="my-4"
      ></v-text-field>
      <v-btn flat block @click.prevent="search" class="my-4">
        <v-icon>search</v-icon>
      </v-btn>
    </v-form>
  </v-flex>
</template>

<script>
//TODO: make clear/reset function
//TODO: add loading?
//TODO: handle edge cases
//TODO: implement meteorite component
//TODO: catch and log netwoekserror

//TODO: style result
//TODO: design

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
      //rather crude way to check for response
      if (this.meteoriteLandings) {
        //emits data to event bus component
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
        this.errors.push("You must give somthing to get something:)");
        //this.getMeteorites("$limit=15");
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
          this.errors.push(error);
          console.log("error message from search component:", this.errors);
          console.log(error.message);
        }
      }
    }
  },
  created() {
    this.getMeteorites(`$limit=15`);
  }
};
</script>

<style scoped>
.form {
  max-width: 400px;
  display: flex;
}
</style>
