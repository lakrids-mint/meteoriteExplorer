<template>
  <v-flex>
    <v-data-table :headers="headers" :items="meteoriteLandings" :search="search">
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.id }}</td>
        <td class="text-xs-right">{{ props.item.nametype }}</td>
        <td class="text-xs-right">{{ props.item.recclass }}</td>
        <td class="text-xs-right">{{ props.item.mass }}</td>
        <td class="text-xs-right">{{ props.item.fall }}</td>
        <td class="text-xs-right">{{ props.item.year }}</td>
        <td class="text-xs-right">{{ props.item.reclat }}</td>
        <td class="text-xs-right">{{ props.item.reclong }}</td>
      </template>
      <template v-slot:no-data>
        <v-alert :value="true" color="error" icon="warning">Sorry, no data to display here :(</v-alert>
      </template>
      <template v-slot:no-result>
        <v-alert :value="true" color="error" icon="warning">Sorry, no result to display here :(</v-alert>
      </template>
    </v-data-table>
    <ul>
      <li v-for="meteorite in meteoriteLandings">{{meteorite}}</li>
    </ul>
  </v-flex>
</template>

<script>
//not using this one yet
import Meteorite from "@/components/Meteorite";

import { bus } from "../main";
export default {
  components: {
    Meteorite
  },
  data() {
    return {
      //TABLE HEADERS
      headers: [
        {
          text: "Name",
          align: "left",
          sortable: true,
          value: "name"
        },
        {
          text: "Id",
          align: "right",
          sortable: true,
          value: "id"
        },
        {
          text: "Nametype",
          align: "right",
          sortable: true,
          value: "nametype"
        },
        {
          text: "Rec Class",
          align: "right",
          sortable: true,
          value: "recclass"
        },
        {
          text: "Mass(g)",
          align: "right",
          sortable: true,
          value: "mass"
        },
        {
          text: "Fall",
          align: "right",
          sortable: true,
          value: "fall"
        },
        {
          text: "Year",
          align: "right",
          sortable: true,
          value: "year"
        },
        {
          text: "Lattitude",
          align: "right",
          sortable: true,
          value: "reclat"
        },
        {
          text: "Longitude",
          align: "right",
          sortable: true,
          value: "reclong"
        }
      ],
      //Local list of meteorites
      meteoriteLandings: [],
      errors: []
    };
  },
  methods: {
    //local search among results
    search: function() {
      //do something
    }
  },

  created() {
    bus.$on("searchResult", result => {
      if (result) {
        this.meteoriteLandings = result;
        console.log("from results: ", this.meteoriteLandings);
      }
      if (this.meteoriteLandings.length == 0) {
        this.errors.push("No match was found");
        bus.$emit("showErrors", this.errors);
      }
    });
  }
};
</script>

<style scoped>
</style>
