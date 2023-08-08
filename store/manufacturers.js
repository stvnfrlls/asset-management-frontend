const state = {
  Manufacturer_Options: [],
  Manufacturer_Name: [],
};

const mutations = {
  GET_MANUFACTURER_OPTIONS(state, response) {
    state.Manufacturer_Options = response;
  },
  GET_MANUFACTURER_NAME(state, response) {
    state.Manufacturer_Name = response;
  },
};

const actions = {
  async getManufacturers({ commit }) {
    try {
      const response = await this.$axios.$get("/getManufacturers");
      const options = [
        { value: null, text: "Please select an option" },
        ...response.manufacturers.map((manufacturers) => ({
          value: manufacturers.id,
          text: manufacturers.manufacturer_name,
        })),
      ];
      const labels = response.manufacturers.map(
        (manufacturers) => manufacturers.manufacturer_name
      );
      commit("GET_MANUFACTURER_OPTIONS", options);
      commit("GET_MANUFACTURER_NAME", labels);
    } catch (error) {
      console.error(error);
    }
  },
};

const getters = {
  getManufacturersOptions: (state) => {
    return state.Manufacturer_Options;
  },
  getManufacturersName: (state) => {
    return state.Manufacturer_Name;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
