<template>
  <audio-player
    ref="audioPlayer"
    :audio-list="audioList.map((elm) => elm.url)"
    :theme-color="themeColor"
    :show-prev-button="showPrevBtn"
    :show-next-button="showNextBtn"
    :show-playback-rate="showPlaybackRate"
    :isLoop="isLoop"
    @pause="eventCallback.handlePause"
    @play="eventCallback.handlePlay"
    @ended="eventCallback.handlePlayEnd"
  />
</template>
<script>
import AudioPlayer from "@liripeng/vue-audio-player";
import "@liripeng/vue-audio-player/lib/vue-audio-player.css";

export default {
  props: {
    audioList: {
      type: Array,
      required: true,
    },
    themeColor: {
      type: String,
      default: "#000",
    },
    showPrevBtn: {
      type: Boolean,
      default: false,
    },
    showNextBtn: {
      type: Boolean,
      default: false,
    },
    showPlaybackRate: {
      type: Boolean,
      default: false,
    },
    isLoop: {
      type: Boolean,
      default: false,
    },
    eventCallback: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    AudioPlayer,
  },
};
</script>
<style lang="scss">
@import "@/scss/variable.scss";

.audio__time-wrap {
  > div {
    color: $black !important;
    font-size: $base-font-size !important;
  }
}
</style>
