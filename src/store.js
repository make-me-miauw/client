import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allFoods: [],
    allCats: [],
    roomWhoPlay: [],
  },
  mutations: {
    setRoom(state, payload) {
      // eslint-disable-next-line semi
      // eslint-disable-next-line no-param-reassign
      state.roomWhoPlay = payload;
    },
  },
  actions: {

  },
});
