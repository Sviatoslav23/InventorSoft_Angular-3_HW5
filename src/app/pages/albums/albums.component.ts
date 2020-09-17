import { Component, OnInit } from '@angular/core';
import { albumsservise } from '../../services/albums.servise';
import { of } from 'rxjs';
// import { FormControl, FormGroup, Validators } from "@angular/forms";
// import { Albums } from '../albums/albums.model';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  providers: [albumsservise]
})
export class AlbumsComponent implements OnInit {

  opened = false;
  hideenForm = false;
  confirm = false;
  // isEdit= false;
  // get alb() {
  //   let alb;
  //   for (alb of this.albums) {
  //     return alb;
  //   }
  // }
  albums: any;

  id: string;
  name: string;
  band: string;
  genre: string;
  label: string;
  producer: string;

  constructor(public _albumsservise: albumsservise) { }
  // form = new FormGroup({
  //   name: new FormControl(''),
  //   band: new FormControl({ value: 'Coldplay', disabled: false }, Validators.required),
  //   genre: new FormControl(''),
  //   label: new FormControl(''),
  //   producer: new FormControl('')
  // completed: new FormControl(false)
  // });

  //read
  ngOnInit() {
    this._albumsservise.getAlbums()
      .subscribe(res => (this.albums = res.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()["name"],
          band: e.payload.doc.data()["band"],
          genre: e.payload.doc.data()["genre"],
          label: e.payload.doc.data()["label"],
          producer: e.payload.doc.data()["producer"]
        };
      }))
      )
  }

  // form
  openForm() {
    this.opened = true;
  }

  closeForm() {
    this.opened = false;
  }

  //create
  onSubmit() {
    let data = {};
    data['name'] = this.name;
    data['band'] = this.band;
    data['genre'] = this.genre;
    data['label'] = this.label;
    data['producer'] = this.producer;

    this._albumsservise.createAlbum(data)
      .then(res => {
        this.name = "";
        this.band = "";
        this.genre = "";
        this.label = "";
        this.producer = "";
        this.closeForm();
      }).catch(error => {
        console.log(error);
      })
  }

  editname: string;
  editband: string;
  editgenre: string;
  editlabel: string;
  editproducer: string;

  //edit
  editAlbum(data) {
    this.hideenForm = true;
    this.editname = data.name;
    this.editband = data.band;
    this.editgenre = data.genre;
    this.editlabel = data.label;
    this.editproducer = data.producer;
  }
  closeUpdate() {
    this.hideenForm = false;
  }

  saveChanges(item: any) {
    let data = {};
    data['name'] = item.editname;
    data['band'] = item.editband;
    data['genre'] = item.editgenre;
    data['label'] = item.editlabel;
    data['producer'] = item.editproducer;
    this._albumsservise.updateAlbum(item.id, item);
    this.hideenForm = false;
  }

  confirmDelete() {
    this.confirm = true;
  }

  cancelConf() {
    this.confirm = false;
  }

  //delete
  deleteAlbum(dataId) {
    this._albumsservise.deleteAlbum(dataId);
    this.confirm = false;
  }

}

