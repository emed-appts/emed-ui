<template>
  <div>
    <v-container
      fluid
      grid-list-xl>
      <v-layout
        row
        wrap
        fill-height>
        <v-flex xs12>
          <h2 class="headline">Finden Sie einen passenden Termin</h2>
        </v-flex>
        <v-flex
          xs12
          md6>
          <as-date-picker
            :events="events"
            :hightlight-events="appointments"
            :show-loading-spinner="loading"
            :picker-view.sync="pickerView"
            @input="selectEvents" />
        </v-flex>
        <v-flex
          xs12
          md6>
          <as-appointment-picker
            :value="appointments"
            :appointments="pickableAppointments"
            @input="selectAppointments" />
        </v-flex>
      </v-layout>
    </v-container>
    <v-btn
      class="ml-0 mt-4"
      @click="goToPreviousStep">Zurück</v-btn>
    <v-btn
      :disabled="appointments.length === 0"
      class="mt-4"
      color="primary"
      @click="goToNextStep">Weiter</v-btn>
  </div>
</template>

<script>
import _ from "lodash";
import { mapActions, mapMutations, mapState } from "vuex";

import AsDatePicker from "./utils/DatePicker";
import AsAppointmentPicker from "./utils/AppointmentPicker";
import { GET_CALENDAR } from "@/plugins/vuex/action-types";
import {
  GO_PREV_STEP,
  GO_NEXT_STEP,
  SET_CALENDAR,
  SET_APPOINTMENTS
} from "@/plugins/vuex/mutation-types";

export default {
  components: {
    AsDatePicker,
    AsAppointmentPicker
  },
  data: () => ({
    loading: false,
    pickerView: null,
    // selected appointments
    appointments: [],
    // available appointments from that day
    availableDailyAppointments: [],
    // all available appointments from that month
    availableMonthlyAppointments: []
  }),
  computed: {
    ...mapState({
      calendar: state => state.calendarInProcess
    }),
    pickableAppointments() {
      return _.uniqBy(
        this.availableDailyAppointments.concat(this.appointments),
        appointment => appointment.time.getTime()
      );
    },
    events() {
      return this.availableMonthlyAppointments.map(appointment =>
        appointment.time.toISOString()
      );
    }
  },
  methods: {
    ...mapActions({
      loadCalendar: GET_CALENDAR
    }),
    ...mapMutations({
      goPreviousStep: GO_PREV_STEP,
      goNextStep: GO_NEXT_STEP,
      setCalendar: SET_CALENDAR,
      setAppointments: SET_APPOINTMENTS
    }),
    selectEvents(events) {
      this.availableDailyAppointments = this.availableMonthlyAppointments.filter(
        appointment => events.includes(appointment.time.toISOString())
      );
    },
    selectAppointments(appointments) {
      this.appointments = appointments;
    },
    goToPreviousStep() {
      this.setCalendar(null);
      this.goPreviousStep();
    },
    goToNextStep() {
      this.setAppointments(this.appointments);
      this.goNextStep();
    },
    // loads appointments from given date to end of month
    loadAppointments(fromDate) {
      this.loading = true;
      this.loadCalendar({
        calendar: this.calendar.id,
        filter: generateAPIFilter(fromDate)
      }).then(calendar => {
        this.loading = false;
        this.availableMonthlyAppointments = calendar.slots;
      });
    }
  },
  watch: {
    calendar: function(cal) {
      if (!cal) {
        this.availableDailyAppointments = [];
        this.pickerView = new Date();
        return;
      }

      this.loadAppointments(new Date());
    },
    pickerView: function(val) {
      if (!this.calendar) return;
      this.loadAppointments(_.max([new Date(), val]));
    }
  }
};

function generateAPIFilter(fromDate) {
  const maxDate = new Date(fromDate.getTime());
  maxDate.setHours(0, 0, 0, 0);
  maxDate.setDate(1);
  maxDate.setMonth(maxDate.getMonth() + 1);

  return {
    from: fromDate,
    to: maxDate
  };
}
</script>
