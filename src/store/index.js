import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
import users from "./modules/users";

const debug = process.env.NODE_ENV !== "production";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
  },
  strict: true,
  plugins: debug ? [createLogger()] : [],
});
