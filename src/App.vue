<template>
  <div id="app">
    <loading-overlay :isLoading="isGlobalLoading" />
    <template v-if="!isGlobalLoading">
      <header-bar />
      <router-view />
      <div v-if="playingEpisode" class="episode-player">
        <player
          class="episode-player-controll"
          ref="playerComponent"
          :playerTitle="playingEpisode.title"
          :audioList="audioList"
          :eventCallback="{
            handlePlay,
            handlePause,
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
import { mapState, mapGetters } from "vuex";
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
    }),
    ...mapGetters("system", {
      isGlobalLoading: "isLoading",
    }),
    ...mapGetters("podcast", {
      isPlayingEpisodeLast: "isPlayingEpisodeLast",
    }),
    childPlayer() {
      return this.$refs.playerComponent;
    },
    audioPlayer() {
      return this.childPlayer.$refs.audioPlayer;
    },
    audioList() {
      const audioSource = this.selectedEpisode.enclosure.url;
      return [{ url: audioSource }];
    },
  },

  methods: {
    handlePlayEnd() {
      this.changeToNextEpisode();
      if (this.isFirstTimeEnter) this.isFirstTimeEnter = false;
    },
    handlePlay() {
      this.isPlaying = true;
    },
    handlePause() {
      this.isPlaying = false;
    },
  },
};
</script>

<style lang="scss"></style>
