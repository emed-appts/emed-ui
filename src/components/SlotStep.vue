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
            :highlight-events="highlightEvents"
            :show-loading-spinner="loading"
            :picker-view.sync="pickerView"
            @input="selectEvents" />
        </v-flex>
        <v-flex
          xs12
          md6>
          <as-slot-picker
            :value="slots"
            :slots="pickableSlots"
            @input="selectSlots" />
        </v-flex>
      </v-layout>
    </v-container>
    <v-btn
      class="ml-0 mt-4"
      @click="goToPreviousStep">Zurück</v-btn>
    <v-btn
      :disabled="slots.length === 0"
      class="mt-4"
      color="primary"
      @click="goToNextStep">Weiter</v-btn>
  </div>
</template>

<script>
import _ from "lodash";
import { mapActions, mapMutations, mapState } from "vuex";

import AsDatePicker from "./utils/DatePicker";
import AsSlotPicker from "./utils/SlotPicker";
import { GET_CALENDAR } from "@/plugins/vuex/action-types";
import {
  GO_PREV_STEP,
  GO_NEXT_STEP,
  SET_CALENDAR,
  SET_SLOTS
} from "@/plugins/vuex/mutation-types";

export default {
  components: {
    AsDatePicker,
    AsSlotPicker
  },
  data: () => ({
    loading: false,
    pickerView: null,
    // selected slots
    slots: [],
    // available slots from that day
    availableDailySlots: [],
    // all available slots from that month
    availableMonthlySlots: []
  }),
  computed: {
    ...mapState({
      calendar: state => state.calendarInProcess
    }),
    pickableSlots() {
      return _.uniqBy(this.availableDailySlots.concat(this.slots), slot =>
        slot.time.getTime()
      );
    },
    events() {
      return this.availableMonthlySlots.map(slot => slot.time.toISOString());
    },
    highlightEvents() {
      return this.slots.map(slot => slot.time.toISOString());
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
      setSlots: SET_SLOTS
    }),
    selectEvents(events) {
      this.availableDailySlots = this.availableMonthlySlots.filter(slot =>
        events.includes(slot.time.toISOString())
      );
    },
    selectSlots(slots) {
      this.slots = slots;
    },
    goToPreviousStep() {
      this.setCalendar(null);
      this.goPreviousStep();
    },
    goToNextStep() {
      this.setSlots(this.slots);
      // IMPORTANT: we've to wait for $nextTick
      // otherwise dynamically rendered steps are not showing up
      this.$nextTick(this.goNextStep);
    },
    // loads slots from given date to end of month
    loadSlots(fromDate) {
      this.loading = true;
      this.loadCalendar({
        calendar: this.calendar.id,
        filter: generateAPIFilter(fromDate)
      }).then(calendar => {
        this.loading = false;
        this.availableMonthlySlots = calendar.slots;
      });
    }
  },
  watch: {
    calendar: function(cal) {
      if (!cal) {
        this.availableDailySlots = [];
        this.pickerView = new Date();
        return;
      }

      this.loadSlots(new Date());
    },
    pickerView: function(val) {
      if (!this.calendar) return;
      this.loadSlots(_.max([new Date(), val]));
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
