import { GO_STEP, GO_NEXT_STEP, GO_PREV_STEP } from "./mutation-types";

export default {
  [GO_STEP](state, step) {
    state.currentStep = step;
  },
  [GO_NEXT_STEP](state) {
    state.currentStep++;
  },
  [GO_PREV_STEP](state) {
    state.currentStep--;
  }
};
