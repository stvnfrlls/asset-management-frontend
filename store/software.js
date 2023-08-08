const state = {
  OS_Details: [],
  OS_Options: [],
  Software_Category: [],
};

const mutations = {
  GET_OS_DETAILS(state, response) {
    state.OS_Details = response;
  },
  GET_OS_OPTIONS(state, response) {
    state.OS_Options = response;
  },
  GET_SOFTWARE_CATEGORY(state, response) {
    state.Software_Category = response;
  },
};

const actions = {
  async getOS({ commit }) {
    try {
      const response = await this.$axios.$get("/availableOS", {
        headers: {
          Authorization: "Bearer " + this.$cookies.get("authToken"),
        },
      });
      const options = [
        { value: null, text: "Please select an option" },
        ...response.available_OS.map((available_OS) => ({
          value: available_OS.id,
          text: available_OS.software,
        })),
      ];
      commit("GET_OS_OPTIONS", options);
      commit("GET_OS_DETAILS", response);
    } catch (error) {
      console.error(error);
    }
  },
  async SoftwareCategory({ commit }) {
    try {
      const response = await this.$axios.$get("/getSoftwareCategory");
      const options = [
        { value: null, text: "Please select an option" },
        ...response.software_category.map((software_category) => ({
          value: software_category.id,
          text: software_category.software_category,
        })),
      ];
      commit("GET_SOFTWARE_CATEGORY", options);
    } catch (error) {
      console.error(error);
    }
  },
};

const getters = {
  getOSOptions: (state) => {
    return state.OS_Options;
  },
  getOSDetail: (state) => {
    return state.OS_Details;
  },
  getSoftwareCategory: (state) => {
    return state.Software_Category;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
