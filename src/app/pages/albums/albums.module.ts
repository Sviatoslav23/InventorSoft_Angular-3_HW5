import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumsComponent } from './albums.component';

import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire";

import { AlbumsRoutingModule } from './albums-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AlbumsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  declarations: [
    AlbumsComponent
  ],
  bootstrap: [AlbumsComponent]

})
export class AlbumsModule { }
