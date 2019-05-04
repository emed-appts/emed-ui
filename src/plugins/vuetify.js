import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import de from "vuetify/es5/locale/de";
import colors from "vuetify/es5/util/colors";

Vue.use(Vuetify, {
  theme: {
    primary: colors.orange.base, // #FF9800
    secondary: colors.brown.darken2, // #5D4037
    accent: colors.orange.darken4, // #E65100
    error: colors.deepOrange.accent4, // #DD2C00
    warning: colors.amber.darken1, // #FFB300
    info: colors.indigo.base, // #3F51B5
    success: colors.green.base // #4CAF50
  },
  options: {
    customProperties: true
  },
  iconfont: "mdi",
  lang: {
    locales: { de },
    current: "de"
  }
});
