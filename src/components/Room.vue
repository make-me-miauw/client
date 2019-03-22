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
      data-target="#joinModal"
    >Join Room</button>
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
    <div class="modal" id="joinModal">
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
import db from '@/api/firebase.js';

export default {
  data() {
    return {
      idRoom: '',
      name: '',
      players: [],
    };
  },
  methods: {
    createRoom() {
      db.collection('rooms')
        .where('name', '==', this.name)
        .get()
        .then((querysnapshot) => {
          //   console.log(querysnapshot.docs.length);
          if (querysnapshot.docs.length > 0) {
            console.log('ruangan sudah terpakai');
            this.name = '';
          } else {
            return db.collection('rooms').add({
              name: this.name,
              players: [{ player: 'player 1', point: 0 }],
            });
          }
        })
        .then((docRef) => {
          console.log(docRef);
          this.name = '';
          Swal.fire({
            type: 'success',
            title: 'Room created',
            animation: true,
            timer: 1500,
          });
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            type: 'error',
            title: 'Oops, something wrong happen',
            animation: true,
            customClass: {
              popup: 'animated tada',
            },
            timer: 1500,
          });
        });
    },
    joinRoom(idRoom) {
      const roomId = idRoom;
      db.collection('rooms')
        .doc(roomId)
        .get()
        .then((querysnapshot) => {
          console.log(querysnapshot.data());
          if (!querysnapshot.data()) {
            console.log(`no such room with name ${this.name}`);
            this.name = '';
          } else {
            console.log('ini players');
            const joinPLayer = querysnapshot.data().players;
            joinPLayer.push({ player: 'player 2', point: 0 });
            return db
              .collection('rooms')
              .doc(roomId)
              .update({
                players: joinPLayer,
              });
          }
        })
        .then((docRef) => {
          console.log(docRef);
          this.name = '';
          Swal.fire({
            type: 'success',
            title: 'Join room',
            animation: true,
            timer: 1500,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
