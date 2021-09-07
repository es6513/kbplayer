<template>
  <div class="home">
    <summary-header :imageUrl="feedData.image.url" :title="feedData.title" />
    <div class="episode-list">
      <div
        v-for="episode in filterdEpisodes"
        :key="episode.guid"
        @click="handleSelectEpisode(episode.guid)"
      >
        <episode-item
          :imageUrl="episode.itunes.image"
          :title="episode.title"
          :publishDate="transformDateFromat(episode.pubDate)"
        />
      </div>
    </div>
    <scroll-top-control />
  </div>
</template>

<script>
import SummaryHeader from "@/components/SummaryHeader";
import EpisodeItem from "@/components/EpisodeItem";
import ScrollTopControl from "@/components/ScrollTopControl";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      episodeLimit: 10,
      episodeExtraNumber: 10,
      scroll: null,
    };
  },
  components: {
    SummaryHeader,
    EpisodeItem,
    ScrollTopControl,
  },
  computed: {
    ...mapState("podcast", {
      feedData: (state) => state.feedData,
    }),
    ...mapGetters("podcast", {
      episodes: "episodes",
    }),
    filterdEpisodes() {
      return this.episodes.slice(0, this.episodeLimit);
    },
  },
  methods: {
    ...mapActions("podcast", ["selectEpisode"]),
    handleSelectEpisode(guid) {
      this.selectEpisode({ guid });
      this.$router.push({ path: `/episode/${guid}` });
    },
    transformDateFromat(date) {
      const format = "ddd, DD MMM YYYY h:mm A";
      return this.dayjs(date).format(format);
    },
    handleScroll() {
      const isPageBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight;
      if (isPageBottom) {
        this.episodeLimit += this.episodeExtraNumber;
      }
    },
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="scss">
@import "@/scss/variable.scss";

.home {
  .episode-list {
    margin-top: 8 * $base-element-space;
  }

  .episode-list > div:not(:first-child) {
    margin-top: 4 * $base-element-space;
  }
}
</style>
