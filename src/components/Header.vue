<template>
  <div class="header">
    <router-link to="/" class="header-home-icon">
      <img src="@/assets/home-page.png" />
    </router-link>
  </div>
</template>

<style lang="scss">
.header {
  position: relative;
  min-height: 80px;

  &-home-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
