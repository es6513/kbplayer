<template lang="">
  <audio
    ref="audioPlayer"
    controls
    preload="auto"
    :src="audioSource"
    @canplay="eventCallback.handleCanplay"
    @pause="eventCallback.handlePause"
    @play="eventCallback.handlePlay"
    @ended="eventCallback.handlePlayEnd"
  />
</template>
<script>
export default {
  props: {
    audioSource: {
      type: String,
      required: true,
    },
    eventCallback: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
<style lang="scss" scoped>
audio {
  width: 100%;
}
</style>
