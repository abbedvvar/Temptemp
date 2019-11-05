import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import "vuetify/dist/vuetify.min.css";
import colors from "vuetify/es5/util/colors";

Vue.use(Vuetify, {
    iconfont: "md",
    theme: {
      primary: colors.green.lighten2,
      secondary: colors.blue.darken4,
      box: colors.green.lighten2,
      success: "#3cd1c2",
      info: "#ffaa2c",
      error: colors.red.darken3,
    }
  });

  