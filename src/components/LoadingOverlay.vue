<template>
  <loading
    :active.sync="isLoading"
    :opacity="opactity"
    :loader="loader"
    :background-color="backgroundColor"
    :color="color"
  ></loading>
</template>
<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  props: {
    isLoading: {
      type: Boolean,
      require: true,
    },
    opactity: {
      type: Number,
      default: 0.2,
    },
    loader: {
      type: String,
      default: "dots",
    },
    backgroundColor: {
      type: String,
      default: "#757575",
    },
    color: {
      type: String,
      default: "#fff",
    },
  },
  components: {
    Loading,
  },
};
</script>
