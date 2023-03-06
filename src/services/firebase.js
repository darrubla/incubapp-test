/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {
  doc,
  setDoc,
  arrayUnion,
  arrayRemove,
  updateDoc,
} from 'firebase/firestore';
import notify from '../utils/notifyToast';

const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_APP_Id,
} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_Id,
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
// eslint-disable-next-line
const userData = JSON.parse(JSON.stringify(auth['_delegate'])).currentUser;

const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const { user } = res;
    const query = await db
      .collection('users')
      .where('uid', '==', user.uid)
      .get();
    if (query.docs.length === 0) {
      await db.collection('users').add({
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
  } catch (err) {
    notify(
      'error',
      '!Upss el usuario no se ha podido conectar, por favor verifica tus datos!',
      'error_adding_favorite'
    );
  }
};

const signInWithEmailAndPassword = async (email, password) => {
  try {
    const res = await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    notify(
      'error',
      '!Upss el usuario no se ha podido conectar, por favor revisa tus datos!',
      'error_auth'
    );
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const { user } = res;
    await db.collection('users').add({
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (err) {
    notify(
      'error',
      '!Upss el usuario no se ha podido crear, por favor verifica tus datos!',
      'error_register'
    );
  }
};

const addFavorites = async (id, email, type) => {
  try {
    const docRef = await setDoc(doc(db, 'usuarios', email), {
      [type]: [id],
    });
  } catch (e) {
    notify(
      'error',
      '!Upss ha ocurrido un error, vuelve a intentarlo más tarde!',
      'error_adding_favorite'
    );
  }
};

const updateFavorites = async (id, email, type) => {
  const document = doc(db, 'usuarios', email);
  try {
    await updateDoc(document, {
      [type]: arrayUnion(id),
    });
  } catch (e) {
    notify(
      'error',
      '!Upss ha ocurrido un error, vuelve a intentarlo más tarde!',
      'error_updating_favorite'
    );
  }
};

const removeFavorites = async (id, email, type) => {
  const document = doc(db, 'usuarios', email);
  try {
    await updateDoc(document, {
      [type]: arrayRemove(id),
    });
  } catch (e) {
    notify(
      'error',
      '!Upss ha ocurrido un error, vuelve a intentarlo más tarde!',
      'error_removing_favorite'
    );
  }
};

const logout = () => {
  auth.signOut();
};

export {
  auth,
  db,
  userData,
  updateFavorites,
  removeFavorites,
  addFavorites,
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};
