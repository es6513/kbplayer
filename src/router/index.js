import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import store from "@/store";
import { podcastEndPointMap } from "@/config/podcastEndPoint";

Vue.use(VueRouter);

const podcastRouteGuard = {
  beforeEnter: (to, from, next) => {
    const isPodcastDataExist = store.state.podcast.feedData !== null;
    if (!isPodcastDataExist) {
      store.dispatch("podcast/fetchAndParsePodcastFeed", {
        endPoint: podcastEndPointMap.kkbox,
      });
    }
    next();
  },
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    ...podcastRouteGuard,
  },
  {
    path: "/episode/:id",
    name: "Episode",
    component: () =>
      import(/* webpackChunkName: "episode" */ "../views/Episode.vue"),
    ...podcastRouteGuard,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
