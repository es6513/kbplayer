module.exports = {
  devServer: {
    proxy: {
      "/api/podcasts": {
        target: process.env.VUE_APP_PODCAST_URL,
        https: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
