<template>
  <div>
    <ul>
      <li v-for="landing in meteoriteLandings">{{landing}}</li>
    </ul>
  </div>
</template>

<script>
//TODO: style each entry
export default {
  props: ["meteoriteLandings"]
};
</script>

<style>
</style>
