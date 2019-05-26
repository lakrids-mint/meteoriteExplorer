<template>
  <v-container>
    <v-layout column align-center>
      <!-- Title -->
      <v-flex>
        <h1 class="display-2 font-weight-thin ma-4">Meteorite Explorer</h1>
      </v-flex>
      <!-- Snackbar showing errors -->
      <v-snackbar v-model="snackbar" color="error" :timeout="5000" top>
        <span>{{error}}</span>
        <v-btn flat color="white" @click="snackbar=false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-snackbar>
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
      error: "",
      snackbar: false
    };
  },
  components: {
    Search,
    Result
  },
  created() {
    //listens for errors and turns on the snackbar to display them
    bus.$on("showErrors", error => {
      this.error = error;
      this.snackbar = true;
    });
  }
};
</script>

<style >
</style>
