import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAwg_3ppqHqdnZYrQvh7dJ1BOIeXSKW2MQ',
  authDomain: 'makememiauw.firebaseapp.com',
  databaseURL: 'https://makememiauw.firebaseio.com',
  projectId: 'makememiauw',
  storageBucket: 'makememiauw.appspot.com',
  messagingSenderId: '615526904528',
};
firebase.initializeApp(config);

const db = firebase.firestore();

export default db;
