import { GET_FETCHED_FEED, SET_SELECTED_EPISODE } from "./mutationTypes";
import { apiGetXmlFile } from "@/api/podcast";

const state = {
  feed: null,
  selectedEpisode: null,
};

const actions = {
  async getPodcastFeed({ commit }, payload) {
    const { endPoint } = payload;
    const feed = await apiGetXmlFile({ endPoint });
    commit(GET_FETCHED_FEED, { feed });
  },
};

const mutations = {
  [GET_FETCHED_FEED](state, payload) {
    const { feed } = payload;
    state.feed = feed;
  },
  [SET_SELECTED_EPISODE](state, payload) {
    const { selectedEpisode } = payload;
    state.selectedEpisode = selectedEpisode;
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
