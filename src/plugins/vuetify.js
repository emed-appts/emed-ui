import Vue from "vue";
import Vuetify from "vuetify";

// Helpers
import colors from "vuetify/es5/util/colors";

import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify, {
  theme: {
    primary: colors.orange.base, // #FF9800
    secondary: colors.brown.darken1, // #6D4C41
    accent: colors.orange.darken4, // #EF6C00
    error: colors.deepOrange.base, // #FF5722
    info: colors.blue.base, // #2196F3
    success: colors.green.base, // #4CAF50
    warning: colors.yellow.base // #FFEB3B
  }
});
