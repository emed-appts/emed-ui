// polyfills
import "@babel/polyfill";

// libraries
import Vue from "vue";

// plugins
import "./plugins/vuetify";
import "./plugins/vuemoment";
import store from "./plugins/vuex";

// components
import App from "./App.vue";
import AsEmptyState from "./components/utils/EmptyState.vue";
import AsLoadingIndicator from "./components/utils/LoadingIndicator.vue";

// styles
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

import "./assets/main.styl";

Vue.config.productionTip = false;

Vue.component("as-empty-state", AsEmptyState);
Vue.component("as-loading", AsLoadingIndicator);

new Vue({
  store,
  render: h => h(App)
}).$mount("#emed-appts");
