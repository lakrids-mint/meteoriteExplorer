<template>
  <v-container>
    <v-layout column align-center>
      <v-flex>
        <h1 class="display-2 font-weight-thin ma-4">Meteorite Explorer</h1>
      </v-flex>
      <v-flex v-if="errors">
        <ul>
          <li v-for="error in errors">{{error}}</li>
        </ul>
      </v-flex>

      <Search></Search>
      <Result></Result>
    </v-layout>
  </v-container>
</template>

<script>
import Search from "@/components/Search";
import Result from "@/components/Result";
import { bus } from "../main";

export default {
  data() {
    return {
      errors: []
    };
  },
  components: {
    Search,
    Result
  },
  methods: {},
  created() {
    bus.$on("showErrors", errorList => {
      errorList.forEach(error => {
        this.errors.push(error);
      });
      console.log("from home component:", this.errors);
    });
  }
};
</script>

<style>
ul {
  list-style: none;
}
</style>
