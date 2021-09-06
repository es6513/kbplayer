<template>
  <div class="scroll-top-control" @click="scrollto"></div>
</template>

<script>
export default {
  name: "ScrollToTop",
  methods: {
    scrollto() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/variable.scss";
.scroll-top-control {
  position: fixed;
  right: 2 * $base-element-space;
  bottom: 8 * $base-element-space;
  width: 4 * $base-element-space;
  height: 4 * $base-element-space;
  background: $white;
  border: solid $gray-200 1px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    border-color: $white;

    &::before {
      border-left-color: $theme-color;
      border-top-color: $theme-color;
    }

    &::after {
      border-left-color: $theme-color;
    }
  }

  &::before {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    border-left: 2px solid $gray-300;
    border-top: 2px solid $gray-300;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    content: "";
    position: absolute;
    height: 14px;
    border-left: 2px solid $gray-300;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
