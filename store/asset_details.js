const state = {
  Asset_Details: [],
  Asset_View: [],
  Asset_No: [],
  Asset_Count: 0,
  Asset_Available: 0,
  Asset_InUse: 0,
};

const mutations = {
  GET_ASSET_DETAILS(state, response) {
    state.Asset_Details = response;
  },
  GET_ASSET_VIEW(state, response) {
    state.Asset_View = response;
  },
  GET_ASSET_NO(state, response) {
    state.Asset_No = response;
  },
  GET_ASSET_COUNT(state, response) {
    state.Asset_Count = response;
  },
  GET_ASSET_AVAILABLE(state, response) {
    state.Asset_Available = response;
  },
  GET_ASSET_INUSE(state, response) {
    state.Asset_InUse = response;
  },
};

const actions = {
  async getAssetDetails({ commit }) {
    try {
      const response = await this.$axios.$get("/getAll", {
        headers: {
          Authorization: "Bearer " + this.$cookies.get("authToken"),
        },
      });
      commit("GET_ASSET_DETAILS", response.Asset_List);
      commit("GET_ASSET_COUNT", response.AssetCount);
      commit("GET_ASSET_AVAILABLE", response.AssetsAvailable);
      commit("GET_ASSET_INUSE", response.AssetsInUse);
    } catch (error) {
      console.error(error);
    }
  },
  async getAssetNo({ commit }) {
    try {
      const response = await this.$axios.$get("/getAssetNo", {
        headers: {
          Authorization: "Bearer " + this.$cookies.get("authToken"),
        },
      });
      commit("GET_ASSET_NO", response);
    } catch (error) {
      console.error(error);
    }
  },
  async getAssetDetailsByID({ commit }, { id }) {
    try {
      const response = await this.$axios.$get(`/assets/${id}`, {
        headers: {
          Authorization: "Bearer " + this.$cookies.get("authToken"),
        },
      });
      commit("GET_ASSET_VIEW", response);
    } catch (error) {
      console.error(error);
    }
  },
};

const getters = {
  getAssetDetails: (state) => {
    return state.Asset_Details;
  },
  getAssetView: (state) => {
    return state.Asset_View;
  },
  getAssetNo: (state) => {
    return state.Asset_No;
  },
  getAssetCount: (state) => {
    return state.Asset_Count;
  },
  getAssetAvailable: (state) => {
    return state.Asset_Available;
  },
  getAssetInUse: (state) => {
    return state.Asset_InUse;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
