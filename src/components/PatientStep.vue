<template>
  <div>
    <h2 class="headline mb-4">
      Wir benötigen noch ein paar Angaben
      <small class="d-inline-block mt-2">für den Termin am {{ slot.time | moment('DD.MM.YYYY [um] HH:mm') }}</small>
    </h2>
    <v-form
      ref="form"
      v-model="valid">
      <v-container
        fluid
        grid-list-xl>
        <v-layout
          row
          wrap>
          <v-flex
            xs12
            sm5>
            <v-text-field
              v-model="patient.firstName"
              :rules="firstNameRules"
              label="Vorname"
              required
              autofocus
              validate-on-blur />
          </v-flex>
          <v-flex
            xs12
            sm7>
            <v-text-field
              v-model="patient.lastName"
              :rules="lastNameRules"
              label="Nachname"
              required
              validate-on-blur />
          </v-flex>
          <v-flex
            xs12
            sm5>
            <v-text-field
              v-model="patient.insuranceNumber"
              :rules="insuranceNumberRules"
              label="SVNr"
              placeholder="0000 DDMMYYYY"
              hint="10-stellige SVNr"
              mask="#### ######"
              persistent-hint
              required
              validate-on-blur />
          </v-flex>
          <v-flex
            xs12
            sm7>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px">
              <v-text-field
                slot="activator"
                v-model="patient.birthday"
                :rules="birthdayRules"
                :readonly="$vuetify.breakpoint.smAndDown"
                label="Geburtsdatum"
                placeholder="DD.MM.YYYY"
                append-icon="event"
                required
                validate-on-blur
                @blur="birthday = parseDate(patient.birthday)" />
              <v-date-picker
                v-model="birthday"
                :max="new Date().toISOString().substr(0, 10)"
                locale="de-de"
                @input="patient.birthday = formatDate($event); $refs.menu.save($event)"
                no-title />
            </v-menu>
          </v-flex>
          <v-flex
            xs12
            sm5>
            <v-text-field
              v-model="patient.phoneNumber"
              :rules="phoneNumberRules"
              label="Telefonnummer"
              required
              validate-on-blur />
          </v-flex>
          <v-flex
            xs12
            sm7>
            <v-text-field
              v-model="patient.email"
              :rules="emailRules"
              label="Email"
              required
              validate-on-blur />
          </v-flex>
          <v-flex
            xs12>
            <as-data-privacy-dialog>Datenschutzrichtlinien ansehen</as-data-privacy-dialog>
            <v-checkbox
              v-model="patient.acceptsPrivacyPolicy"
              label="Ich bin mit den Datenschutzrichtlinien einverstanden"
              :rules="acceptsPrivacyPolicyRules"
              ripple />
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
    <v-btn
      class="ml-0 mt-4"
      @click="goPreviousStep">Zurück</v-btn>
    <v-btn
      :disabled="!valid"
      class="mt-4"
      color="primary"
      @click="goToNextStep">Weiter</v-btn>
  </div>
</template>

<script>
import SSNValidator from "ssn-aut-validator";
import { parse as parsePhone } from "libphonenumber-js";

import { mapGetters, mapMutations } from "vuex";
import AsDataPrivacyDialog from "./utils/DataPrivacyDialog";
import Slot from "@/models/slot";
import Patient from "@/models/patient";
import {
  GO_PREV_STEP,
  GO_NEXT_STEP,
  ADD_PATIENT
} from "@/plugins/vuex/mutation-types";

export default {
  components: {
    AsDataPrivacyDialog
  },
  props: {
    slot: {
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
      firstNameRules: [
        v => !!v || "Vorname ist ein Pflichtfeld",
        v =>
          /^[a-zA-Z]+(\s[a-zA-Z]+)?$/.test(v) ||
          "Vorname darf nur Buchstaben enthalten. Leerzeichen zwischen Namen sind erlaubt."
      ],
      lastNameRules: [
        v => !!v || "Nachname ist ein Pflichtfeld",
        v => /^[a-zA-Z]+$/.test(v) || "Nachname darf nur Buchstaben enthalten"
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
      birthdayRules: [
        v => !!v || "Geburtstag ist ein Pflichtfeld",
        v =>
          /^\d{1,2}\.\d{1,2}\.\d{4}$/.test(v) || "Geburtstag ist nicht gültig"
      ],
      emailRules: [
        v => !!v || "E-Mail ist ein Pflichtfeld",
        v =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "E-Mail ist nicht gültig"
      ],
      phoneNumberRules: [
        v => !!v || "Telefon ist ein Pflichtfeld",
        v =>
          (v && Object.keys(parsePhone(v, "AT")).length != 0) ||
          "Telefon ist nicht gültig"
      ],
      acceptsPrivacyPolicyRules: [
        v => !!v || "Datenschutzrichtlinien müssen zugestimmt werden"
      ]
    };
  },
  computed: mapGetters(["patients"]),
  methods: {
    ...mapMutations({
      goPreviousStep: GO_PREV_STEP,
      goNextStep: GO_NEXT_STEP,
      addPatient: ADD_PATIENT
    }),
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}.${month}.${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split(".");
      if (!day || !month || !year) return;

      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    goToNextStep() {
      this.patient.slots = [this.slot.time];
      this.addPatient(this.patient);
      this.goNextStep();
    }
  }
};
</script>
