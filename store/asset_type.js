const state = {
  AssetType_Options: [],
  AssetType_Name: [],
};

const mutations = {
  GET_ASSETTYPE_OPTIONS(state, response) {
    state.AssetType_Options = response;
  },
  GET_ASSETTYPE_NAME(state, response) {
    state.AssetType_Name = response;
  },
};

const actions = {
  async getAssetTypes({ commit }) {
    try {
      const response = await this.$axios.$get("/getAssetType");
      const options = [
        { value: null, text: "Please select an option" },
        ...response.assetTypes.map((assetTypes) => ({
          value: assetTypes.id,
          text: assetTypes.assetType_name,
        })),
      ];
      const labels = response.assetTypes.map(
        (assetTypes) => assetTypes.assetType_name
      );
      commit("GET_ASSETTYPE_OPTIONS", options);
      commit("GET_ASSETTYPE_NAME", labels);
    } catch (error) {
      console.error(error);
    }
  },
};

const getters = {
  getAssetTypesOptions: (state) => {
    return state.AssetType_Options;
  },
  getAssetTypesName: (state) => {
    return state.AssetType_Name;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
