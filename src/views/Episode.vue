<template>
  <div v-if="!isSelectedEpisodeNull" class="episode">
    <div class="episode-info">
      <div class="episode-header">
        <summary-header
          :imageUrl="selectedEpisode.itunes.image"
          :title="selectedEpisode.title"
        />
        <div class="episode-play" @click="handleSetPlayingEpisode">
          {{ playBtnWord }}
        </div>
      </div>
      <div class="episode-body">
        <div class="episode-body-title">Episode Description</div>
        <div class="episode-body-desc">{{ selectedEpisode.content }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import SummaryHeader from "@/components/SummaryHeader";

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
  },
  computed: {
    ...mapState("podcast", {
      selectedEpisode: (state) => state.selectedEpisode,
      isAudioPlaying: (state) => state.isAudioPlaying,
    }),
    ...mapGetters("podcast", {
      episodes: "episodes",
      isSelectedEpisodeNull: "isSelectedEpisodeNull",
      isSelectedEpisodePlaying: "isSelectedEpisodePlaying",
    }),
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
    playBtnWord() {
      return this.isSelectedEpisodePlaying
        ? this.isAudioPlaying
          ? "Pasue"
          : "Play"
        : "Play";
    },
  },
  methods: {
    ...mapActions("podcast", [
      "selectEpisode",
      "setPlayingEpisode",
      "setPlayingState",
    ]),
    selectEpisodeByRouteParam(guid) {
      this.selectEpisode({ guid });
    },
    handleSetPlayingEpisode() {
      if (this.isSelectedEpisodePlaying) {
        if (this.isAudioPlaying) {
          console.log("hererere");
          this.handleSetPlayingState({ isAudioPlaying: false });
        } else this.handleSetPlayingState({ isAudioPlaying: true });
      } else {
        this.handleSetPlayingState({ isAudioPlaying: true });
      }

      if (this.isSelectedEpisodePlaying) return;
      const { guid } = this.selectedEpisode;
      this.setPlayingEpisode({ guid });
    },
    handleSetPlayingState(payload) {
      console.log("payload:", payload);
      this.setPlayingState(payload);
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
  mounted() {
    console.log(this.selectedEpisode);
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
