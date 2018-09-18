<template>
  <v-app>
    <v-content>
      <v-stepper :value="currentStep">
        <v-stepper-header>
          <v-stepper-step
            :complete="currentStep > 1"
            step="1">Information</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <as-information-step />
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

import AsInformationStep from "./components/InformationStep";

export default {
  name: "eMedAppts",
  components: {
    AsInformationStep
  },
  computed: mapState({
    currentStep: state => state.currentStep
  })
};
</script>
