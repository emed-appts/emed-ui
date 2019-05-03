<template>
  <div>
    <v-radio-group
      v-model="timeFilter"
      :row="$vuetify.breakpoint.smOnly || $vuetify.breakpoint.lgAndUp"
      class="pt-0"
      label="Ist es Ihnen nur zu bestimmten Zeiten möglich?"
      @change="emitFilter"
    >
      <v-radio value="" label="Keine Präferenz" ripple />
      <v-radio value="am" label="Vormittag" ripple />
      <v-radio value="pm" label="Nachmittag" ripple />
    </v-radio-group>
    <p class="accent--text" v-if="events.length === 0">
      Es wurden keine passenden Termine gefunden.
    </p>
    <as-loading :show="loading">
      <v-date-picker
        v-model="date"
        :events="eventDays"
        :event-color="dateColors"
        :allowed-dates="allowedDates"
        :min="new Date().toISOString().substr(0, 10)"
        :picker-date="pickerDate"
        class="elevation-3"
        locale="de-de"
        first-day-of-week="1"
        full-width
        no-title
        @update:pickerDate="emitPickerView"
        @input="emitEventDay"
      />
    </as-loading>
    <dl class="date-picker-table__legend d-flex">
      <dt
        class="date-picker-table__event-term flex d-inline-flex justify-center align-center"
      >
        <div class="v-date-picker-table__event text-hide primary">
          Orange
        </div>
      </dt>
      <dd
        class="date-picker-table__event-description flex d-inline-flex align-center"
      >
        Verfügbare Termine
      </dd>
      <dt
        class="date-picker-table__event-term flex d-inline-flex justify-center align-center"
      >
        <div class="v-date-picker-table__event text-hide secondary">
          Braun
        </div>
      </dt>
      <dd
        class="date-picker-table__event-description flex d-inline-flex align-center"
      >
        Ausgewählte Termine
      </dd>
    </dl>
  </div>
</template>

<script>
import _ from "lodash";

import utils from "@/utils";

export default {
  props: {
    events: {
      type: Array,
      default: () => []
    },
    highlightEvents: {
      type: Array,
      default: () => []
    },
    showLoadingSpinner: Boolean,
    pickerView: Date
  },
  data: () => ({
    // selected date from datepicker
    date: null,
    // filter by none/am/pm
    timeFilter: ""
  }),
  computed: {
    uniqueEvents() {
      return _.uniq(
        this.events.concat(this.highlightEvents).sort(utils.dateCompareFn)
      );
    },
    eventDays() {
      return _.uniq(this.uniqueEvents.map(evt => evt.substr(0, 10)));
    },
    highlightEventDays() {
      return _.uniq(this.highlightEvents.map(evt => evt.substr(0, 10)));
    },
    loading() {
      return this.showLoadingSpinner || this.fakeLoading;
    },
    pickerDate() {
      return formatPickerDate(this.pickerView);
    }
  },
  methods: {
    // used for coloring of datepicker
    allowedDates(val) {
      return this.eventDays.includes(val);
    },
    // used to set color depending on event
    dateColors(date) {
      return this.highlightEventDays.includes(date) ? "secondary" : "primary";
    },
    emitFilter(filter) {
      this.$emit("filter", filter);
    },
    emitEventDay(day) {
      this.$emit("input", utils.parseISOLocal(day));
    }
  },
  created() {
    this.emitPickerView = _.debounce(val => {
      if (val.indexOf("-") == -1) return;
      this.$emit("update:pickerView", utils.parseISOLocal(val));
    }, 500);
  }
};

// returns format YYYY-MM
function formatPickerDate(date) {
  if (!date) return "";
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
}
</script>

<style lang="stylus" scoped>
.v-input--radio-group.v-input--radio-group--row >>> .v-label
  flex-basis: 100%

.date-picker-table__legend
  font-size: 80%

.date-picker-table__legend >>> .date-picker-table__event-term
  flex-basis: 10%
  max-width: 10%
  padding: 12px 5px !important

.date-picker-table__legend >>> .date-picker-table__event-description
  flex-basis: 40%
  max-width: 40%

@media (min-width: 600px)
  .date-picker-table__legend >>> .date-picker-table__event-term
    padding: 12px !important
    flex-basis: 6%
    max-width: 6%

  .date-picker-table__legend >>> .date-picker-table__event-description
    flex-basis: 28%
    max-width: 28%

@media (min-width: 960px)
  .date-picker-table__legend >>> .date-picker-table__event-term
    flex-basis: 9%
    max-width: 9%

  .date-picker-table__legend >>> .date-picker-table__event-description
    flex-basis: 38%
    max-width: 38%

.date-picker-table__legend >>> .v-date-picker-table__event
  position: static
  transform: none
  height: 8px
  max-width: 8px
  border-radius: 50%
</style>
