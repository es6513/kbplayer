import * as SystemMutation from "./mutationTypes";

const state = {
  loadingQueue: [],
};

const actions = {};

const mutations = {
  [SystemMutation.ADD_LOADING](state, payload) {
    const { name, id } = payload;
    state.loadingQueue = [...state.loadingQueue, { name, id }];
  },
  [SystemMutation.REMOVE_LOADING](state, payload) {
    const { id } = payload;
    state.loadingQueue = state.loadingQueue.filter((queue) => queue.id !== id);
  },
  [SystemMutation.REMOVE_ALL_LOAINDG](state) {
    state.loadingQueue = [];
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
