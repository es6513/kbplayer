<template>
  <div v-if="!isSelctedEpisodeNull" class="episode">
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
      <player
        ref="playerComponent"
        :audioList="audioList"
        :eventCallback="{
          handleCanplay,
          handlePlay,
          handlePause,
          handlePlayEnd,
        }"
        :isLoop="isLoop"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import SummaryHeader from "@/components/SummaryHeader";
import Player from "@/components/AudioPlayer";

export default {
  name: "Episode",
  data() {
    return {
      isPlaying: false,
      isAudioSourceLoading: false,
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
    isDataExist() {
      const episodeId = this.$route.params.id;
      const isDataExistById = this.episodes.find(
        (episode) => episode.guid === episodeId
      );
      return isDataExistById !== undefined;
    },
    audioList() {
      const audioSource = this.selectedEpisode.enclosure.url;
      return [{ url: audioSource }];
    },
    isLoop() {
      return this.isFirstTimeEnter && !this.isSelctedEpisodeLast;
    },
  },
  methods: {
    ...mapActions("podcast", ["selectEpisode"]),
    handlePlayEnd() {
      this.changeToNextEpisode();
      if (this.isFirstTimeEnter) this.isFirstTimeEnter = false;
    },
    handleWaiting() {
      this.isAudioSourceLoading = true;
    },
    handlePlay() {
      this.isPlaying = true;
    },
    handlePause() {
      this.isPlaying = false;
    },
    handleCanplay() {
      this.isAudioSourceLoading = false;
      if (!this.isFirstTimeEnter) {
        this.audioPlayer.play();
      }
    },
    selectEpisodeByRouteParam(guid) {
      this.selectEpisode({ guid });
    },
    togglePlayPodcast() {
      const isEpisodePlaying = this.audioPlayer.isPlaying;
      if (isEpisodePlaying) {
        this.audioPlayer.pause();
      } else {
        this.audioPlayer.play();
      }
    },
    changeToNextEpisode() {
      if (this.isSelctedEpisodeLast) return;
      const nextEpisode = this.episodes[this.selectedEpisodeIndex - 1];
      const { guid } = nextEpisode;
      this.$router.push({ path: `/episode/${guid}` });
      this.selectEpisode({ guid });
    },
    initFlow() {
      if (!this.isDataExist) {
        alert("This Episode does not exist ! Will redirect to home page");
        this.$router.push({ path: "/" });
        return;
      }
      if (this.isSelctedEpisodeNull) {
        this.selectEpisodeByRouteParam(this.$route.params.id);
      }
    },
  },
  created() {
    this.initFlow();
  },
};
</script>

<style lang="scss">
@import "@/scss/variable.scss";

.episode {
  position: relative;
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
    padding-bottom: 10 * $base-element-space;
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
    width: 100%;
    position: absolute;
    bottom: 0;
  }

  &-player-loading {
    position: absolute;
    top: 50%;
    right: -4 * $base-element-space;
    transform: translateY(-50%);
  }
}
</style>
