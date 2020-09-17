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
  genre: string;
  label: string;
  producer: string;

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
    this.form.value.coffeeOrder = this.albums;
    let data = this.form.value;

    this._albumsservise.createAlbum(data)
      .then(res => {
        this.form.reset();
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
    // this.form.value.coffeeOrder = this.albums;
    // let item = this.form.value;

    // this._albumsservise.createAlbum(item)
    //   .then(res => {
    //     this.form.reset();
    //     this.closeForm();
    //   }).catch(error => {
    //     console.log(error);
    //   })

    
    // this.hideenForm = true;
    // this.editname = data.name;
    // this.editband = data.band;
    // this.editgenre = data.genre;
    // this.editlabel = data.label;
    // this.editproducer = data.producer;
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

