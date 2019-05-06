<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    @submit.prevent="goToNextStep"
  >
    <h2 class="headline mb-4">
      Wir benötigen noch ein paar Angaben zum Patienten
    </h2>
    <v-container fluid grid-list-xl>
      <v-layout row wrap justify-center>
        <v-flex xs12 sm8 md6 lg5 xl4>
          <v-card class="elevation-3">
            <v-card-title>
              <div class="subheading">
                Termin {{ desiredSlot.time | moment("DD.MM.YYYY HH:mm") }}
              </div>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-layout column>
                <v-flex class="py-1">
                  <v-text-field
                    ref="focus"
                    v-model="patient.firstName"
                    :rules="rules.firstName"
                    label="Vorname"
                    autofocus
                    required
                    validate-on-blur
                  />
                </v-flex>
                <v-flex class="py-1">
                  <v-text-field
                    v-model="patient.lastName"
                    :rules="rules.lastName"
                    label="Nachname"
                    required
                    validate-on-blur
                  />
                </v-flex>
                <v-flex class="py-1">
                  <v-text-field
                    v-model="patient.insuranceNumber"
                    :rules="rules.insuranceNumber"
                    label="SVNr"
                    placeholder="0000 DDMMYYYY"
                    hint="10-stellige SVNr"
                    mask="#### ######"
                    persistent-hint
                    required
                    validate-on-blur
                  />
                </v-flex>
                <v-flex class="py-1">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    min-width="290px"
                    lazy
                    offset-y
                    full-width
                  >
                    <v-text-field
                      ref="birthday"
                      slot="activator"
                      v-model="birthday"
                      :rules="rules.birthday"
                      :readonly="$vuetify.breakpoint.smAndDown"
                      label="Geburtsdatum"
                      placeholder="DD.MM.YYYY"
                      append-icon="mdi-calendar"
                      required
                      validate-on-blur
                      @blur="updateBirthday"
                    />
                    <v-date-picker
                      ref="picker"
                      v-model="patient.birthday"
                      :max="new Date().toISOString().substr(0, 10)"
                      locale="de-de"
                      @input="updateBirthdayField"
                    />
                  </v-menu>
                </v-flex>
                <v-flex class="py-1">
                  <v-text-field
                    v-model="patient.phoneNumber"
                    :rules="rules.phoneNumber"
                    label="Telefonnummer"
                    required
                    validate-on-blur
                  />
                </v-flex>
                <v-flex class="py-1">
                  <v-text-field
                    v-model="patient.email"
                    :rules="rules.email"
                    label="Email"
                    required
                    validate-on-blur
                  />
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-btn
      v-if="!editMode"
      class="ml-0 mt-4"
      :disabled="disabled"
      @click="goToPreviousStep"
    >
      Zurück
    </v-btn>
    <v-btn class="mt-4" type="submit" color="primary" :disabled="disabled">
      <template v-if="editMode">
        Speichern
      </template>
      <template v-else>
        Weiter
      </template>
    </v-btn>
    <v-btn
      class="mr-0 mt-4 right"
      color="error"
      :disabled="disabled"
      @click="resetProcess"
    >
      Abbrechen
    </v-btn>
  </v-form>
</template>

<script>
import SSNValidator from "ssn-aut-validator";
import { parse as parsePhone } from "libphonenumber-js";

import { mapGetters, mapMutations, mapState } from "vuex";
import Slot from "@/models/slot";
import Patient from "@/models/patient";
import {
  GO_STEP,
  GO_PREV_STEP,
  GO_NEXT_STEP,
  DISABLE_EDITMODE,
  ADD_PATIENT,
  RESET
} from "@/plugins/vuex/mutation-types";

export default {
  props: {
    disabled: {
      type: Boolean
    },
    desiredSlot: {
      type: Slot,
      required: true
    }
  },
  // IMPORTANT: we have to use "function() {}" here
  // otherwise we can't refer to `this` in the validation rules
  data: function() {
    return {
      valid: false,
      patient: new Patient(),
      // datepicker menu state
      menu: false,
      // temporary variable for datepicker
      birthday: null,
      rules: {
        firstName: [
          v => !!v || "Vorname ist ein Pflichtfeld",
          v =>
            /^[a-zA-ZäöüÄÖÜß]+(\s[a-zA-ZäöüÄÖÜß]+)?$/.test(v) ||
            "Vorname darf nur Buchstaben enthalten. Leerzeichen zwischen Namen sind erlaubt."
        ],
        lastName: [
          v => !!v || "Nachname ist ein Pflichtfeld",
          v =>
            /^[a-zA-ZäöüÄÖÜß]+$/.test(v) ||
            "Nachname darf nur Buchstaben enthalten"
        ],
        insuranceNumberRules: [
          v => !!v || "SVNr ist ein Pflichtfeld",
          v => (v && v.length === 10) || "SVNr muss 10-stellig sein",
          v => /^\d{10}$/.test(v) || "SVNr darf nur aus Ziffern bestehen",
          v => SSNValidator.validate(v) || "SVNr ist nicht gültig",
          v =>
            this.patients.findIndex(pat => pat.insuranceNumber === v) === -1 ||
            "SVNr wird bereits verwendet"
        ],
        birthday: [
          v => !!v || "Geburtstag ist ein Pflichtfeld",
          v =>
            /^\d{1,2}\.\d{1,2}\.\d{4}$/.test(v) || "Geburtstag ist nicht gültig"
        ],
        phoneNumber: [
          v => !!v || "Telefon ist ein Pflichtfeld",
          v =>
            (v && Object.keys(parsePhone(v, "AT")).length != 0) ||
            "Telefon ist nicht gültig"
        ],
        email: [
          v => !!v || "E-Mail ist ein Pflichtfeld",
          v =>
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              v
            ) || "E-Mail ist nicht gültig"
        ]
      }
    };
  },
  computed: {
    ...mapState({
      editMode: state => state.editMode
    }),
    ...mapGetters(["currentStep", "patients"])
  },
  methods: {
    ...mapMutations({
      goStep: GO_STEP,
      goPreviousStep: GO_PREV_STEP,
      goNextStep: GO_NEXT_STEP,
      disableEditMode: DISABLE_EDITMODE,
      addPatient: ADD_PATIENT,
      resetProcess: RESET
    }),
    updateBirthday(date) {
      this.patient.birthday = this.parseDate(date);
    },
    parseDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split(".");
      if (!day || !month || !year) return;

      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    updateBirthdayField(date) {
      this.birthday = this.formatDate(date);
      this.$refs.menu.save(this.birthday);
      this.$refs.birthday.validate(true, this.birthday);
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}.${month}.${year}`;
    },
    goToPreviousStep() {
      // reset data on going back
      this.$refs.form.reset();
      this.goPreviousStep();
    },
    goToNextStep() {
      if (!this.$refs.form.validate()) return;

      this.patient.slots = [this.desiredSlot];
      this.addPatient(this.patient);

      if (this.editMode) {
        this.disableEditMode();
        this.goPreviousStep();
      } else {
        this.goNextStep();
      }
    }
  },
  watch: {
    menu(val) {
      val &&
        requestAnimationFrame(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  mounted() {
    // IMPORTANT: needed for autofocus of first input field
    requestAnimationFrame(() => {
      this.$refs.focus.focus();
    });
  }
};
</script>
