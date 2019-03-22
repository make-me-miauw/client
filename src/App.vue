<template>
  <div id="app">
    <Room/>
    <Login/>
    <router-view/>
  </div>
</template>

<style>

</style>

<script>
import Room from '@/components/Room.vue';
import Login from '@/views/loginform.vue';
import db from '@/api/firebase.js';

export default {
  components: {
    Room,
    Login,
  },
  beforeMount() {
    db.collection('foods').get()
      .then((foods) => {
        foods.forEach((doc) => {
          this.$store.state.allFoods.push(doc.data());
        });
        console.log(this.$store.state.allFoods);
      }, (err) => {
        console.log(err);
      })
      .catch((err) => {
        console.log(err);
      }),
    db.collection('cats').get()
      .then((cats) => {
        cats.forEach((doc) => {
          this.$store.state.allCats.push(doc.data());
          console.log(this.$store.state.allCats);
        });
      }, (err) => {
        console.log(err);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
