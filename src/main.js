// libraries
import Vue from "vue";

// polyfills
import "@babel/polyfill";

// plugins
import "./plugins/vuetify";
import store from "./plugins/vuex";

// components
import App from "./App.vue";
import AsLoadingIndicator from "./components/utils/LoadingIndicator.vue";

// styles
import "./assets/main.styl";

Vue.config.productionTip = false;

Vue.component("as-loading", AsLoadingIndicator);

new Vue({
  store,
  render: h => h(App)
}).$mount("#emed-appts");
