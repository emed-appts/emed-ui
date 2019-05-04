<template>
  <div>
    <h2 class="headline mb-4">Was ist der Grund für den Termin?</h2>
    <v-card color="elevation-3">
      <as-loading :show="loading">
        <v-list three-line v-if="calendars.length">
          <template v-for="(calendar, index) in calendars">
            <v-list-tile :key="index" ripple @click="selectCalendar(calendar)">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ calendar.title }}&nbsp;
                  <small class="d-inline-block" v-if="calendar.subtitle">
                    {{ calendar.subtitle }}
                  </small>
                </v-list-tile-title>
                <v-list-tile-sub-title
                  v-if="calendar.description"
                  class="text--primary"
                  v-html="calendar.description"
                />
              </v-list-tile-content>
            </v-list-tile>
            <v-divider
              v-if="index + 1 < calendars.length"
              :key="`divider-${index}`"
            />
          </template>
        </v-list>
      </as-loading>
    </v-card>
    <v-btn class="ml-0 mt-4" @click="goPreviousStep">Zurück</v-btn>
    <v-btn class="mr-0 mt-4 right" color="error" @click="resetProcess">
      Abbrechen
    </v-btn>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { GET_ALL_CALENDARS } from "@/plugins/vuex/action-types";
import {
  GO_NEXT_STEP,
  GO_PREV_STEP,
  SET_CALENDAR,
  RESET
} from "@/plugins/vuex/mutation-types";

export default {
  data: () => ({
    loading: false
  }),
  computed: mapGetters(["calendars"]),
  methods: {
    ...mapActions({
      loadCalendars: GET_ALL_CALENDARS
    }),
    ...mapMutations({
      goNextStep: GO_NEXT_STEP,
      goPreviousStep: GO_PREV_STEP,
      setCalendar: SET_CALENDAR,
      resetProcess: RESET
    }),
    selectCalendar(calendar) {
      this.setCalendar(calendar);
      this.goNextStep();
    }
  },
  async mounted() {
    this.loading = true;
    try {
      await this.loadCalendars();
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style lang="stylus" scoped>
.v-list--three-line >>> .v-list__tile
  min-height: 88px
  height: auto
  padding: 8px 16px

.v-list__tile__title
  white-space: normal
  height: auto

.v-list__tile__sub-title p
  margin: 0
</style>
