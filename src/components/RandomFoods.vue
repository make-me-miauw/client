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
        <div class="col-sm-4 d-flex justify-content-center">
          <h1 class="score">{{score1}}</h1>
        </div>
        <div class="col-sm-4 d-flex justify-content-center">
          <button class="btn btn-warning" v-if="startButton" @click="getRandom">START GAME</button>
        </div>
        <div class="col-sm-4 d-flex justify-content-center">
          <h1 class="score">{{score2}}</h1>
        </div>
      </div>
    </div>
    <div class="imagesFooter col-sm-12" v-if="start">
      <div class="container d-flex justify-content-around">
        <div class="row" v-for="(random,index) in randomImages" :key="index">
          <div class="col" v-if="images[index]">
            <img
              @click="selectImage(random.point, index)"
              :src="random.link"
              height="220px"
              width="250px"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
button {
  padding: 30px;
  font-size: 24px;
}
.imagesFooter {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
}

.score {
  font-family: 'Permanent Marker', cursive;
  font-size: 80px;
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
      startButton: false,
      score1: 0,
      score2: 0,
      click: 0,
      images: [true, true, true, true, true, true, true, true]
    };
  },
  mounted() {
    this.allFoodImage = this.$store.state.allFoods;
    this.catImage = this.$store.state.allCats;
    console.log(this.$store.state.roomWhoPlay, "ini room who play");
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
      this.click += 1;
      if (this.click % 2 == 0) {
        this.score2 += point;
        if (this.score2 <= 0) {
          this.score2 = 0;
        } else if (this.score2 >= 100) {
          this.score2 = 100;
          Swal.fire({
            title: "Player 2 win the game.",
            width: 600,
            padding: "3em",
            background: "#fff url(https://images.pexels.com/photos/949592/pexels-photo-949592.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)",
            backdrop: `
            rgba(0,0,123,0.4)
            url("https://thumbs.gfycat.com/RadiantJoyousGrayling-max-1mb.gif")
            center left
            no-repeat
          `
          });
        }
      } else {
        this.score1 += point;
        if (this.score1 <= 0) {
          this.score1 = 0;
        } else if (this.score1 >= 100) {
          this.score1 = 100;
          Swal.fire({
            title: "Player 1 win the game",
            width: 600,
            padding: "3em",
            background: "#fff url(https://66.media.tumblr.com/b832028c117cb548614cbea10f0153dc/tumblr_mudg73OFlK1rgpyeqo1_500.gif)",
            backdrop: `
            rgba(0,0,123,0.4)
            url("https://images.pexels.com/photos/949592/pexels-photo-949592.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
            center left
            no-repeat
          `
          });
        }
      }
      this.images[index] = false;
      console.log(point);
    }
  }
};
</script>
