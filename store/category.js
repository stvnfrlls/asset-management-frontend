const state = {
  Category_Options: [],
  Category_Name: [],
};

const mutations = {
  GET_CATEGORY_OPTIONS(state, response) {
    state.Category_Options = response;
  },
  GET_CATEGORY_NAMES(state, response) {
    state.Category_Name = response;
  },
};

const actions = {
  async getCategories({ commit }) {
    try {
      const response = await this.$axios.$get("/getCategories");
      const options = [
        { value: null, text: "Please select an option" },
        ...response.categories.map((categories) => ({
          value: categories.id,
          text: categories.category_name,
        })),
      ];
      const labels = response.categories.map(
        (categories) => categories.category_name
      );
      commit("GET_CATEGORY_OPTIONS", options);
      commit("GET_CATEGORY_NAMES", labels);
    } catch (error) {
      console.error(error);
    }
  },
};

const getters = {
  getCategoryOptions: (state) => {
    return state.Category_Options;
  },
  getCategoryName: (state) => {
    return state.Category_Name;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
