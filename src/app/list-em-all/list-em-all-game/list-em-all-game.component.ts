import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PokemonData, Generation } from '../list-em-all-models';
import { PokemonServiceService } from '../services/pokemon-service.service';

import * as dialogPolyfill from 'dialog-polyfill';

@Component({
  selector: 'app-list-em-all-game',
  templateUrl: './list-em-all-game.component.html',
  styleUrls: ['./list-em-all-game.component.scss']
})
export class ListEmAllGameComponent implements OnInit, AfterViewInit {
  pokemonList: PokemonData[] = [];
  pokemon: string = "";
  notFoundMap: Map<string, number> = new Map();
  generationPick: number = 0;
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
    },
    {
      number: 5,
      count: 156,
      offset: 493
    },
    {
      number: 6,
      count: 72,
      offset: 649
    },
    {
      number: 7,
      count: 88,
      offset: 721
    },
    {
      number: 8,
      count: 89,
      offset: 809
    },
  ]

  resultText: string = "You Win!"
  instructionsOpen: boolean = true;
  @ViewChild('instructions') instructionDialog!: ElementRef;
  @ViewChild('result') resultDialog!: ElementRef;

  constructor(private pokeService: PokemonServiceService) { }

  ngOnInit(): void {
    this.exceptions.set('mr-mime', 'Mr. Mime');
    this.exceptions.set('wormadam-plant', 'Wormadam');
    this.exceptions.set('giratina-altered', 'Giratina');
    this.exceptions.set('shaymin-land', 'Shaymin');
    this.exceptions.set('mime-jr', 'Mime Jr.');
    this.exceptions.set('type-null', 'Type: Null');
    this.exceptions.set('tapu-koko', 'Tapu Koko');
    this.exceptions.set('tapu-lele', 'Tapu Lele');
    this.exceptions.set('tapu-bulu', 'Tapu Bulu');
    this.exceptions.set('tapu-fini', 'Tapu Fini');
    this.exceptions.set('mr-rime', 'Mr. Rime');
  }

  ngAfterViewInit(): void {
    dialogPolyfill.default.registerDialog(this.instructionDialog.nativeElement);
    dialogPolyfill.default.registerDialog(this.resultDialog.nativeElement);
    this.instructionDialog.nativeElement.showModal();
  }

  toggleInstructions() {
    if(this.instructionsOpen) {
      this.instructionDialog.nativeElement.close();
    } else {
      this.instructionDialog.nativeElement.showModal();
    }
    this.instructionsOpen = !this.instructionsOpen;
  }

  closeResult() {
    this.resultText = "You Win!";
    this.resultDialog.nativeElement.close();
  }

  getGenerationPokemon() {
    // using double equals here because ngModel automatically
    // makes generationPick a string...
    if(this.generationPick == 0) {
      this.resultText = "Please select a generation before beginning the game.";
      this.resultDialog.nativeElement.showModal();
      return;
    }
    this.pokeService.getGenerationPokemon(this.generation[this.generationPick-1]).subscribe(data => {
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
          notFound: false,
          id: index + this.generation[this.generationPick-1].offset + 1
        }
      });
    });
    this.timeLeft = this.generation[this.generationPick - 1].count * 6 * 1000; // number of seconds to go
    this.interval = setInterval(() => {
      this.timeLeft = this.timeLeft - 1000;
      if(this.timeLeft <= 0) {
        for(let mon of this.pokemonList) {
          if(!mon.found) {
            mon.found = true;
            mon.notFound = true;
          }
        }
        this.notFoundMap.clear();
        this.resultText = "You Lose!";
        this.resultDialog.nativeElement.showModal();
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
        this.resultDialog.nativeElement.showModal();
        if (this.interval !== null) {
          clearInterval(this.interval);
          this.interval = null;
        }
      }
    }
  }

}
