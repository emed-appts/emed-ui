import Vue from "vue";
import Vuex from "vuex";

import * as getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";
import plugins from "./plugins";

Vue.use(Vuex);

const state = {
  currentStep: 1,
  editMode: false,
  calendarInProcess: null,
  calendars: {
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
  slotInProcess: "", // appointment = date
  slots: {
    /*
    unix_timestamp: {
      time,
      calendar
    }
    */
  },
  patients: {
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
  }
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins,
  strict: process.env.NODE_ENV !== "production"
});
