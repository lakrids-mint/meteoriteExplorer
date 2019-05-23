<template>
  <div>
    <ul>
      <li v-for="landing in meteoriteLandings">{{landing}}</li>
    </ul>
  </div>
</template>

<script>
//TODO: style each entry
//TODO: which data passing method to use
export default {
  props: ["meteoriteLandings"]
};
</script>

<style>
</style>
