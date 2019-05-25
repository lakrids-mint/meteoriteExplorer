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
//TODO: handle edge cases
//What happens if the API request takes too long?
//What if the API returns an error?
// What if the user submits an empty string?
// What if the API returns 0 results?
//What if the query returns no matching results?
//TODO: includes search
//TODO: make search case independent
//TODO: pagination
//TODO: check reset requirements
//TODO: clean up code!
//TODO: deploy

//TODO: make responsive
//TODO:When the user begins typing search terms display a dropdown with the last 10 search terms.
//TODO: make it look nice and interesting!

import { bus } from "../main";
export default {
  data() {
    return {
      input: "",
      meteoriteLandings: [],
      error: "",
      api: "https://data.nasa.gov/resource/gh4g-9sfh.json"
      //     offset: 0
    };
  },
  //moves to reusult
  computed: {},
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
      //rather crude way to check for response - also it (the else clause)doesn't work:(
      if (this.meteoriteLandings) {
        //emits data to event bus component so result is updated every time this function is triggered
        bus.$emit("searchResult", this.meteoriteLandings);
        return data;
      } else {
        this.error = "Something went wrong:( ";
        bus.$emit("showErrors", this.error);
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
    search: function() {
      //check input for empty string
      if (!this.input) {
        //push error message to error list
        this.error = "Please input something before you click search:)";
        //emits error list
        bus.$emit("showErrors", this.error);
      } else if (this.input) {
        //capitalize input
        const searchTerm = this.capitalize(this.input);

        //Try/catch for nice error handling
        try {
          //API call
          this.getMeteorites(`name=${searchTerm}`);
        } catch (error) {
          // Pretty sure this doesn't work for some reason
          this.error = error.message;
        }
      }
    }
  },
  created() {
    //loads first 15 results of data on creation
    this.getMeteorites("$limit=15&$offset=0");

    //pagination
    //PREVIOUS
    /*  bus.$on("previous", offset => {
      this.offset = offset;
      this.getMeteorites(`$limit=15&$offset=${this.offset}`);
    }); */
    //NEXT
    /*   bus.$on("next", offset => {
      this.offset = offset;
      this.getMeteorites(`$limit=15&$offset=${this.offset}`);
    }); */
  }
};
</script>

<style scoped>
.form {
  max-width: 400px;
}
</style>
