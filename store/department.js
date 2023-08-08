const state = {
  Department_Options: [],
};

const mutations = {
  GET_DEPARTMENT_OPTIONS(state, response) {
    state.Department_Options = response;
  },
};

const actions = {
  async getDepartments({ commit }) {
    try {
      const response = await this.$axios.$get("/getDepartments");
      const options = [
        { value: null, text: "Please select an option" },
        ...response.departments.map((departments) => ({
          value: departments.id,
          text: departments.dept_name,
        })),
      ];
      commit("GET_DEPARTMENT_OPTIONS", options);
    } catch (error) {
      console.error(error);
    }
  },
};

const getters = {
  getDepartmentOptions: (state) => {
    return state.Department_Options;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
