import Vue from "vue";
import Vuex from "vuex";

import * as getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";
import plugins from "./plugins";
import utils from "./utils";

Vue.use(Vuex);

const state = {
  processID: utils.generateID(),
  maintenanceMode: false,
  steps: [1],
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
  },
  alerts: {
    /*
    uuid: {
      uuid,
      type,
      message
    }
    */
  }
};

export const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins,
  strict: process.env.NODE_ENV !== "production"
});
