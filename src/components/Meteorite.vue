<template>
  <div>
    <h1>hello, I'm meteoritecomponent</h1>
    <ul>
      <li v-for="landing in meteoriteLandings">{{landing}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["meteoriteLandings"]
};
</script>

<style>
</style>
