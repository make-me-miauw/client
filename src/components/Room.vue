<template>
  <div>
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#myModal"
    >Create Room</button>
    <div
      class="homeScreen"
      :style="`background-image:url(https://i.pinimg.com/originals/05/fa/3a/05fa3a162088bfb3ec94dc37b441656b.jpg)`"
    >
      <div class="homeScreenTitle"></div>
      <div class="homeScreenOptions">
        <div>
          <button
            type="button"
            class="btn homeScreenOption"
            data-toggle="modal"
            data-target="#myModal"
          >Create Room</button>
        </div>
      </div>
    </div>
    <div class="modal fade" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal body -->
          <div class="modal-body">
            <div class="add">
              <h2>Create Room</h2>
              <form v-on:submit.prevent="createRoom">
                <input v-model="name" placeholder="Room" class="form-control">
                <br>
                <br>
                <input type="submit" class="btn btn-success" value="Create">
              </form>
            </div>
          </div>
          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    <div class="baris">
      <div class="card" style="width: 18rem;">
        <div class="card-header">Choose Room</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item" v-for="item in rooms" v-bind:key="item.id">
            <card v-bind:oneRoom="item"></card>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.baris {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  max-width: 100%;
  padding: 0 4px;
  vertical-align: middle;
}
.homeScreen {
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed !important;
  overflow: hidden;
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
  padding: 20px 70px;
}
</style>


<script>
import db from "@/api/firebase.js";
import card from '@/components/JoinRoom.vue'
export default {
  components: {
    card
  },
  data() {
    return {
      idRoom: "",
      name: "",
      rooms: []
    };
  },
  methods: {
    createRoom() {
      db.collection("rooms")
        .where("name", "==", this.name)
        .get()
        .then(querysnapshot => {
          //   console.log(querysnapshot.docs.length);
          if (querysnapshot.docs.length > 0) {
            console.log("ruangan sudah terpakai");
            this.name = "";
          } else {
            return db.collection("rooms").add({
              name: this.name,
              players: [{ player: "player 1", point: 0 }]
            });
          }
        })
        .then(docRef => {
          console.log(docRef);
          this.name = "";
          $("#myModal").modal("toggle");
          Swal.fire({
            type: "success",
            title: "Room created",
            animation: true,
            timer: 1500
          });
          this.$router.push("/play");
        })
        .catch(err => {
          console.log(err);
          Swal.fire({
            type: "error",
            title: "Oops, something wrong happen",
            animation: true,
            customClass: {
              popup: "animated tada"
            },
            timer: 1500
          });
        });
    }
  },
  mounted() {
    db.collection("rooms").onSnapshot(querysnapshot => {
      querysnapshot.forEach(doc => {
        this.rooms.push(doc);
      });
    });
  }
};
</script>
