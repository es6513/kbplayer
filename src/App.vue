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
import { mapGetters } from "vuex";

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
};
</script>

<style lang="scss"></style>
