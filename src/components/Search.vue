<template>
  <v-layout column align-center>
    <v-flex>
      <v-form ref="form" @submit.prevent="search" class="form">
        <v-text-field
          solo
          flat
          box
          :rules="[rules.validSigns]"
          append-icon="close"
          append-outer-icon="search"
          @click:append-outer="search"
          @click:append="reset"
          v-model.trim="input"
          type="text"
          placeholder="Search by name"
          class="input-style"
          @input="search"
        ></v-text-field>
      </v-form>
    </v-flex>
  </v-layout>
</template>
  
      
<script>
import { bus } from "../main";

export default {
  data() {
    return {
      input: "",
      api: "https://data.nasa.gov/resource/gh4g-9sfh.json",
      //some basic input validation :)
      rules: {
        validSigns: value => {
          const pattern = /^[a-zA-Z0-9 ]*$/;
          return (
            pattern.test(value) || "Characters allowed are a-z and numbers 0-9"
          );
        }
      }
    };
  },
  methods: {
    /* This is the function that makes the API call using fetch() and takes a query parameter. 
       Using async and await, but haven't quite got a handle on error handling best practice yet.
       The data is saved locally in a list(is this necessary?), that gets emitted to the 
       result component (well technically it's emitted to the (event)bus component) every time it fires.
    */
    getMeteorites: async function(query) {
      //API call using async/await
      const response = await fetch(`${this.api}?${query}`);
      const data = await response.json();
      //checks for response status and returns a promise reject with info
      if (!response.ok) {
        bus.$emit(
          "showErrors",
          `Something went wrong with your request - ${response.message}`
        );
        return Promise.reject({
          status: response.status,
          statusText: response.statusText
        });
      } else if (response.ok) {
        //populates local list
        this.meteoriteLandings = data;
        //check for empty list before emit
        if (this.meteoriteLandings) {
          bus.$emit("searchResult", this.meteoriteLandings);
          return data;
        }
      }
    },
    //Name says it all:)
    reset: function() {
      this.$refs.form.reset();
    },
    /* The search function calls the getData function with a specific query
      It is triggered @input
       */
    search: function() {
      //check input for empty string
      if (!this.input) {
        //as per requirement an empty input field will reload the default API call
        this.getMeteorites("$limit=15&$offset=0");
        //emits message (not exactely an error in this case, but.. )
        bus.$emit("showErrors", "Default data loaded:)");
      } else if (this.input) {
        try {
          /* Because my first solution which lower cased and capitalized user input didn't
          work in the test case of "al-Ghanim" (deep sigh!) I went with this instead
          https://dev.socrata.com/docs/functions/lower.html. 
          The $order query seems unnecessary, but I might be missing something, so I'm 
           keeping it for now.  
          */
          this.getMeteorites(
            `$order=name&$where=lower(name)like lower('%25${this.input}%25')`
          ).catch(e => {
            bus.$emit(
              "showErrors",
              `Yikes! Something went wrong: ${e.statusText}`
            );
          });
        } catch (error) {
          // hmmmm
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
