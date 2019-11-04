export const LOCALHOSTVPN = 'http://192.168.18.63:3000'; //cloudtek_VPN
import Firebase from 'firebase';
let config = {
    apiKey: "AIzaSyAASdB3gRjL6rPPNJbwVn8tSmpHlZGmS5Y",
    authDomain: "tiptap-72d85.firebaseapp.com",
    databaseURL: "https://tiptap-72d85.firebaseio.com",
    projectId: "tiptap-72d85",
    storageBucket: "tiptap-72d85.appspot.com",
    messagingSenderId: "316687250861",
    appId: "1:316687250861:web:9b1963f027449620ea1d24",
    measurementId: "G-H2XD0VZH6B"
  };
let app = Firebase.initializeApp(config);
export const storage = app.storage();