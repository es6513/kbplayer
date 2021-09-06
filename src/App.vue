<template>
  <div id="app">
    <loading-overlay :isLoading="isPodcastLoading" />
    <template v-if="!isPodcastLoading">
      <header-bar />
      <router-view />
    </template>
  </div>
</template>

<script>
import HeaderBar from "@/components/Header";
import LoadingOverlay from "@/components/LoadingOverlay";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    HeaderBar,
    LoadingOverlay,
  },
  computed: {
    ...mapGetters("podcast", {
      isPodcastLoading: "isLoading",
    }),
  },
  methods: {
    ...mapActions("podcast", ["fetchAndParsePodcastFeed"]),
    initFlow() {
      this.fetchAndParsePodcastFeed({
        endPoint: "/api/podcasts/954689a5-3096-43a4-a80b-7810b219cef3/feed.xml",
      });
    },
  },
  created() {
    this.initFlow();
  },
};
</script>

<style lang="scss"></style>
