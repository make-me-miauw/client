import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
<<<<<<< 374f80de9780ee3ca3328382d0bbbd3377904740
  routes: [],
=======
  routes: [{
    path: '/play',
    name: 'play',
    component: () => import(/* webpackChunkName "play" */'@/components/randomFoods.vue'),
  }],
>>>>>>> added router play
});
