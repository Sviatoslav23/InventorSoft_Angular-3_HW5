const firebaseConfig = {
    apiKey: "AIzaSyART9dNAM_Hh1ClOqd-zkd8HQt4cwuSVSc",
    authDomain: "ang-crud-fb-f9abc.firebaseapp.com",
    databaseURL: "https://ang-crud-fb-f9abc.firebaseio.com",
    projectId: "ang-crud-fb-f9abc",
    storageBucket: "ang-crud-fb-f9abc.appspot.com",
    messagingSenderId: "159551332371",
    appId: "1:159551332371:web:c12111efbf26ef00671fe6",
    measurementId: "G-YWEWYZXZJX"
};
const albums = require('./albums.json');
const firebase = require('firebase');

require('firebase/firestore');
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

albums.forEach(function (obj) {
    db.collection("albums")
        .add({
            id: obj.name,
            name: obj.name,
            band: obj.band,
            genre: obj.genre,
            label: obj.label,
            producer: obj.producer
        })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
});