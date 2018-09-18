import Vue from "vue";
import Vuex from "vuex";

import * as actions from "./actions";
import * as getters from "./getters";
import mutations from "./mutations";
import plugins from "./plugins";

Vue.use(Vuex);

const state = {
  currentStep: 1,
  editMode: false,
  appointmentInProcess: {},
  calendar: {
    /*
    id: {
      id,
      title,
      subtitle,
      description, // can hold html string
      isOnlyInformative // if informative => only to view information (disable click)
    }
    */
  },
  appointments: [], // array of dates
  patients: [
    /*
    insuranceNumber: {
      firstName,
      lastName,
      birthday,
      insuranceNumber,
      email,
      phoneNumber,
      acceptsPrivacyPolicy,
      slots // array of dates
    }
    */
  ]
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins,
  strict: process.env.NODE_ENV !== "production"
});
