import Vue from "vue";
import Vuex from "vuex";
import podcast from "@/store/modules/podcastFeed";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    podcast,
  },
});
