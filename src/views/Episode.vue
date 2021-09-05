<template>
  <div class="episode">
    <div class="episode-header">
      <summary-header
        :imageUrl="selectedEpisode.itunes.image"
        :title="selectedEpisode.title"
      />
      <div class="episode-play" @click="togglePlayPodcast">
        {{ isPlaying ? "Pause" : "Play" }}
      </div>
    </div>
    <div class="episode-body">
      <div class="episode-body-title">Episode Description</div>
      <div class="episode-body-desc">{{ selectedEpisode.content }}</div>
    </div>
    <div class="episode-player">
      <Player
        ref="playerComponent"
        :audioSource="selectedEpisode.enclosure.url"
        :eventCallback="{
          handleCanplay,
          handlePause,
          handlePlay,
          handlePlayEnd,
        }"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import SummaryHeader from "@/components/SummaryHeader";
import Player from "@/components/Player";

export default {
  name: "Episode",
  data() {
    return {
      isPlaying: false,
      isFirstTimeEnter: true,
    };
  },
  components: {
    SummaryHeader,
    Player,
  },
  computed: {
    ...mapState("podcast", {
      selectedEpisode: (state) => state.selectedEpisode,
    }),
    ...mapGetters("podcast", {
      episodes: "episodes",
      isSelctedEpisodeNull: "isSelctedEpisodeNull",
      selectedEpisodeIndex: "selectedEpisodeIndex",
      isSelctedEpisodeLast: "isSelctedEpisodeLast",
    }),
    childPlayer() {
      return this.$refs.playerComponent;
    },
    audioPlayer() {
      return this.childPlayer.$refs.audioPlayer;
    },
  },
  methods: {
    ...mapActions("podcast", ["selectEpisode"]),
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
    handleCanplay() {
      if (!this.isFirstTimeEnter) {
        this.audioPlayer.play();
      }
    },
    selectEpisodeByRouteParam(guid) {
      this.selectEpisode({ guid });
    },
    togglePlayPodcast() {
      const isEpisodePaused = this.audioPlayer.paused;
      if (isEpisodePaused) {
        this.audioPlayer.play();
      } else {
        this.audioPlayer.pause();
      }
    },
    changeToNextEpisode() {
      if (this.isSelctedEpisodeLast) return;
      const nextEpisode = this.episodes[this.selectedEpisodeIndex - 1];
      const { guid } = nextEpisode;
      this.$router.replace({ path: `/episode/${guid}` });
      this.selectEpisode({ guid });
    },
  },
  created() {
    if (this.isSelctedEpisodeNull) {
      this.selectEpisodeByRouteParam(this.$route.params.id);
    }
  },
};
</script>

<style lang="scss">
@import "@/scss/variable.scss";

.episode {
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  &-play {
    min-width: 80px;
    text-align: center;
    font-size: 2 * $base-font-size;
    padding: $base-element-space;
    border: solid 1px $white;
    cursor: pointer;
  }

  &-body {
    margin-top: 4 * $base-element-space;
  }

  &-body-title {
    font-size: 2 * $base-font-size;
  }

  &-body-desc {
    margin-top: 4 * $base-element-space;
    line-height: 2 * $base-element-space;
    white-space: pre-wrap;
  }
  &-player {
    width: 85%;
    position: fixed;
    bottom: 0;
  }
}
</style>
