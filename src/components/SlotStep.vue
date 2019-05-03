<template>
  <div>
    <v-container fluid grid-list-xl>
      <v-layout row wrap fill-height>
        <v-flex xs12>
          <h2 class="headline">Finden Sie einen passenden Termin</h2>
          <p class="subheading" v-if="maxSelect > 1">
            Sie können bis zu {{ maxSelect }} Termine auswählen. Diese können
            auch an unterschiedlichen Tagen stattfinden.
          </p>
        </v-flex>
        <v-flex xs12 md6>
          <as-date-picker
            :events="events"
            :highlight-events="highlightEvents"
            :show-loading-spinner="loading"
            :picker-view.sync="pickerView"
            @filter="filterSlots"
            @input="updateSlots"
          />
        </v-flex>
        <v-flex xs12 md6>
          <as-slot-picker
            :value="slots"
            :slots="pickableSlots"
            @input="selectSlots"
          />
        </v-flex>
      </v-layout>
    </v-container>
    <v-btn class="ml-0 mt-4" @click="goToPreviousStep">Zurück</v-btn>
    <v-btn
      :disabled="slots.length === 0"
      class="mt-4"
      color="primary"
      @click="goToNextStep"
    >
      Weiter
    </v-btn>
    <v-btn class="mr-0 mt-4 right" color="error" @click="resetProcess">
      Abbrechen
    </v-btn>
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
  SET_SLOTS,
  RESET
} from "@/plugins/vuex/mutation-types";
import utils from "@/utils";

export default {
  components: {
    AsDatePicker,
    AsSlotPicker
  },
  data: () => ({
    maxSelect: parseInt(process.env.VUE_APP_MAX_POSSIBLE_SLOTS),
    loading: false,
    pickerFilter: "",
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
      setSlots: SET_SLOTS,
      resetProcess: RESET
    }),
    filterSlots(filter) {
      this.pickerFilter = filter;
      this.loadSlots(new APIFilter.Builder().withDaytime(filter).build());
    },
    updateSlots(day) {
      this.availableDailySlots = this.availableMonthlySlots.filter(slot =>
        utils.equalDate(slot.time, day)
      );
    },
    selectSlots(slots) {
      this.slots = slots;
    },
    goToPreviousStep() {
      // reset local state
      this.slots = [];
      this.availableDailySlots = [];
      this.availableMonthlySlots = [];
      // reset vuex state
      this.setSlots([]);
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
    loadSlots(filter) {
      this.loading = true;
      return this.loadCalendar({
        calendar: this.calendar.id,
        filter: filter
      })
        .then(calendar => {
          this.loading = false;
          this.availableMonthlySlots = calendar.slots;
          return calendar.slots;
        })
        .then(slots => {
          if (
            slots.length > 0 &&
            slots[0].time.getMonth() !== this.pickerView.getMonth()
          ) {
            this.pickerView = new Date(slots[0].time.getTime());
          }
          return slots;
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

      this.loadSlots();
    },
    pickerView: function(val) {
      if (!this.calendar) return;

      const from = _.max([new Date(), val]);
      const to = new Date(from.getTime());
      to.setHours(0, 0, 0, 0);
      to.setDate(1);
      to.setMonth(to.getMonth() + 1);

      this.loadSlots(
        new APIFilter.Builder()
          .withFrom(from)
          .withTo(to)
          .withDaytime(this.pickerFilter)
          .build()
      );
    }
  }
};

class APIFilter {
  constructor(build) {
    this.from = build.from;
    this.to = build.to;
    this.am = build.am;
    this.pm = build.pm;
    this.maxCount = build.maxCount;
  }

  static get Builder() {
    class Builder {
      constructor() {
        this.maxCount = process.env.VUE_APP_API_SLOT_MAX_COUNT;
      }
      withFrom(from) {
        this.from = from;
        return this;
      }
      withTo(to) {
        this.to = to;
        return this;
      }
      // possible values: am, pm
      withDaytime(daytime) {
        // if we want to receive slots for particular daytime with set it to true
        // a filter for pm means AM = false and vice versa
        this.am = daytime !== "pm";
        this.pm = daytime !== "am";
        return this;
      }
      build() {
        return new APIFilter(this);
      }
    }
    return Builder;
  }
}
</script>
