<template>
  <v-flex>
    <v-data-table :headers="headers" :items="meteoriteLandings">
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
        <td class="text-xs-right">{{ props.item.geolocation }}</td>
      </template>
    </v-data-table>
  </v-flex>
</template>

<script>
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
          text: "id",
          align: "right",
          sortable: true,
          value: "id"
        },
        {
          text: "nametype",
          align: "right",
          sortable: true,
          value: "nametype"
        },
        {
          text: "recclass",
          align: "right",
          sortable: true,
          value: "recclass"
        },
        {
          text: "mass(g)",
          align: "right",
          sortable: true,
          value: "mass"
        },
        {
          text: "fall",
          align: "right",
          sortable: true,
          value: "fall"
        },
        {
          text: "year",
          align: "right",
          sortable: true,
          value: "year"
        },
        {
          text: "reclat",
          align: "right",
          sortable: true,
          value: "reclat"
        },
        {
          text: "reclong",
          align: "right",
          sortable: true,
          value: "reclong"
        },
        {
          text: "geolocation",
          align: "right",
          sortable: true,
          value: "geolocation"
        }
      ],
      //LIST OF METEORITES
      meteoriteLandings: []
    };
  },
  created() {
    bus.$on("searchResult", result => {
      this.meteoriteLandings = result;
    });
  }
};
</script>

<style>
</style>
