import * as PodcastMutations from "./mutationTypes";
import { apiGetXmlFile } from "@/api/podcast";
import Parser from "rss-parser";
const parse = new Parser();
import * as SystemMutation from "@/store/modules/system/mutationTypes";
import { v4 as uuid4 } from "uuid";
const moduleName = "PODCAST";

const state = {
  feedData: null,
  selectedEpisode: null,
};

const actions = {
  async fetchAndParsePodcastFeed({ commit }, payload) {
    const { endPoint } = payload;
    const randomId = uuid4();
    commit(
      `system/${SystemMutation.ADD_LOADING}`,
      {
        name: moduleName,
        id: randomId,
      },
      { root: true }
    );
    const xmlResponse = await apiGetXmlFile({ endPoint });
    const parsedXmlData = await parse.parseString(xmlResponse.data);
    commit(PodcastMutations.GET_FETCHED_FEED, { feedData: parsedXmlData });
    commit(
      `system/${SystemMutation.REMOVE_LOADING}`,
      {
        name: moduleName,
        id: randomId,
      },
      { root: true }
    );
  },
  selectEpisode({ commit, state }, payload) {
    const { guid } = payload;
    const selectedEpisode = state.feedData.items.find(
      (episode) => episode.guid === guid
    );
    commit(PodcastMutations.SET_SELECTED_EPISODE, { selectedEpisode });
  },
};

const mutations = {
  [PodcastMutations.GET_FETCHED_FEED](state, payload) {
    const { feedData } = payload;
    state.feedData = feedData;
  },
  [PodcastMutations.SET_SELECTED_EPISODE](state, payload) {
    const { selectedEpisode } = payload;
    state.selectedEpisode = selectedEpisode;
  },
};

const getters = {
  episodes: (state) => state.feedData.items,
  isLoading: (state, getters, rootState) => {
    const { loadingQueue } = rootState.system;
    const isLoading = loadingQueue.some((queue) => queue.name === moduleName);
    return isLoading;
  },
  isSelctedEpisodeNull: (state) => state.selectedEpisode === null,
  selectedEpisodeIndex: (state, getters) => {
    const selectedEpisodeIndex = getters.episodes.findIndex(
      (episode) => episode.guid === state.selectedEpisode.guid
    );
    return selectedEpisodeIndex;
  },
  isSelctedEpisodeLast: (state, getters) => {
    return getters.selectedEpisodeIndex === 0;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
