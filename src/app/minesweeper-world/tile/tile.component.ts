import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tile } from '../model/tile.model';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {
  @Input() tile: Tile = new Tile();
  @Input() selectedMode: boolean = true;
  @Input() sideLength: number = 52;
  @Output() openNeighbors: EventEmitter<number> = new EventEmitter();
  @Output() gameOver: EventEmitter<number> = new EventEmitter();
  @Output() marked: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  select() {
    // console.log(`Opening ${this.tile.id}`);
    if (this.selectedMode) {
      console.log(`Printing from tile ${this.tile.id}: selectedMode is true`);
      if (this.tile.isBomb && !this.tile.isMarked && !this.tile.isOpen) {
        // emit some sort of game over message if we opened an unmarked bomb
        this.gameOver.emit(this.tile.id);
      } else if (!this.tile.isOpen && !this.tile.isMarked) {
        // if not open and not marked, open the tile
        this.tile.isOpen = true;
        if (this.tile.bombNeighbors === 0) {
          // emit that the board should open this tiles neighbors
          this.openNeighbors.emit(this.tile.id);
        }
      } // if not a bomb and already opened, or marked, do nothing
    } // if not in selectedMode, do nothing
  }

  mark(event: MouseEvent) {
    event.preventDefault();
    if (!this.tile.isOpen && this.selectedMode) {
      this.tile.isMarked = !this.tile.isMarked;
      this.marked.emit(this.tile.isMarked);
    } // if the tile is already opened, or not in selectedMode, do nothing
  }

}
