<template>
  <div>
    <router-view/>
  </div>
</template>

<style>
</style>

<script>
import Room from "@/components/Room.vue";
import db from "@/api/firebase.js";

export default {
  components: {
    Room,
  },
  beforeMount() {
    db
      .collection("foods")
      .get()
      .then(
        foods => {
          foods.forEach(doc => {
            this.$store.state.allFoods.push(doc.data());
          });
          console.log(this.$store.state.allFoods);
        },
        err => {
          console.log(err);
        }
      )
      .catch(err => {
        console.log(err);
      }),
      db
        .collection("cats")
        .get()
        .then(
          cats => {
            cats.forEach(doc => {
              this.$store.state.allCats.push(doc.data());
              console.log(this.$store.state.allCats);
            });
          },
          err => {
            console.log(err);
          }
        )
        .catch(err => {
          console.log(err);
        });
  }
};
</script>
