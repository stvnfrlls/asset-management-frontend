const state = {
  UserRoles_Options: [],
};

const mutations = {
  GET_USERROLES_OPTIONS(state, response) {
    state.UserRoles_Options = response;
  },
};

const actions = {
  async getUserRoles({ commit }) {
    try {
      const response = await this.$axios.$get("/getUserRoles");
      const options = [
        { value: null, text: "Please select an option" },
        ...response.roles.map((roles) => ({
          value: roles.id,
          text: roles.role,
        })),
      ];
      commit("GET_USERROLES_OPTIONS", options);
    } catch (error) {
      console.error(error);
    }
  },
};

const getters = {
  getUserRoleOptions: (state) => {
    return state.UserRoles_Options;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
