import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import data from "./data";
import asset_details from "./asset_details";
import asset_type from "./asset_type";
import classification from "./classification";
import category from "./category";
import department from "./department";
import manufacturers from "./manufacturers";
import roles from "./roles";
import status from "./status";
import software from "./software";
import audit from "./audit";

Vue.use(Vuex);

const createStore = () => {
  return new Vuex.Store({
    modules: {
      auth,
      data,
      asset_details,
      asset_type,
      classification,
      category,
      department,
      manufacturers,
      roles,
      status,
      software,
      audit,
    },
  });
};

export default createStore;
