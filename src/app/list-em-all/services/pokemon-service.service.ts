import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Generation, SpeciesListReturn } from '../list-em-all-models';

@Injectable({
  providedIn: 'root'
})
export class PokemonServiceService {

  constructor(private http: HttpClient) { }

  getGenerationPokemon(gen: Generation): Observable<SpeciesListReturn> {
    console.log(gen);
    return this.http.get<SpeciesListReturn>(`https://pokeapi.co/api/v2/pokemon-species?limit=${gen.count}${gen.offset > 0 ? `&offset=${gen.offset}` : ''}`);
  }
}
