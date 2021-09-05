<template>
  <div id="app">
    <header-bar />
    <router-view />
  </div>
</template>

<script>
import HeaderBar from "@/components/Header";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    HeaderBar,
  },
  methods: {
    ...mapActions("podcast", ["getPodcastFeed"]),
  },
  mounted() {
    this.getPodcastFeed({
      endPoint: "/api/podcasts/954689a5-3096-43a4-a80b-7810b219cef3/feed.xml",
    });
  },
};
</script>

<style lang="scss"></style>
