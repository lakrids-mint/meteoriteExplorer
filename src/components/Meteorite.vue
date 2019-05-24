<template>
  <v-card class="ma-2 pa-2">
    <v-card-title>
      <h4 class="text-xs-center">{{ landing.name }}</h4>
    </v-card-title>
    <v-divider></v-divider>
    <v-flex>
      <v-layout align-content-space-between>
        <v-flex>
          <p>Year</p>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex>
          <p class="text-xs-right">{{landing.year.slice(0,4)}}</p>
        </v-flex>
      </v-layout>
    </v-flex>

    <v-flex>
      <v-layout align-content-space-between>
        <v-flex>
          <p>Year</p>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex>
          <p class="text-xs-right">{{landing.year.slice(0,4)}}</p>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-card>
</template>

<script>
//TODO: style each entry
export default {
  props: ["landing"]
};
</script>

<style scoped>
.row {
  display: flex;
  align-content: space-between;
}
</style>
