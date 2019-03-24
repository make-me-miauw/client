<template>
  <div class="homeScreen" :style="`background-image:url(https://i.pinimg.com/originals/05/fa/3a/05fa3a162088bfb3ec94dc37b441656b.jpg)`">
    <div class="homeScreenTitle">
    </div>
    <div class="homeScreenOptions">
      <div class="homeScreenOption" >
          Create Room
      </div>

      <!-- <div class="homeScreenOption" >
          Join Room
      </div> -->

    </div>
  </div>
</template>
<script>
export default {
  name: 'loginform',
};

</script>

<style scoped>
  .homeScreen {
    height: 100vh;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed!important;
    overflow:hidden;
    text-align: center;
  }
  .homeScreenTitle {
    margin-top: 75px;
  }
  .homeScreenOptions {
    margin: 45px auto 0 auto;
    width: 30%;
    cursor: pointer;
  }
  .homeScreenOption {
    border: 2px solid #92ced6;
    border-radius: 50%;
    background-color: antiquewhite;
    color: #92ced6;
    padding: 10px;
    font-size: 18px;
    font-weight: 800;
    text-transform: uppercase;
    margin: 25px;
  }
</style>
