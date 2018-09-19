<template>
  <v-layout
    class="empty-state"
    column
    align-center>
    <v-flex v-if="icon">
      <v-icon class="empty-state__icon">{{ icon }}</v-icon>
    </v-flex>
    <v-flex>
      <strong
        v-if="label"
        class="empty-state__label headline mb-2">{{ label }}</strong>
    </v-flex>
    <v-flex>
      <p
        v-if="description"
        class="empty-state__description subheading">{{ description }}</p>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: "event_busy"
    },
    label: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="stylus" scoped>
.empty-state__icon
  font-size: 130px

.empty-state__label
  font-weight: 500
</style>
