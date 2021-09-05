import Vue from "vue";
import Vuex from "vuex";
import podcast from "@/store/modules/podcastFeed";
import system from "@/store/modules/system";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    podcast,
    system,
  },
});
