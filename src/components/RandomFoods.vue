<template>
  <div>
    <div class="container col-sm-12 mt-5">
      <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-4 d-flex justify-content-center">
          <img :src="catImage[1].link">
        </div>
        <div class="col-sm-4"></div>
      </div>
    </div>
    <div class="container col-sm-12 mt-5">
      <div class="row">
        <div class="col-sm-4">
          {{score}}
        </div>
        <div class="col-sm-4 d-flex justify-content-center">
          <button class="btn btn-warning" v-if="startButton" @click="getRandom">START GAME</button>
        </div>
        <div class="col-sm-4"></div>
      </div>
    </div>
    <div class="imagesFooter col-sm-12" v-if="start">
      <div class="container d-flex justify-content-around">
        <div class="row" v-for="(random,index) in randomImages" :key="index">
          <div class="col" 
              v-if="'index+1'">
            <img
              @click="selectImage(random.point, index)"
              :src="random.link"
              height="170px"
              width="220px"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.imagesFooter {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
}
</style>

<script>
export default {
  name: "foods",
  data() {
    return {
      randomImages: [],
      allFoodImage: [],
      start: false,
      catImage: [],
      startButton: true,
      score: 0,
      '1': true,
      '2': true,
      '3': true,
      '4': true,
      '5': true,
      '6': true,
      '7': true,
      '8': true
    };
  },
  mounted() {
    this.allFoodImage = this.$store.state.allFoods;
    this.catImage = this.$store.state.allCats;
  },
  methods: {
    getRandom() {
      this.startButton = false;
      let array = this.shuffle(this.allFoodImage);
      for (let i = 0; i < array.length; i++) {
        if (i >= 8) {
          break;
        } else {
          this.randomImages.push(array[i]);
        }
      }
      this.start = true;
    },
    shuffle(array) {
      let i = array.length,
        j = 0,
        temp;

      while (i--) {
        j = Math.floor(Math.random() * (i + 1));

        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }

      return array;
    },
    selectImage(point, index) {
      this.score += point
      console.log(point);
      
      index = index + 1
      
      
    }
  }
};
</script>
