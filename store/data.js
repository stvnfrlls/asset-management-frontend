const state = {
  // Your initial state
  data: [],
};

const mutations = {
  // Define mutations to update the state
  setData(state, payload) {
    state.data = {
      ...state.data,
      ...payload,
    };
  },
};

const actions = {
  // Define actions to commit mutations
  setData({ commit }, payload) {
    commit("setData", payload);
  },
};

const getters = {
  // Define getters to access the state
  getData(state) {
    return state.data;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
