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
          <v-divider />
          <v-stepper-step
            :complete="currentStep > 3"
            step="3">Termin auswählen</v-stepper-step>
          <v-divider></v-divider>
          <template v-if="appointments.length === 0">
            <v-stepper-step
              :complete="currentStep > 4"
              step="4">Patientendaten</v-stepper-step>
            <v-divider />
          </template>
          <template v-for="(appointment, index) in appointments">
            <v-stepper-step
              :key="index"
              :complete="currentStep > 4 + index"
              :step="4 + index">
              Patientendaten
              <small>{{ appointment.time | moment('DD.MM. HH:mm') }}</small>
            </v-stepper-step>
            <v-divider :key="`divider-${appointment.time.getTime()}`" />
          </template>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <as-information-step />
          </v-stepper-content>
          <v-stepper-content step="2">
            <as-calendar-step />
          </v-stepper-content>
          <v-stepper-content step="3">
            <as-appointment-step />
          </v-stepper-content>
          <v-stepper-content
            v-for="(appointment, index) in appointments"
            :key="`content-${index}`"
            :step="4 + index">
            <as-patient-step :appointment="appointment" />
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";

import AsInformationStep from "./components/InformationStep";
import AsCalendarStep from "./components/CalendarStep";
import AsAppointmentStep from "./components/AppointmentStep";
import AsPatientStep from "./components/PatientStep";
import { GO_PREV_STEP } from "./plugins/vuex/mutation-types";

export default {
  name: "eMedAppts",
  components: {
    AsInformationStep,
    AsCalendarStep,
    AsAppointmentStep,
    AsPatientStep
  },
  computed: {
    ...mapState({
      currentStep: state => state.currentStep,
      calendar: state => state.calendarInProcess
    }),
    ...mapGetters(["appointments"])
  },
  methods: mapMutations({
    goPreviousStep: GO_PREV_STEP
  })
};
</script>

<style lang="stylus" scoped>
.stepper__label__sublabel
  display: block
  max-width: 150px
  white-space: nowrap
  text-overflow: ellipsis
  overflow: hidden

@media (max-width: 959px)
  .stepper__label__sublabel
    max-width: 95px

.fade-enter-active, .fade-leave-active
  transition: all .1s

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
  max-width: 0
  opacity: 0
</style>
