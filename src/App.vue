<template>
  <v-app>
    <v-content>
      <v-slide-y-transition class="pb-2" group tag="div">
        <v-alert
          v-for="alert in alerts"
          :key="alert.uuid"
          :type="alert.type"
          :value="true"
          :dismissible="alert.type !== 'warning' && alert.type !== 'error'"
          @input="removeAlert(alert)"
        >
          <v-layout align-center>
            <v-flex>
              {{ alert.message }}
            </v-flex>
            <v-btn
              v-if="alert.type === 'warning' || alert.type === 'error'"
              class="right"
              color="secondary"
              @click="resetProcess"
            >
              <v-icon :left="$vuetify.breakpoint.mdAndUp">mdi-reload</v-icon>
              <span class="hidden-sm-and-down">Erneut versuchen</span>
            </v-btn>
          </v-layout>
        </v-alert>
      </v-slide-y-transition>
      <v-stepper :value="currentStep">
        <v-stepper-header>
          <v-stepper-step :complete="currentStep > 1" step="1">
            Information
          </v-stepper-step>
          <v-divider />
          <v-stepper-step :complete="currentStep > 2" step="2">
            Termingrund
            <transition name="fade" mode="out-in">
              <small
                :key="calendar.title"
                v-if="calendar"
                class="stepper__label__sublabel text-limit"
              >
                {{ calendar.title }}
              </small>
            </transition>
          </v-stepper-step>
          <v-divider />
          <v-stepper-step :complete="currentStep > 3" step="3">
            Termin auswählen
          </v-stepper-step>
          <v-divider></v-divider>
          <template v-if="slots.length === 0">
            <v-stepper-step :complete="currentStep > 4" step="4">
              Patientendaten
            </v-stepper-step>
            <v-divider />
          </template>
          <template v-for="(slot, index) in slots">
            <v-stepper-step
              :key="index"
              :complete="currentStep > 4 + index"
              :step="4 + index"
            >
              Patientendaten
              <small>{{ slot.time | moment("DD.MM. HH:mm") }}</small>
            </v-stepper-step>
            <v-divider :key="`divider-${slot.time.getTime()}`" />
          </template>
          <v-stepper-step :step="4 + Math.max(slots.length, 1)">
            Bestätigen
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <as-information-step :disabled="maintenanceMode" />
          </v-stepper-content>
          <v-stepper-content step="2">
            <as-calendar-step :disabled="maintenanceMode" :key="processID" />
          </v-stepper-content>
          <v-stepper-content step="3">
            <as-slot-step :disabled="maintenanceMode" :key="processID" />
          </v-stepper-content>
          <v-stepper-content
            v-for="(slot, index) in slots"
            :key="`content-${index}`"
            :step="4 + index"
          >
            <!-- IMPORTANT: v-if needed for autofocus in form -->
            <as-patient-step
              v-if="currentStep >= 4 + index"
              :desired-slot="slot"
              :disabled="maintenanceMode"
              :key="processID"
            />
          </v-stepper-content>
          <v-stepper-content :step="4 + slots.length">
            <as-confirmation-step
              :disabled="maintenanceMode"
              :key="processID"
            />
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import { ADD_ERROR, REMOVE_ALERT, RESET } from "@/plugins/vuex/mutation-types";

import AsInformationStep from "./components/InformationStep";
import AsCalendarStep from "./components/CalendarStep";
import AsSlotStep from "./components/SlotStep";
import AsPatientStep from "./components/PatientStep";
import AsConfirmationStep from "./components/ConfirmationStep";

export default {
  name: "eMedAppts",
  components: {
    AsInformationStep,
    AsCalendarStep,
    AsSlotStep,
    AsPatientStep,
    AsConfirmationStep
  },
  computed: {
    ...mapState({
      calendar: state => state.calendarInProcess,
      processID: state => state.processID,
      maintenanceMode: state => state.maintenanceMode
    }),
    ...mapGetters(["currentStep", "alerts", "slots"])
  },
  methods: mapMutations({
    addError: ADD_ERROR,
    removeAlert: REMOVE_ALERT,
    resetProcess: RESET
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
