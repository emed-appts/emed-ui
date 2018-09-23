<template>
  <v-card class="slot-picker elevation-3">
    <v-card-text>
      <v-list
        v-if="slots.length > 0"
        subheader>
        <v-subheader class="justify-space-between">
          Termine am {{ date | moment("DD.MM.") }}
          <small
            :class="{ 'error--text': hightlightHint }"
            class="text-xs-right">max. {{ maxSelect }} {{ maxSelect > 1 || maxSelect === 0 ? 'Termine' : 'Termin' }} möglich</small>
        </v-subheader>
        <v-list-tile
          v-for="slot in slotsFromDate"
          :key="slot.time.getTime()"
          ripple
          @click.capture.stop="toggle(slot)">
          <v-list-tile-action>
            <v-checkbox
              :value="slot.selected"
              :disabled="isDisabled(slot)"
              readonly
              ripple />
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ slot.time | moment("HH:mm") }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <template v-if="slotsFromOtherDates.length > 0">
          <v-divider></v-divider>
          <v-subheader>
            Termine an anderen Tagen
          </v-subheader>
          <v-list-tile
          v-for="slot in slotsFromOtherDates"
          :key="slot.time.getTime()"
          ripple
          @click.capture.stop="toggle(slot)">
          <v-list-tile-action>
            <v-checkbox
              v-model="slot.selected"
              :disabled="isDisabled(slot)"
              readonly
              ripple />
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ slot.time | moment("DD.MM. HH:mm") }}</v-list-tile-title>
            <v-list-tile-sub-title v-if="calendar && calendar.id !== slot.calendar.id">{{ slot.calendar.title }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        </template>
      </v-list>
      <as-empty-state
        v-if="slots.length === 0"
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
    slots: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    maxSelect: parseInt(process.env.VUE_APP_MAX_POSSIBLE_SLOTS),
    hightlightHint: false,
    selectedSlots: []
  }),
  computed: {
    ...mapState({
      calendar: state => state.calendarInProcess
    }),
    date() {
      return this.slots.length > 0 && this.slots[0].time;
    },
    selectableSlots() {
      return this.slots.map(slot => {
        slot.selected =
          _.findIndex(
            this.value,
            v => v.time.getTime() === slot.time.getTime()
          ) > -1;
        return slot;
      });
    },
    slotsFromDate() {
      return this.selectableSlots
        .filter(slot => utils.equalDate(slot.time, this.date))
        .sort(slotCompareFn);
    },
    slotsFromOtherDates() {
      return this.selectableSlots
        .filter(slot => !utils.equalDate(slot.time, this.date))
        .sort(slotCompareFn);
    }
  },
  methods: {
    toggle(slot) {
      if (this.selectedSlots.length < this.maxSelect || slot.selected) {
        slot.selected = !slot.selected;
        this.selectedSlots = this.selectableSlots.filter(slot => slot.selected);
      } else {
        this.hightlightHint = true;
        setTimeout(() => {
          this.hightlightHint = false;
        }, 1000);

        return;
      }

      this.$emit("input", this.selectedSlots);
    },
    isDisabled(slot) {
      // only disable slots that have not been selected
      // otherwise deselection won't be possible
      return this.selectedSlots.length >= this.maxSelect && !slot.selected;
    }
  }
};

/**
 * ascending date comparator
 *
 * @param {object} a - an slot object {time, selected}
 * @param {object} b - an slot object {time, selected}
 * @returns {int} - -1 if a.time < b.time; 1 if a.time > b.time; otherwise 0
 */
function slotCompareFn(a, b) {
  return a.compare(b);
}
</script>

<style lang="stylus" scoped>
.slot-picker .v-card__text
  padding: 8px 0 0

@media (min-width: 960px)
  .slot-picker
    min-height: calc(100% - 24px - 1.15em)

  .slot-picker >>> .v-subheader, .slot-picker >>> .v-list__tile
    padding: 0 24px
</style>
