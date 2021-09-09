<template>
  <div id="app">
    <loading-overlay :isLoading="isGlobalLoading" />
    <template v-if="!isGlobalLoading">
      <header-bar />
      <router-view />
      <div v-if="!isPlayingEpisodeNull" class="audio-player">
        <player
          ref="playerComponent"
          :playerTitle="playingEpisode.title"
          :audioList="audioList"
          :eventCallback="{
            handlePlayEnd,
          }"
          :isLoop="!isPlayingEpisodeLast"
        />
      </div>
    </template>
  </div>
</template>

<script>
import HeaderBar from "@/components/Header";
import LoadingOverlay from "@/components/LoadingOverlay";
import { mapActions, mapState, mapGetters } from "vuex";
import Player from "@/components/AudioPlayer";

export default {
  name: "App",
  components: {
    HeaderBar,
    LoadingOverlay,
    Player,
  },
  computed: {
    ...mapState("podcast", {
      selectedEpisode: (state) => state.selectedEpisode,
      playingEpisode: (state) => state.playingEpisode,
      isAudioPlaying: (state) => state.isAudioPlaying,
    }),
    ...mapGetters("system", {
      isGlobalLoading: "isLoading",
    }),
    ...mapGetters("podcast", {
      episodes: "episodes",
      isPlayingEpisodeNull: "isPlayingEpisodeNull",
      isPlayingEpisodeLast: "isPlayingEpisodeLast",
      playingEpisodeIndex: "playingEpisodeIndex",
    }),
    childPlayer() {
      return this.$refs.playerComponent;
    },
    audioPlayer() {
      return this.childPlayer.$refs.audioPlayer;
    },
    audioList() {
      const audioSource = this.playingEpisode.enclosure.url;
      return [{ url: audioSource }];
    },
  },
  watch: {
    playingEpisode() {
      this.$nextTick(() => {
        this.audioPlayer.play();
      });
    },
  },
  methods: {
    ...mapActions("podcast", ["setPlayingEpisode"]),
    handlePlayEnd() {
      this.changeToNextEpisode();
    },
    changeToNextEpisode() {
      if (this.isPlayingEpisodeLast) return;
      const nextEpisode = this.episodes[this.playingEpisodeIndex - 1];
      const { guid } = nextEpisode;
      this.setPlayingEpisode({ guid });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/variable.scss";

.audio-player {
  width: 100%;
  background-color: $deep-green;
  padding: $base-element-space;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>
