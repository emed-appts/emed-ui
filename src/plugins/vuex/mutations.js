import Vue from "vue";
import {
  GO_STEP,
  GO_NEXT_STEP,
  GO_PREV_STEP,
  SET_CALENDAR,
  RECEIVE_CALENDARS,
  SET_SLOTS,
  ADD_PATIENT
} from "./mutation-types";

export default {
  [GO_STEP](state, step) {
    state.currentStep = step;
  },
  [GO_NEXT_STEP](state) {
    state.currentStep++;
  },
  [GO_PREV_STEP](state) {
    state.currentStep--;
  },
  [SET_CALENDAR](state, calendar) {
    state.calendarInProcess = calendar;
  },
  [RECEIVE_CALENDARS](state, calendars) {
    for (let calendar of calendars) {
      if (!state.calendars[calendar.id]) {
        Vue.set(state.calendars, calendar.id, calendar);
      }
    }
  },
  [SET_SLOTS](state, slots) {
    Vue.set(state, "slots", {});
    for (let slot of slots) {
      Vue.set(state.slots, slot.time.getTime(), slot);
    }
  },
  [ADD_PATIENT](state, patient) {
    if (!state.patients[patient.insuranceNumber]) {
      Vue.set(state.patients, patient.insuranceNumber, patient);
    }
  }
};
