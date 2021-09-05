<template>
  <div id="app">
    <header-bar />
    <router-view />
  </div>
</template>

<script>
import HeaderBar from "@/components/Header";

export default {
  name: "App",
  components: {
    HeaderBar,
  },
};
</script>

<style lang="scss"></style>
