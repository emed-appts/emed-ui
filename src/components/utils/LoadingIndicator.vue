<template>
  <div
    :class="{ active: show }"
    class="loading__wrapper">
    <slot />
    <div class="loading__overlay">
      <v-progress-circular
        v-if="show"
        :size="90"
        :width="3"
        indeterminate
        color="secondary"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="stylus">
.loading__wrapper
  position: relative

.loading__wrapper.active
  min-height: 150px

.loading__wrapper .loading__overlay
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: -1

.loading__wrapper.active .loading__overlay
  background-color: rgba(240, 240, 240, .589)
  z-index: 1

.loading__overlay .v-progress-circular
  left: calc(50% - 45px)
  top: calc(50% - 45px)
</style>
