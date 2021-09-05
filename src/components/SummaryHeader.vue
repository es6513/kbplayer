<template>
  <div class="page-summary">
    <div class="page-summary-image">
      <img :src="imageUrl" />
    </div>
    <div class="page-summary-title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: "PageSummary",
  props: {
    imageUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      require: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/variable.scss";
.page-summary {
  display: flex;
  align-items: baseline;

  &-image {
    width: 150px;
  }

  &-image > img {
    width: 100%;
    height: 100%;
    vertical-align: bottom;
  }

  &-title {
    font-size: 2 * $base-font-size;
    margin-left: 4 * $base-element-space;
  }
}
</style>
