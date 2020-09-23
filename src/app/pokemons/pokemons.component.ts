import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent implements OnInit {
  _URLdetails: string =
    'https://my-project1-283208.firebaseio.com/pokemonsDetails';
  _URLtoAdd: string = 'https://my-project1-283208.firebaseio.com/pokemonsToAdd';
  pokemonsArray = [];
  nextPokemons = [];
  showModal: boolean = false;
  editMode: boolean = false;
  clickedID: string;
  statsArray = [];
  statsString: string;
  abilitiesArray = [];
  abilitiesString: string;
  typeArray = [];
  typeString: string;
  displayedColumns: string[] = [
    'name',
    'height',
    'weight',
    'stats',
    'abilities',
    'types',
    'action',
  ];

  constructor(private http: HttpClient, private db: AngularFireDatabase) { }

  ngOnInit(): void {
    this.assignPokemons();
  }

  // get pokemons from db and get next pokemons to show
  async assignPokemons() {
    await this.getPokemons(this._URLdetails).subscribe((data) => {
      this.pokemonsArray = [...this.pokemonsArray, ...Object.values(data)];
    });

    this.getNextPokemons();
  }

  // CRUD
  // add new pokemon (put)
  addPokemon(pokemonObj, url: string): Observable<any> {
    return this.http.post<any>(`${url}.json`, pokemonObj);
  }

  // get pokemons (get)
  getPokemons(url: string): Observable<any> {
    return this.http.get<any>(`${url}.json`);
  }

  // delete pokemon (delete)
  deletePokemons(id: string, url: string): Observable<any> {
    return this.http.delete<any>(`${url}/${id}.json`);
  }

  // update pokemon info ()
  updatePokemons(id: string, url: string, obj): Observable<any> {
    return this.http.put<any>(`${url}/${id}.json`, obj);
  }

  // on delete add item to array which we can add and delte from array to show also do the same with db
  async onDelete(element) {
    this.deletePokemons(element.docId, this._URLdetails).subscribe(
      (data) => data
    );
    this.pokemonsArray = this.pokemonsArray.filter(
      (item) => item.docId !== element.docId
    );
    this.addPokemon(element, this._URLtoAdd).subscribe((data) => data);
    this.nextPokemons = [element, ...this.nextPokemons];
  }

  // get pokemons from db which we can add
  async getNextPokemons() {
    await this.getPokemons(this._URLtoAdd).subscribe((data) => {
      this.nextPokemons = [...this.nextPokemons, ...Object.values(data)];
    });
  }

  // show modal window when add button is clicked
  onAddClick() {
    this.showModal = true;
  }

  // vice versa to delete (delete from choose array and add to show array also do the same in db)
  async onChoose(pokemon) {
    this.deletePokemons(pokemon.docId, this._URLtoAdd).subscribe(
      (data) => data
    );
    this.nextPokemons = this.nextPokemons.filter(
      (item) => item.docId !== pokemon.docId
    );

    await this.addPokemon(pokemon, this._URLdetails).subscribe((data) => {
      this.http
        .get(`${this._URLdetails}/${data.name}.json`)
        .subscribe((item) => {
          Object.keys(item).map((key) =>
            key === 'docId' ? (item[key] = data.name) : false
          );
          pokemon.docId = data.name;
          this.updatePokemons(data.name, this._URLdetails, item).subscribe(
            (data) => data
          );
        });
    });

    this.pokemonsArray = [pokemon, ...this.pokemonsArray];
    this.onCloseModal();
  }

  // close modal window
  onCloseModal() {
    this.showModal = !this.showModal;
  }

  // show inputs with binded data
  onEdit(obj) {
    this.statsArray = [];
    this.abilitiesArray = [];
    this.typeArray = [];

    this.editMode = true;
    this.clickedID = obj.docId;

    obj.stats.map((item) => this.statsArray.push(item.stat.name));
    this.statsString = this.statsArray.toString();

    obj.abilities.map((item) => this.abilitiesArray.push(item.ability.name));
    this.abilitiesString = this.abilitiesArray.toString();

    obj.types.map((item) => this.typeArray.push(item.type.name));
    this.typeString = this.typeArray.toString();
  }

  // save changed information about pokemon and update db
  onSave(element) {
    this.editMode = false;
    this.clickedID = null;

    this.statsArray = [...this.statsString.split(/,| /)];
    this.abilitiesArray = [...this.abilitiesString.split(/,| /)];
    this.typeArray = [...this.typeString.split(/,| /)];

    element.stats = [];
    element.abilities = [];
    element.types = [];

    this.statsArray.forEach((item) =>
      element.stats.push({ stat: { name: item } })
    );

    this.abilitiesArray.forEach((item) =>
      element.abilities.push({ ability: { name: item } })
    );

    this.typeArray.forEach((item) =>
      element.types.push({ type: { name: item } })
    );

    this.updatePokemons(element.docId, this._URLdetails, element).subscribe(
      (data) => data
    );
  }

}