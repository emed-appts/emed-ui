<template>
  <v-card class="appointment-picker elevation-3">
    <v-card-text>
      <v-list
        v-if="appointments.length > 0"
        subheader>
        <v-subheader class="justify-space-between">
          Termine am {{ date | moment("DD.MM.") }}
          <small
            :class="{ 'error--text': hightlightHint }"
            class="text-xs-right">max. {{ maxSelect }} {{ maxSelect > 1 || maxSelect === 0 ? 'Termine' : 'Termin' }} möglich</small>
        </v-subheader>
        <v-list-tile
          v-for="appointment in appointmentsFromDate"
          :key="appointment.time.getTime()"
          ripple
          @click.capture.stop="toggle(appointment)">
          <v-list-tile-action>
            <v-checkbox
              :value="appointment.selected"
              :disabled="isDisabled(appointment)"
              readonly
              ripple />
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ appointment.time | moment("HH:mm") }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <template v-if="appointmentsFromOtherDates.length > 0">
          <v-divider></v-divider>
          <v-subheader>
            Termine an anderen Tagen
          </v-subheader>
          <v-list-tile
          v-for="appointment in appointmentsFromOtherDates"
          :key="appointment.time.getTime()"
          ripple
          @click.capture.stop="toggle(appointment)">
          <v-list-tile-action>
            <v-checkbox
              v-model="appointment.selected"
              :disabled="isDisabled(appointment)"
              readonly
              ripple />
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ appointment.time | moment("DD.MM. HH:mm") }}</v-list-tile-title>
            <v-list-tile-sub-title v-if="calendar && calendar.id !== appointment.calendar.id">{{ appointment.calendar.title }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        </template>
      </v-list>
      <as-empty-state
        v-if="appointments.length === 0"
        :class="{ 'mt-5': !$vuetify.breakpoint.smAndDown }"
        label="Keine Termine vorhanden"
        description="Wählen Sie einen Tag im Kalender aus."/>
    </v-card-text>
  </v-card>
</template>

<script>
import _ from "lodash";
import { mapState } from "vuex";

import utils from "@/utils";

export default {
  props: {
    value: {
      type: Array,
      required: true
    },
    appointments: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    maxSelect: parseInt(process.env.VUE_APP_MAX_POSSIBLE_APPOINTMENTS),
    hightlightHint: false,
    selectedAppointments: []
  }),
  computed: {
    ...mapState({
      calendar: state => state.calendarInProcess
    }),
    date() {
      return this.appointments.length > 0 && this.appointments[0].time;
    },
    selectableAppointments() {
      return this.appointments.map(appointment => {
        appointment.selected =
          _.findIndex(
            this.value,
            v => v.time.getTime() === appointment.time.getTime()
          ) > -1;
        return appointment;
      });
    },
    appointmentsFromDate() {
      return this.selectableAppointments
        .filter(appointment => utils.equalDate(appointment.time, this.date))
        .sort(appointmentCompareFn);
    },
    appointmentsFromOtherDates() {
      return this.selectableAppointments
        .filter(appointment => !utils.equalDate(appointment.time, this.date))
        .sort(appointmentCompareFn);
    }
  },
  methods: {
    toggle(appointment) {
      if (
        this.selectedAppointments.length < this.maxSelect ||
        appointment.selected
      ) {
        appointment.selected = !appointment.selected;
        this.selectedAppointments = this.selectableAppointments.filter(
          appointment => appointment.selected
        );
      } else {
        this.hightlightHint = true;
        setTimeout(() => {
          this.hightlightHint = false;
        }, 1000);

        return;
      }

      this.$emit("input", this.selectedAppointments);
    },
    isDisabled(appointment) {
      // only disable appointments that have not been selected
      // otherwise deselection won't be possible
      return (
        this.selectedAppointments.length >= this.maxSelect &&
        !appointment.selected
      );
    }
  }
};

/**
 * ascending date comparator
 *
 * @param {object} a - an appointment object {time, selected}
 * @param {object} b - an appointment object {time, selected}
 * @returns {int} - -1 if a.time < b.time; 1 if a.time > b.time; otherwise 0
 */
function appointmentCompareFn(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}
</script>

<style lang="stylus" scoped>
.appointment-picker .v-card__text
  padding: 8px 0 0

@media (min-width: 960px)
  .appointment-picker
    min-height: calc(100% - 24px - 1.15em)

  .appointment-picker >>> .v-subheader, .appointment-picker >>> .v-list__tile
    padding: 0 24px
</style>
