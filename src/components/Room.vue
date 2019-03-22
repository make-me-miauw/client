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
  </div>
</template>

<style scoped>
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

export default {
  data() {
    return {
      idRoom: "",
      name: "",
      players: []
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
          this.$router.push('/play');
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
    },
    joinRoom(idRoom) {
      const roomId = idRoom;
      db.collection("rooms")
        .doc(roomId)
        .get()
        .then(querysnapshot => {
          console.log(querysnapshot.data());
          if (!querysnapshot.data()) {
            console.log(`no such room with name ${this.name}`);
            Swal.fire({
              type: "error",
              title: `No such room with name ${this.name}`,
              animation: true,
              customClass: {
                popup: "animated tada"
              },
              timer: 1500
            });
            this.name = "";
          } else {
            if (querysnapshot.data().players.length > 2) {
              Swal.fire({
                type: "error",
                title: "Room full",
                animation: true,
                customClass: {
                  popup: "animated tada"
                },
                timer: 1500
              });
            } else {
              console.log("ini players");
              const joinPLayer = querysnapshot.data().players;
              joinPLayer.push({ player: "player 2", point: 0 });
              return db
                .collection("rooms")
                .doc(roomId)
                .update({
                  players: joinPLayer
                });
            }
          }
        })
        .then(docRef => {
          console.log(docRef);
          this.name = "";
          return db
            .collection("rooms")
            .doc(roomId)
            .get()
            .then(querysnapshot => {
              this.$store.state.roomWhoPLay = querysnapshot.data();
              Swal.fire({
                type: "success",
                title: "Join room",
                animation: true,
                timer: 1500
              });
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
