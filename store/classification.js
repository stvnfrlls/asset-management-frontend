const state = {
  Classification_Options: [],
  Classification_Name: [],
};

const mutations = {
  GET_CLASSIFICATION_OPTIONS(state, response) {
    state.Classification_Options = response;
  },
  GET_CLASSIFICATION_NAME(state, response) {
    state.Classification_Name = response;
  },
};

const actions = {
  async getClassifications({ commit }) {
    try {
      const response = await this.$axios.$get("/getClassifications");
      const options = [
        { value: null, text: "Please select an option" },
        ...response.classifications.map((classification) => ({
          value: classification.id,
          text: classification.class_name,
        })),
      ];
      const labels = response.classifications.map(
        (classification) => classification.class_name
      );
      commit("GET_CLASSIFICATION_OPTIONS", options);
      commit("GET_CLASSIFICATION_NAME", labels);
    } catch (error) {
      console.error(error);
    }
  },
};

const getters = {
  getClassificationOptions: (state) => {
    return state.Classification_Options;
  },
  getClassificationName: (state) => {
    return state.Classification_Name;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
