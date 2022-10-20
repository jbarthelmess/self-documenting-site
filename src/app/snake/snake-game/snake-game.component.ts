import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Tile } from '../model/tile.model';

@Component({
  selector: 'app-snake-game',
  templateUrl: './snake-game.component.html',
  styleUrls: ['./snake-game.component.scss']
})
export class SnakeGameComponent implements OnInit, OnDestroy {
  board: Tile[][] = [];
  interval: any = null;
  snake: Tile[] = [];
  direction: number = 1;
  directionChangePipe: number[] = [];

  constructor() { }

  ngOnInit(): void {
    const newBoard = [];
    for(let i = 0; i < 10; i++) {
      const row = [];
      for(let j = 0; j < 10; j++) {
        const tile = new Tile();
        tile.id = i*10 + j;
        row.push(tile);
      }
      newBoard.push(row);
    }
    this.board = newBoard;

    // push the beginning of the snake
    let tile = this.board[5][3];
    tile.isSnake = true;
    this.snake.push(tile);

    tile = this.board[5][4];
    tile.isSnake = true;
    this.snake.push(tile);

    tile = this.board[5][5];
    tile.isSnake = true;
    this.snake.push(tile);

    this.generateFood();

    this.interval = setInterval(() => {
      const headId = this.snake[this.snake.length-1].id;
      let isChanged = false;
      while(!isChanged && this.directionChangePipe.length > 0) {
        const newDir = this.directionChangePipe.shift();
        if (newDir !== undefined && newDir !== this.direction && newDir !== -this.direction) {
          isChanged = true;
          this.direction = newDir;
        }
      }
      // remove the tail first
      const removeTile = this.snake.shift();
      if(removeTile) {
        removeTile.isSnake = false;
      }

      // get the new head
      const newHead = headId + this.direction;
      if(newHead > 99 || newHead < 0 || (newHead % 10) - (headId % 10) !== (this.direction % 10)) {
        this.lose();
      } else {
        const row = Math.floor(newHead / 10);
        const col = newHead % 10;
        const headTile = this.board[row][col];
        // check if the new head is part of the snake
        if(this.snake.includes(headTile)) {
          this.lose();
        } else {
          headTile.isSnake = true;
          if (headTile.isFood) {
            headTile.isFood = false;
            this.generateFood();
            if (removeTile) {
              this.snake.unshift(removeTile);
            }
          }
          this.snake.push(headTile);
        }
      }
    }, 300);
  }
  
  @HostListener('window:keydown', ['$event'])
  updateDirection(event: KeyboardEvent) {
    switch(event.key) {
      case "ArrowUp": 
        this.directionChangePipe.push(-10);
        break;
      case "ArrowDown":
        this.directionChangePipe.push(10);
        break;
      case "ArrowLeft":
        this.directionChangePipe.push(-1);
        break;
      case "ArrowRight":
        this.directionChangePipe.push(1);
        break;
    }
  }

  generateFood() {
    if(this.snake.length === 99) {
      this.win();
    } else {
      let generated = false;
      while(!generated) {
        const row = Math.floor(Math.random()*10);
        const col = Math.floor(Math.random()*10);
        const foodTile = this.board[row][col];
        if (!foodTile.isSnake) {
          foodTile.isFood = true;
          generated = true;
        }
      }
    }
  }

  win() {
    if(this.interval !== null) {
      clearInterval(this.interval);
      alert("You win!");
    }
  }

  lose() {
    if(this.interval !== null) {
      clearInterval(this.interval);
    }
    alert("You lose!");
  }

  ngOnDestroy(): void {
    if(this.interval !== null) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}
