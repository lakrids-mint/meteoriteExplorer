<template>
  <v-card flat :class="`pa-2 mt-1 ${landing.fall.toLowerCase()}`">
    <!-- Responsiveness - adding the wrap class on sm and down screens -->
    <v-layout :class="`row ${$vuetify.breakpoint.xs? 'wrap': '' }`">
      <v-flex xs12 md6>
        <div class="caption grey--text">Name</div>
        <div>{{landing.name? landing.name: "Unknown"}}</div>
      </v-flex>
      <v-flex xs6 sm4 md2>
        <div class="caption grey--text">Id</div>
        <div>{{landing.id? landing.id: "Unknown"}}</div>
      </v-flex>
      <v-flex xs6 sm4 md2>
        <div class="caption grey--text">Nametype</div>
        <div>{{landing.nametype? landing.nametype: "Unknown"}}</div>
      </v-flex>
      <v-flex xs6 sm4 md2>
        <div class="caption grey--text">Rec Class</div>
        <div>{{landing.recclass? landing.recclass: "Unknown"}}</div>
      </v-flex>
      <v-flex xs6 sm4 md2>
        <div class="caption grey--text">Mass (g)</div>
        <div>{{landing.mass? landing.mass: "Unknown"}}</div>
      </v-flex>
      <v-flex xs6 sm4 md2>
        <div class="caption grey--text">Fall</div>
        <div>{{landing.fall? landing.fall: "Unknown"}}</div>
      </v-flex>
      <v-flex xs6 sm4 md2>
        <div class="caption grey--text">Year</div>
        <div>{{landing.year? landing.year.slice(0,4): "Unknown"}}</div>
      </v-flex>
      <v-flex xs6 sm4 md2>
        <div class="caption grey--text">Lattitude</div>
        <div>{{landing.reclat? landing.reclat: "Unknown"}}</div>
      </v-flex>
      <v-flex xs6 sm4 md2>
        <div class="caption grey--text">Longitude</div>
        <div>{{landing.reclong? landing.reclong: "Unknown"}}</div>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
/* This component just render the individual "rows" of data that it receives as props 
  from the result component. Conditional rendering with ternary operators in case of missing data */
export default {
  props: ["landing"]
};
</script>

<style scoped>
.fell {
  border-left: 5px solid #ffca28;
}
.found {
  border-left: 5px solid #b71c1c;
}
</style>