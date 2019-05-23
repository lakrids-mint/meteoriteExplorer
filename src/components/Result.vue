<<template>
  <v-container >
    <Meteorite v-bind:meteoriteLandings="meteoriteLandings"></Meteorite>
   
  </v-container>
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
      //loads result into local array
      if (result) {
        this.meteoriteLandings = result;
      }
      //Checks if result array is empty and emits error
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
