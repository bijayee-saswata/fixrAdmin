import Vue from "vue";
import Vuex from "vuex";
import { vuexfireMutations } from "vuexfire";
import users from "./users";
import trans from "./trans";
import feeds from "./feeds";
import orders from "./order";
Vue.use(Vuex);

export const store = new Vuex.Store({
  mutations: vuexfireMutations,
  modules: {
    users,
    trans,
    feeds,
    orders,
  },
});
