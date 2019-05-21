import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";

Vue.config.productionTip = false;
export const bus = new Vue();

new Vue({
  render: h => h(App)
}).$mount("#app");
