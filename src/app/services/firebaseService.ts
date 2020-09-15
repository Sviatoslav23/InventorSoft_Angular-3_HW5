import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

export class firebaseService {
    constructor(private firestore: AngularFirestore) { }

    exampleCreate(data) {
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
    exampleGetDocument() {
        return this.firestore
            .doc('collectionName / docID')
        // вы можете использовать: 
        // .valueChanges () 
        // или .snapshotChanges () 
    }
}