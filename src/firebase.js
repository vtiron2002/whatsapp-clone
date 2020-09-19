import firebase from 'firebase';
const firebaseConfig = {
  apiKey: 'AIzaSyCLXkwydH8nrsBu6PdzfKPsIarV9TiLGvE',
  authDomain: 'whatsapp-fb6f0.firebaseapp.com',
  databaseURL: 'https://whatsapp-fb6f0.firebaseio.com',
  projectId: 'whatsapp-fb6f0',
  storageBucket: 'whatsapp-fb6f0.appspot.com',
  messagingSenderId: '601945516741',
  appId: '1:601945516741:web:21d84136dfbf68c08cdeac',
  measurementId: 'G-SMJ1C5Y9TE',
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
