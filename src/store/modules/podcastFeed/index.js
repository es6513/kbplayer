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
  playingEpisode: null,
  isEpisodePlaying: false,
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

    try {
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
    } catch (error) {
      console.error(error);
    }
  },
  selectEpisode({ commit, state }, payload) {
    const { guid } = payload;
    const selectedEpisode = state.feedData.items.find(
      (episode) => episode.guid === guid
    );
    commit(PodcastMutations.SET_SELECTED_EPISODE, { selectedEpisode });
  },
  setPlayingEpisode({ commit, state }, payload) {
    const { guid } = payload;
    const playingEpisode = state.feedData.items.find(
      (episode) => episode.guid === guid
    );
    commit(PodcastMutations.SET_PLAYING_EPISODE, { playingEpisode });
  },
  togglePlayingState({ commit }) {
    commit(PodcastMutations.TOGGLE_ISPLAYING_STATE);
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
  [PodcastMutations.SET_PLAYING_EPISODE](state, payload) {
    const { playingEpisode } = payload;
    state.playingEpisode = playingEpisode;
  },
  [PodcastMutations.TOGGLE_ISPLAYING_STATE](state) {
    state.isEpisodePlaying = !state.isEpisodePlaying;
  },
};

const getters = {
  episodes: (state) => state.feedData.items,
  isLoading: (state, getters, rootState) => {
    const { loadingQueue } = rootState.system;
    const isLoading = loadingQueue.some((queue) => queue.name === moduleName);
    return isLoading;
  },
  isSelectedEpisodeNull: (state) => state.selectedEpisode === null,
  playingEpisodeIndex: (state, getters) => {
    const playingEpisodeIndex = getters.episodes.findIndex(
      (episode) => episode.guid === state.playingEpisode.guid
    );
    return playingEpisodeIndex;
  },
  isPlayingEpisodeLast: (state, getters) => {
    return getters.selectedEpisodeIndex === 0;
  },
  isSelectedEpisodePlaying: (state) => {
    if (!state.playingEpisode) return false;
    const { guid: selectedEpisodeId } = state.selectedEpisode;
    const { guid: playingEpisodeId } = state.playingEpisode;
    return selectedEpisodeId === playingEpisodeId;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
