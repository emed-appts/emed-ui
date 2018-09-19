import Vue from "vue";
import {
  GO_STEP,
  GO_NEXT_STEP,
  GO_PREV_STEP,
  SET_CALENDAR,
  RECEIVE_CALENDARS,
  SET_APPOINTMENTS
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
        createCalendar(state, calendar);
      }
    }
  },
  [SET_APPOINTMENTS](state, slots) {
    slots.forEach(slot => {
      Vue.set(state.appointments, slot.time.getTime(), slot);
    });
  }
};

function createCalendar(state, calendar) {
  Vue.set(state.calendars, calendar.id, calendar);
}
