import { Component, OnInit } from '@angular/core';
import { albumsservise } from '../../services/albums.servise';
import { of } from 'rxjs';
import { FormBuilder, Validators } from "@angular/forms";
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

  albums: any;

  id: string;
  name: string;
  band: string;
  genre: any;
  label: any;
  producer: any;

  constructor(public _albumsservise: albumsservise, private fb: FormBuilder) { }
  //FormBuilder
  form = this.fb.group({
    name: ['', Validators.required],
    band: ['', Validators.required],
    genre: [''],
    label: [''],
    producer: [''],
    //email to FormArray
    // emails: this.fb.array([
    //   this.fb.control('')
    // ])
  });

  // editForm = this.fb.group({
  //   editname: ['', Validators.required],
  //   editband: ['', Validators.required],
  //   editgenre: [''],
  //   editlabel: [''],
  //   editproducer: [''],
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

  //getter name
  get nameValue() {
    return this.form.get('name');
  }
  //getter band
  get bandValue() {
    return this.form.get('band');
  }
  //getter genre
  get genreValue() {
    return this.form.get('genre');
  }
  //getter label
  get labelValue() {
    return this.form.get('label');
  }
  //getter name
  get producerValue() {
    return this.form.get('producer');
  }


  // form
  openForm() {
    this.opened = true;
  }

  closeForm() {
    this.opened = false;
    this.form.reset();
  }

  //create
  onSubmit() {
    this.form.value.albums = this.albums;
    let data = this.form.value;

    this._albumsservise.createAlbum(data)
      .then(res => {
        this.form.reset();
        this.closeForm();
      }).catch(error => {
        console.log(error);
      })
  }

  //edit
  editAlbum(data) {
    this.hideenForm = true;
    this.form.patchValue({
      name: data.name,
      band: data.band,
      genre: data.genre,
      label: data.label,
      producer: data.producer
    });
  }

  closeUpdate() {
    this.hideenForm = false;
  }

  saveChanges(item: any) {
    console.log(item);
    let data = {};
    data['name'] = item.name;
    data['band'] = item.band;
    data['genre'] = item.genre;
    data['label'] = item.label;
    data['producer'] = item.producer;
    this._albumsservise.updateAlbum(item.id, item);
    // subscribe
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

