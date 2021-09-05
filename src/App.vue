<template>
  <div id="app">
    <div v-if="isPodcastLoading">Loading</div>
    <div v-else>
      <header-bar />
      <router-view />
    </div>
  </div>
</template>

<script>
import HeaderBar from "@/components/Header";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    HeaderBar,
  },
  computed: {
    ...mapGetters("podcast", {
      isPodcastLoading: "isLoading",
    }),
  },
  methods: {
    ...mapActions("podcast", ["fetchAndParsePodcastFeed"]),
  },
  mounted() {
    this.fetchAndParsePodcastFeed({
      endPoint: "/api/podcasts/954689a5-3096-43a4-a80b-7810b219cef3/feed.xml",
    });
  },
};
</script>

<style lang="scss"></style>
