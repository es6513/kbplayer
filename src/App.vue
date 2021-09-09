<template>
  <div id="app">
    <loading-overlay :isLoading="isGlobalLoading" />
    <template v-if="!isGlobalLoading">
      <header-bar />
      <router-view />

      <div v-if="!isPlayingEpisodeNull" class="episode-player">
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
      isPlayingEpisodeNull: "isPlayingEpisodeNull",
      isPlayingEpisodeLast: "isPlayingEpisodeLast",
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
    isAudioPlaying(value) {
      console.log(value);
      if (this.$refs.playerComponent) {
        if (value === true) this.audioPlayer.play();
        else this.audioPlayer.pause();
      } else {
        this.$nextTick(() => {
          if (value === true) this.audioPlayer.play();
          else this.audioPlayer.pause();
        });
      }
    },
  },
  methods: {
    ...mapActions("podcast", ["setPlayingState"]),
    handlePlayEnd() {
      this.changeToNextEpisode();
      if (this.isFirstTimeEnter) this.isFirstTimeEnter = false;
    },
    handlePlay() {
      console.log("ererer");
      this.handleSetPlayingState({ isAudioPlaying: true });
    },
    handlePause() {
      this.handleSetPlayingState({ isAudioPlaying: false });
    },
    handleSetPlayingState(payload) {
      console.log("payload:", payload);
      this.setPlayingState(payload);
    },
  },
};
</script>

<style lang="scss"></style>
