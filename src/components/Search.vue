<template>
  <v-flex>
    <v-form @submit="search" class="form flex">
      <v-text-field
        outline
        append-icon="close"
        v-model="input"
        placeholder="Enter name of location"
        required
      ></v-text-field>
      <v-btn flat block @click.prevent="search">
        <v-icon>search</v-icon>
      </v-btn>
    </v-form>
  </v-flex>
</template>

<script>
//TODO: input validation check for empty input

import { bus } from "../main";
export default {
  data() {
    return {
      input: "".toLowerCase(),
      meteoriteLandings: []
    };
  },
  methods: {
    search: async function(searchTerm) {
      //API call
      const api = "https://data.nasa.gov/resource/gh4g-9sfh.json";
      const query = `?$limit=10`;

      console.log(api + query);
      const response = await fetch(api + query);
      const data = await response.json();
      this.meteoriteLandings = data;
      bus.$emit("searchResult", this.meteoriteLandings);
      return data;
      console.log(data);

      //this.meteoriteLanding = + console.log
    }
  }
};
</script>

<style scoped>
.form {
  max-width: 400px;
  display: flex;
}
</style>
