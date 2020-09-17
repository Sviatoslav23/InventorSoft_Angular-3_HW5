import { Injectable } from '@angular/core';
// import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFirestore } from '@angular/fire/firestore';

// import { Albums } from '../pages/albums/albums.model';

@Injectable({
    providedIn: 'root'
})

export class albumsservise {
    constructor(private firestore: AngularFirestore) { }
    // form = new FormGroup({
    //     name: new FormControl(''),
    //     band: new FormControl({value: 'Coldplay', disabled: false}, Validators.required),
    //     genre: new FormControl(''),
    //     label: new FormControl(''),
    //     producer: new FormControl('')
    //     // completed: new FormControl(false)
    // });
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