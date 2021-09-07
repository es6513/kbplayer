<template>
  <div id="app">
    <loading-overlay :isLoading="isGlobalLoading" />
    <template v-if="!isGlobalLoading">
      <header-bar />
      <router-view />
    </template>
  </div>
</template>

<script>
import HeaderBar from "@/components/Header";
import LoadingOverlay from "@/components/LoadingOverlay";
import { mapActions, mapGetters } from "vuex";
import { podcastEndPointMap } from "@/config/podcastEndPoint";

export default {
  name: "App",
  components: {
    HeaderBar,
    LoadingOverlay,
  },
  computed: {
    ...mapGetters("system", {
      isGlobalLoading: "isLoading",
    }),
  },
  methods: {
    ...mapActions("podcast", ["fetchAndParsePodcastFeed"]),
    initFlow() {
      this.fetchAndParsePodcastFeed({
        endPoint: podcastEndPointMap.kkbox,
      });
    },
  },
  created() {
    this.initFlow();
  },
};
</script>

<style lang="scss"></style>
