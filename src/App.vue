<template>
  <div id="app">
    <loading-overlay :isLoading="isGlobalLoading" />
    <template v-if="!isGlobalLoading">
      <header-bar />
      <router-view />
      <div v-if="selectedEpisode" class="episode-player">
        <player
          class="episode-player-controll"
          ref="playerComponent"
          :playerTitle="selectedEpisode.title"
          :audioList="audioList"
          :eventCallback="{
            handlePlay,
            handlePause,
            handlePlayEnd,
          }"
          :isLoop="!isSelectedEpisodeLast"
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
    }),
    ...mapGetters("system", {
      isGlobalLoading: "isLoading",
    }),
    ...mapGetters("podcast", {
      isSelectedEpisodeLast: "isSelectedEpisodeLast",
    }),
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
