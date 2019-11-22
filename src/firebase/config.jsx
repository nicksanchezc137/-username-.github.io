import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyCHdknORbjUQmwl8OAjiHOZ6AwJe_BVO3I",
    authDomain: "nick-porfolio.firebaseapp.com",
    databaseURL: "https://nick-porfolio.firebaseio.com",
    projectId: "nick-porfolio",
    storageBucket: "nick-porfolio.appspot.com",
    messagingSenderId: "523666903211",
    appId: "1:523666903211:web:0215f6b5253883642ae7ee",
    measurementId: "G-4DSPGFFNWL"
};

firebase.initializeApp(config);

//firebase.firestore().settings(settings);

export default firebase;
