
<template>
  <svg :class="svgClass" aria-hidden="true" v-bind="$attrs">
    <use :href="iconName" />
  </svg>
</template>
<script>

export default {
  name: "SvgIcon",
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return "svg-icon " + this.className
      } else {
        return "svg-icon"
      }
    },
  },
}
</script>
<style scoped>
.svg-icon {
  width: 24px;
  height: 24px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  outline: none;
}
</style>