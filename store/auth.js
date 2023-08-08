const state = {
  accessToken: null,
  username: null,
  accountType: null,
};

const mutations = {
  SET_ACCESS_TOKEN(state, accessToken) {
    state.accessToken = accessToken;
  },
  SET_ACCOUNT_TYPE(state, accountType) {
    state.accountType = accountType;
  },
  SET_USERNAME(state, username) {
    state.username = username;
  },
};

const actions = {
  setAccessToken({ commit }, accessToken) {
    commit("SET_ACCESS_TOKEN", accessToken);
  },
  setAccountType({ commit }, accountType) {
    commit("SET_ACCOUNT_TYPE", accountType);
  },
  setUsername({ commit }, username) {
    commit("SET_USERNAME", username);
  },
};

const getters = {
  getAccessToken: (state) => {
    return state.accessToken;
  },
  getAccountType: (state) => {
    return state.accountType;
  },
  getUsername: (state) => {
    return state.username;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
