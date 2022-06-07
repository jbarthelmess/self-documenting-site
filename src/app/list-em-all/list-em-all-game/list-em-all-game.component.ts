import { Component, OnInit } from '@angular/core';
import { PokemonData, Generation } from '../list-em-all-models';
import { PokemonServiceService } from '../services/pokemon-service.service';

@Component({
  selector: 'app-list-em-all-game',
  templateUrl: './list-em-all-game.component.html',
  styleUrls: ['./list-em-all-game.component.scss']
})
export class ListEmAllGameComponent implements OnInit {
  pokemonList: PokemonData[] = [];
  pokemon: string = "";
  notFoundMap: Map<string, number> = new Map();
  generationPick: number = 1;
  interval: ReturnType<typeof setInterval> | null = null;
  timeLeft: number = 0;

  exceptions: Map<string, string> = new Map();

  generation: Generation[] = [
    {
      number: 1,
      count: 151,
      offset: 0,
    },
    {
      number: 2,
      count: 100,
      offset: 151,
    },
    {
      number: 3,
      count: 135,
      offset: 251,
    },
    {
      number: 4,
      count: 107,
      offset: 386,
    }
  ]
  constructor(private pokeService: PokemonServiceService) { }

  ngOnInit(): void {
    this.exceptions.set('mr-mime', 'Mr. Mime');
    this.exceptions.set('wormadam-plant', 'Wormadam');
    this.exceptions.set('giratina-altered', 'Giratina');
    this.exceptions.set('shaymin-land', 'Shaymin');
    this.exceptions.set('mime-jr', 'Mime Jr.');
  }

  getGenerationPokemon() {
    this.pokeService.getGenerationPokemon(this.generation[this.generationPick-1]).subscribe(data => {
      console.log(data);
      this.pokemonList = data.results.map((basic, index) => {
        let name: string;
        const exceptionCheck = this.exceptions.get(basic.name);
        if (exceptionCheck !== undefined) {
          console.log(exceptionCheck);
          name = exceptionCheck;
        } else {
          // this tangle of replace calls capitalizes each word in a name
          name = basic.name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
        }
        this.notFoundMap.set(name.toLocaleLowerCase(), index + 1);
        return {
          name,
          found: false,
          id: index + this.generation[this.generationPick-1].offset + 1
        }
      });
    });
    this.timeLeft = this.generation[this.generationPick - 1].count * 6 * 1000; // number of seconds to go
    this.interval = setInterval(() => {
      this.timeLeft = this.timeLeft - 1000;
      if(this.timeLeft <= 0) {
        // do something to lose
        if (this.interval !== null) {
          clearInterval(this.interval);
          this.interval = null;
        }
      }
    }, 1000);
  }

  checkForPokemon() {
    const element = this.notFoundMap.get(this.pokemon.toLocaleLowerCase());
    if (element !== undefined) {
      this.pokemonList[element - 1].found = true;
      this.notFoundMap.delete(this.pokemon.toLocaleLowerCase());
      this.pokemon = '';
      if(this.notFoundMap.size === 0) {
        // do something for winning
        if (this.interval !== null) {
          clearInterval(this.interval);
          this.interval = null;
        }
      }
    }
  }

}
