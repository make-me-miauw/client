import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/play',
    name: 'play',
    component: () => import(/* webpackChunkName "play" */'@/components/randomFoods.vue'),
  }],
});
