<template>
  <div>
    <h2 class="headline mb-4">
      Eine letzte Überprüfung Ihrer Daten zur Reservierung
    </h2>
    <p class="body-1 mb-4">Sollten Sie bla Info</p>
    <v-container fluid grid-list-xl>
      <v-layout row wrap>
        <v-flex v-for="(patient, index) in patients" :key="index" xs12 sm6 md4>
          <v-card>
            <v-card-title>
              <div class="headline">
                {{ patient.slots[0].time | moment("DD.MM. HH:mm") }}
              </div>
            </v-card-title>
            <v-divider />
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>Termintyp:</v-list-tile-content>
                <v-list-tile-content class="align-end">
                  {{ patient.slots[0].calendar.title }}
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Name:</v-list-tile-content>
                <v-list-tile-content class="align-end">
                  {{ patient.firstName }} {{ patient.lastName }}
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Email:</v-list-tile-content>
                <v-list-tile-content class="align-end">
                  {{ patient.email }}
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Telefon:</v-list-tile-content>
                <v-list-tile-content class="align-end">
                  {{ patient.phoneNumber }}
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>SVNR:</v-list-tile-content>
                <v-list-tile-content class="align-end">
                  {{ patient.insuranceNumber }}
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Geburtstag:</v-list-tile-content>
                <v-list-tile-content class="align-end">
                  {{ patient.birthday | moment("DD.MM.YYYY") }}
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-divider />
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="secondary"
                flat
                @click="editPatient(index, patient)"
              >
                Bearbeiten
              </v-btn>
              <v-btn
                color="secondary"
                flat
                @click="deleteSlot(patient.slots[0])"
              >
                Löschen
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-form v-model="valid">
            <as-data-privacy-dialog>
              Datenschutzrichtlinien ansehen
            </as-data-privacy-dialog>
            <v-checkbox
              class="mt-1"
              v-model="acceptsPrivacyPolicy"
              label="Ich bin mit den Datenschutzrichtlinien einverstanden"
              :rules="acceptsPrivacyPolicyRules"
              ripple
              required
            />
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
    <v-btn class="ml-0 mt-4" @click="goToPreviousStep">Zurück</v-btn>
    <v-btn
      class="mt-4"
      color="primary"
      :disabled="!valid"
      @click="completeReservation"
    >
      Verbindlich reservieren
    </v-btn>
    <v-btn class="mr-0 mt-4 right" color="error" @click="resetProcess">
      Abbrechen
    </v-btn>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import AsDataPrivacyDialog from "./utils/DataPrivacyDialog";
import {
  GO_STEP,
  ENABLE_EDITMODE,
  REMOVE_SLOT,
  REMOVE_PATIENT,
  RESET
} from "@/plugins/vuex/mutation-types";

export default {
  components: {
    AsDataPrivacyDialog
  },
  data: () => ({
    valid: false,
    acceptsPrivacyPolicy: false,
    acceptsPrivacyPolicyRules: [
      v => !!v || "Datenschutzrichtlinien müssen zugestimmt werden"
    ]
  }),
  computed: mapGetters(["currentStep", "slots", "patients"]),
  methods: {
    ...mapMutations({
      goStep: GO_STEP,
      enableEditMode: ENABLE_EDITMODE,
      removeSlot: REMOVE_SLOT,
      removePatient: REMOVE_PATIENT,
      resetProcess: RESET
    }),
    goToPreviousStep() {
      const index = this.patients.length - 1;
      this.editPatient(index, this.patients[index]);
    },
    editPatient(index, patient) {
      this.enableEditMode();
      // go to step on which the patient form is shown
      this.goStep(this.currentStep - this.patients.length + index);
      // remove patient from state
      // otherwise duplicate insurance number
      this.removePatient(patient);
    },
    deleteSlot(slot) {
      this.removeSlot(slot);
      if (this.slots.length === 0) {
        // no slot is left so restart from beginning
        this.resetProcess();
      }
    },
    completeReservation() {
      for (let patient of this.patients) {
        patient.acceptsPrivacyPolicy = this.acceptsPrivacyPolicy;
      }
      // TODO: ajax request
    }
  }
};
</script>
