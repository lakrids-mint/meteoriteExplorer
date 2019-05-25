<template>
  <v-layout column align-center>
    <v-flex>
      <v-form ref="form" @submit.prevent="search" class="form">
        <v-text-field
          solo
          append-icon="close"
          @click:append="reset"
          v-model.trim="input"
          type="text"
          placeholder="Search by name"
          class="my-4"
          @input="search"
        ></v-text-field>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
//TODO: load thinking bar
//TODO: sort by name thing(maybe)
//TODO: make responsive
//TODO: make it look nice and interesting(or at least add some colours)!

import { bus } from "../main";

export default {
  data() {
    return {
      input: "",
      meteoriteLandings: [],
      api: "https://data.nasa.gov/resource/gh4g-9sfh.json"
    };
  },
  methods: {
    /* This is the function that makes the API call using fetch() and can be called with a query argument. 
       Remember that it returns a promise and fetch only throws errors in case of network error
       Using async and await, but haven't quite got a handle on error handling best practice yet.
       The data is saved locally in a list(is this necessary?), that gets emitted every time it fires
       
    */
    getMeteorites: async function(query) {
      //API call
      const response = await fetch(`${this.api}?${query}`);
      const data = await response.json();
      //checks for response status and throws error
      if (!response.ok) {
        bus.$emit("showErrors", response.statusText);
        throw Error(response.statusText);
      }
      //populates local list
      this.meteoriteLandings = data;
      //check for empty list before emit
      if (this.meteoriteLandings) {
        bus.$emit("searchResult", this.meteoriteLandings);
        return data;
      }
    },
    //Name says it all:)
    reset: function() {
      this.$refs.form.reset();
      this.getMeteorites("$limit=15&$offset=0");
    },
    /* The search function calls the getData function with a specific query
      It is triggered whenever the user inputs something in the search bar @input
      I removed the search button to avoid confusion.
       */
    search: function() {
      //check input for empty string
      if (!this.input) {
        //as per requirement an empty input field will reload the default API call
        this.getMeteorites("$limit=15&$offset=0");
        //emits error
        bus.$emit(
          "showErrors",
          "Default data loaded! Please input specific search term:)"
        );
      } else if (this.input) {
        try {
          /* Because my first solution which lower cased and capitalized user input didn't
          work in the test case of "al-Ghanim" (deep sigh!) I went with this instead
          https://dev.socrata.com/docs/functions/lower.html. NB:it's important that the
          user input is still made lowercase(so don't change that, future me!) The
           $order query seems unnecessary, but I might be missing something, so I'm 
           keeping it for now.  
          */
          this.getMeteorites(
            `$order=name&$where=lower(name)like lower('%25${this.input}%25')`
          );
        } catch (error) {
          // Pretty sure this doesn't work for some reason:(
          bus.$emit("showErrors", error.message);
        }
      }
    }
  },
  created() {
    //loads first 15 results of data set on creation
    this.getMeteorites("$limit=15&$offset=0");
  }
};
</script>

<style scoped>
.form {
  max-width: 400px;
}
</style>
