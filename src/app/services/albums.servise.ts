import { Injectable } from '@angular/core';
// import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFirestore } from '@angular/fire/firestore';

// import { Albums } from '../pages/albums/albums.model';

@Injectable({
    providedIn: 'root'
})

export class albumsservise {
    constructor(private firestore: AngularFirestore) { }
    //read
    getAlbums() {
        return this.firestore.collection("albums").snapshotChanges();
    }

    //create
    createAlbum(data) {
        return this.firestore.collection('albums').add(data);
    }

    // update
    updateAlbum(dataId, data) {
        this.firestore.doc("albums/" + dataId).update(data);
    }

    //delete
    deleteAlbum(dataId) {
        this.firestore.doc('albums/' + dataId).delete();
    }
}