import firebase from "firebase";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyApKgxe2W8xi0U5lyLPe_G_CEFrekY8EQ0",
  authDomain: "daycare-f2982.firebaseapp.com",
  projectId: "daycare-f2982",
  storageBucket: "daycare-f2982.appspot.com",
  messagingSenderId: "693074187472",
  appId: "1:693074187472:web:2b30711a64ee41ec1d7ad5",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
// export
// export default firebase;
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
