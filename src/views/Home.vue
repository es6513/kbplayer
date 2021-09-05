<template>
  <div class="home">
    <summary-header :imageUrl="feedData.image.url" :title="feedData.title" />
    <div class="episode-list">
      <div
        v-for="episode in episodes"
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
  </div>
</template>

<script>
import SummaryHeader from "@/components/SummaryHeader";
import EpisodeItem from "@/components/EpisodeItem";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "Home",
  components: { SummaryHeader, EpisodeItem },
  computed: {
    ...mapState("podcast", {
      feedData: (state) => state.feedData,
    }),
    ...mapGetters("podcast", {
      episodes: "episodes",
    }),
  },
  methods: {
    ...mapActions("podcast", ["selectEpisode"]),
    handleSelectEpisode(guid) {
      console.log(guid);
      this.selectEpisode({ guid });
      this.$router.push({ path: `/episode/${guid}` });
    },
    transformDateFromat(date) {
      const format = "ddd, DD MMM YYYY h:mm A";
      return this.dayjs(date).format(format);
    },
  },
  mounted() {
    console.log(this.feedData);
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
