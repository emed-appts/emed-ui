<template>
  <v-app>
    <v-content>
      <v-stepper :value="currentStep">
        <v-stepper-header>
          <v-stepper-step
            :complete="currentStep > 1"
            step="1">Information</v-stepper-step>
          <v-divider />
          <v-stepper-step
            :complete="currentStep > 2"
            step="2">
            Termingrund
            <transition name="fade" mode="out-in">
              <small :key="calendar.title"
                v-if="calendar"
                class="stepper__label__sublabel text-limit">{{ calendar.title }}</small>
            </transition>
          </v-stepper-step>
          <v-stepper-step
            step="3">
            Test
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <as-information-step />
          </v-stepper-content>
          <v-stepper-content step="2">
            <as-calendar-step />
          </v-stepper-content>
          <v-stepper-content step="3">
            <v-btn @click="goPreviousStep">ZURÜCK</v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import AsInformationStep from "./components/InformationStep";
import AsCalendarStep from "./components/CalendarStep";
import { GO_PREV_STEP } from "./plugins/vuex/mutation-types";

export default {
  name: "eMedAppts",
  components: {
    AsInformationStep,
    AsCalendarStep
  },
  computed: mapState({
    currentStep: state => state.currentStep,
    calendar: state => state.calendarInProcess
  }),
  methods: mapMutations({
    goPreviousStep: GO_PREV_STEP
  })
};
</script>

<style lang="stylus" scoped>
.stepper__label__sublabel
  display: block
  max-width: 150px

@media (max-width: 991px)
  .stepper__label__sublabel
    max-width: 95px

.fade-enter-active, .fade-leave-active
  transition: all .1s

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
  max-width: 0
  opacity: 0
</style>
