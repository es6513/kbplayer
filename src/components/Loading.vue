<template>
  <div class="loading">
    <img
      src="https://img.icons8.com/material-outlined/24/000000/spinner-frame-4.png"
    />
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(359deg);
  }
}
.loading {
  img {
    animation: spin 1s linear infinite;
  }
}
</style>
