import Vue from "vue";
import {
  GO_STEP,
  GO_NEXT_STEP,
  GO_PREV_STEP,
  SET_CALENDAR,
  RECEIVE_CALENDARS,
  SET_SLOTS,
  REMOVE_SLOT,
  ADD_PATIENT,
  REMOVE_PATIENT,
  SET_EDITMODE,
  RESET
} from "./mutation-types";
import utils from "./utils";

export default {
  [RESET](state) {
    state.previousStep = 0;
    state.currentStep = 1;
    state.processID = utils.generateID();
    state.editMode = false;
    state.calendarInProcess = null;
    for (let slot in state.slots) {
      Vue.delete(state.slots, slot);
    }
    for (let patient in state.patients) {
      Vue.delete(state.patients, patient);
    }
  },
  [GO_STEP](state, step) {
    goStep(state, step);
  },
  [GO_NEXT_STEP](state) {
    goStep(state, state.currentStep + 1);
  },
  [GO_PREV_STEP](state) {
    state.currentStep = state.previousStep;
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
  [REMOVE_SLOT](state, slot) {
    Vue.delete(state.slots, slot.time.getTime());

    let patient = undefined;
    for (let patIndex in state.patients) {
      if (state.patients[patIndex].slots[0].equals(slot)) {
        patient = state.patients[patIndex];
        break;
      }
    }

    if (patient) {
      removePatient(state, patient);
    }
  },
  [ADD_PATIENT](state, patient) {
    if (!state.patients[patient.insuranceNumber]) {
      Vue.set(state.patients, patient.insuranceNumber, patient);
    }
  },
  [REMOVE_PATIENT](state, patient) {
    removePatient(state, patient);
  },
  [SET_EDITMODE](state, editMode) {
    state.editMode = editMode;
  }
};

function goStep(state, step) {
  state.previousStep = state.currentStep;
  state.currentStep = step;
}

function removePatient(state, patient) {
  Vue.delete(state.patients, patient.insuranceNumber);
}
