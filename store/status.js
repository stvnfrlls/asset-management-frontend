const state = {
  StatusType_Options: [],
  StatusType_Name: [],
};

const mutations = {
  GET_STATUSTYPE_OPTIONS(state, response) {
    state.StatusType_Options = response;
  },
  GET_STATUSTYPE_NAME(state, response) {
    state.StatusType_Name = response;
  },
};

const actions = {
  async getStatusType({ commit }) {
    try {
      const response = await this.$axios.$get("/getStatusType");
      const options = [
        { value: null, text: "Please select an option" },
        ...response.statusType.map((statusType) => ({
          value: statusType.id,
          text: statusType.status_name,
        })),
      ];
      const labels = response.statusType.map(
        (statusType) => statusType.status_name
      );
      commit("GET_STATUSTYPE_OPTIONS", options);
      commit("GET_STATUSTYPE_NAME", labels);
    } catch (error) {
      console.error(error);
    }
  },
};

const getters = {
  getStatusTypeOptions: (state) => {
    return state.StatusType_Options;
  },
  getStatusTypeName: (state) => {
    return state.StatusType_Name;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
