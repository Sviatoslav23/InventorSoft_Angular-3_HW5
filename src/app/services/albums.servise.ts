import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})

export class albumsservise {
    constructor(private firestore: AngularFirestore) { }
    form = new FormGroup({
        name: new FormControl(''),
        band: new FormControl(''),
        genre: new FormControl(''),
        label: new FormControl(''),
        producer: new FormControl('')
        // completed: new FormControl(false)
    });
    //read
    getAlbums() {
        return this.firestore.collection("albums").snapshotChanges();
    }

    //create
    create(data) {
        return new Promise<any>((resolve, reject) => {
            this.firestore
                .collection("collectionNameHere")
                .add(data)
                .then(
                    res => { },
                    err => reject(err)
                )
        }
        )
    }

    //get (read)
    // getDoc() {
    //     return this.firestore
    //         .doc('albums')
    //     вы можете использовать: 
    //     .valueChanges () 
    //     или .snapshotChanges () 
    // }
}