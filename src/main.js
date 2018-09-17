// libraries
import Vue from "vue";

// polyfills
import "@babel/polyfill";

// plugins
import "./plugins/vuetify";
import store from "./store";

// components
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
