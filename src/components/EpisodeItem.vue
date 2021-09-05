<template>
  <div class="episode-item">
    <div class="episode-item-image">
      <img :src="imageUrl" />
    </div>
    <div class="episode-item-info">
      <div class="episode-item-title">{{ title }}</div>
      <div class="episode-item-date">{{ publishDate }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "EpisodeItem",
  props: {
    imageUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    publishDate: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang="scss">
@import "@/scss/variable.scss";

.episode-item {
  display: flex;
  background-color: $white;
  color: $black;
  padding: 2.5 * $base-element-space;
  cursor: pointer;
  border-radius: $base-element-space;

  &-image {
    width: 80px;
    box-shadow: 3px 3px 4px 2px $gray-100;
  }

  &-image > img {
    width: 100%;
    height: 100%;
    vertical-align: bottom;
  }

  &-info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 4 * $base-element-space;
  }
}
</style>
