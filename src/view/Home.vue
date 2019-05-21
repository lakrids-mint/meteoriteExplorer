<template>
  <v-container>
    <v-layout column align-center>
      <v-flex>
        <h1>Search for your favourite meteorite</h1>
      </v-flex>

      <Search></Search>
      <Result></Result>
    </v-layout>
  </v-container>
</template>

<script>
import Search from "@/components/Search";
import Result from "@/components/Result";

export default {
  data() {
    return {};
  },
  components: {
    Search,
    Result
  },
  methods: {}
};
</script>

<style>
</style>
