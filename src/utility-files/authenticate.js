import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { firebaseConfig } from "../firebase-config";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, update } from "firebase/database";

const firebase = initializeApp(firebaseConfig);
const auth = getAuth();

async function signUp(s) {
  var success = 0;
  if (
    validUsename(s.username) &&
    validEmail(s.email) &&
    validPass(s.password)
  ) {
    await createUserWithEmailAndPassword(auth, s.email, s.password)
      .then((userCredential) => {
        const user = userCredential.user;
        const db = getDatabase();
        set(ref(db, "users/" + user.uid), {
          username: s.username,
          email: s.email,
          lastLogin: Date.now(),
          moderator: false,
          votes: 1,
        });
        success = 1;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, " ", errorMessage);
        return 0;
      });
  } else {
    if(!validEmail(s.email) ){
      return -1;
    } else if (!validPass(s.password)){
      return -2;
    } else if(!validUsename(s.username)){
      return -3;
    }
  }
  return Promise.resolve(success);
}

async function logIn(s) {
  var success = 0;
  if (validEmail(s.email) && validPass(s.password)){
    await signInWithEmailAndPassword(auth, s.email, s.password)
      .then((userCredential) => {
        const user = userCredential.user;
        const db = getDatabase();
        const updates = {};
        updates[`/users/${user.uid}/lastLogin`] = Date.now();
        update(ref(db), updates);
        success = 1;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, " ", errorMessage);
        return 0;
      });
    } else {
      if(!validEmail(s.email) ){
        return -1;
      } else if (!validPass(s.password)){
        return -2;
      }
    }
  return Promise.resolve(success);
}

function signOutUser() {
  signOut(auth)
    .then(() => {
      // TODO: Add a tostify
      console.log("Signed Out");
    })
    .catch((error) => {
      alert(error.number," ",error.message);
    });
}

function validEmail(s) {
  if (/^[^@]+@\w+(\.\w+)+\w$/.test(s)) return true;
}

function validPass(s) {
  if (s.length >= 6) return true;
  return false;
}

function validUsename(s) {
  if (/^[a-z0-9]+$/i.test(s)) return true;
  return false;
}

export { signUp, logIn, signOutUser };
