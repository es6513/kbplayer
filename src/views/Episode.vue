<template>
  <div v-if="!isSelectedEpisodeNull" class="episode">
    <div class="episode-info">
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
    </div>
    <!-- <div class="episode-player">
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
    </div> -->
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import SummaryHeader from "@/components/SummaryHeader";
// import Player from "@/components/AudioPlayer";

export default {
  name: "Episode",
  beforeRouteEnter(to, from, next) {
    // ...
    next();
  },
  data() {
    return {
      isPlaying: false,
      isFirstTimeEnter: true,
    };
  },
  components: {
    SummaryHeader,
    // Player,
  },
  computed: {
    ...mapState("podcast", {
      selectedEpisode: (state) => state.selectedEpisode,
    }),
    ...mapGetters("podcast", {
      episodes: "episodes",
      isSelectedEpisodeNull: "isSelectedEpisodeNull",
      selectedEpisodeIndex: "selectedEpisodeIndex",
      isSelectedEpisodeLast: "isSelectedEpisodeLast",
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
      if (this.isSelectedEpisodeLast) return;
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
      if (this.isSelectedEpisodeNull) {
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

  &-info {
    padding-bottom: 15 * $base-element-space;
  }
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
    width: 100%;
    background-color: $deep-green;
    padding: $base-element-space;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  &-player-controll {
    width: 90%;
    margin: 0 auto;
  }

  &-player-loading {
    position: absolute;
    top: 50%;
    right: -4 * $base-element-space;
    transform: translateY(-50%);
  }
}
</style>
