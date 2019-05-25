<template>
  <v-container>
    <v-layout column align-center>
      <!-- Title -->
      <v-flex>
        <h1 class="display-2 font-weight-thin ma-4">Meteorite Explorer</h1>
      </v-flex>
      <!-- Snackbar showing errors -->
      <v-flex class="pa-4 white" v-if="error">
        <p>{{error}}</p>
        <v-spacer></v-spacer>
        <v-btn>
          <v-icon>close</v-icon>
        </v-btn>
      </v-flex>
      <!-- Components -->
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
      error: ""
    };
  },
  components: {
    Search,
    Result
  },
  methods: {},
  created() {
    bus.$on("showErrors", error => {
      this.error = error;
    });
    console.log("from home component:", this.errors);
  }
};
</script>

<style scoped>
</style>
