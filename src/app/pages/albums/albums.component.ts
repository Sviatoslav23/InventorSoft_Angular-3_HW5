import { Component, OnInit } from '@angular/core';
import { albumsservise } from '../../services/albums.servise';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  providers: [albumsservise]
})
export class AlbumsComponent implements OnInit {

  constructor(private _albumsservise: albumsservise) { }

  ngOnInit() {
    this.getAlbums();
  }
  albums: any;
  getAlbums = () =>
    this._albumsservise
      .getAlbums()
      .subscribe(res => (this.albums = res));

}

