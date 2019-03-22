<template>
  <div class="card" style="width: 20rem;">
    <div class="card-block">
      <h5 class="card-title">{{oneRoom.data().name}}</h5>
      <div v-if="oneRoom.data().players.length < 2">
        <a
          href="#"
          class="btn btn-primary"
          role="button"
          v-on:click.prevent="joinRoom(oneRoom.id)"
        >Join</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-block {
  border: solid 2px;
}
.card {
  margin: 5px;
}
</style>

<script>
import db from "@/api/firebase.js";
export default {
  props: ["oneRoom"],
  data() {
    return {
      idRoom: "",
      name: ""
    };
  },
  methods: {
    joinRoom(idRoom) {
      console.log(idRoom);
      console.log("masuk ke room");
      const roomId = idRoom;
      db.collection("rooms")
        .doc(roomId)
        .get()
        .then(querysnapshot => {
          console.log("masuk ke filter");
          console.log(querysnapshot.data().players);
          if (querysnapshot.data().players.length > 2) {
            console.log("masuk ke error");
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
            console.log("ini masuk ke update");
            console.log(roomId);
            const joinPLayer = querysnapshot.data().players;
            joinPLayer.push({ player: "player 2", point: 0 });
            console.log(joinPLayer);
            return db
              .collection("rooms")
              .doc(roomId)
              .update({
                players: joinPLayer
              });
          }
        })
        .then(docRef => {
          console.log("masuk ke get one");
          console.log(docRef);
          this.name = "";
          return db
            .collection("rooms")
            .doc(roomId)
            .get();
        })
        .then(doc => {
          this.$store.commit('setRoom', doc.data())
          console.log(this.$store.state.roomWhoPlay.players, "ini masuk ke store");
          this.$router.push("/play");
          Swal.fire({
            type: "success",
            title: "Join room",
            animation: true,
            timer: 1500
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

