import { Component, OnInit } from '@angular/core';
import { albumsservise } from '../../services/albums.servise';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  providers: [albumsservise]
})
export class AlbumsComponent implements OnInit {

  constructor(public _albumsservise: albumsservise) { }
  ngOnInit() {
    this.getAlbums();
  }
  opened = false;
  albums: any;

  //read
  getAlbums = () =>
    this._albumsservise
      .getAlbums()
      .subscribe(res => (this.albums = res));

  //create
  addAlbum() {

  }

  // form
  openForm() {
    this.opened = true;
  }

  closeForm() {
    this.opened = false;
  }

  onSubmit() {

  }
  // onSubmit() {
  //   this._albumsservise.form.value.albums = this._albumsservise;
  //   let data = this._albumsservise.form.value;

  //   this._albumsservise.createAlbum(data)
  //     .then(res => {

  //     });
  // }

}

