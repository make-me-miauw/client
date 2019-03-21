<template>
  <div>
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#myModal"
    >Create Room</button>
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#createModal"
    >Create Room</button>
    <div class="modal" id="myModal">
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
                <input type="submit" class="btn btn-success" value="Submit">
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
    <div class="modal" id="createModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal body -->
          <div class="modal-body">
            <div class="add">
              <h2>Join Room</h2>
              <form v-on:submit.prevent="joinRoom">
                <input v-model="name" placeholder="Room" class="form-control">
                <br>
                <br>
                <input type="submit" class="btn btn-success" value="Submit">
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

<script>
import db from "@/api/firebase.js";
export default {
  data() {
    return {
      name: "",
      players: []
    };
  },
  methods: {
    createRoom() {
      db.collection("rooms")
        .add({
          name: this.name,
          players: ["Player 1"]
        })
        .then(docRef => {
          console.log(docRef);
          this.name = "";
          Swal.fire({
            type: "success",
            title: `Room created`,
            animation: true,
            timer: 1500
          });
        })
        .catch(err => {
            console.log(err)
            Swal.fire({
            type: 'error',
            title: 'Oops, something wrong happen',
            animation: true,
            customClass: {
              popup: 'animated tada'
            },
            timer: 1500,
          });
        });
    },
  },
};
</script>

