import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Tile } from '../model/tile.model';

import * as dialogPolyfill from 'dialog-polyfill';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  tiles: Tile[][] = [];
  tileSideLengthPx: number = 52;
  rowLength: number = 10;
  numRows: number = 10;
  bombCount: number = 10;
  selectedMode: boolean = false;
  isDragging: boolean = false;
  bombsFound: number = 0;
  safeFound: number = 0;
  safeCount: number = 0;

  lastPosX: number = 0;
  lastPosY: number = 0;
  // totalMoveX: number = 0;
  // totalMoveY: number = 0;

  topAnchor: number = 0;
  leftAnchor: number = 0;

  // will always remain in the range [0..this.numRows)
  // will allow us to find tiles in the array after vertical
  // rotations of the array
  rowRotation: number = 0;

  // will always remain in the range [0..this.rowLength)
  // will allow us to find tiles in the array after horizontal
  // rotations of the array
  colRotation: number = 0;

  width: number = 0;
  height: number = 0;
  top: number = 0;
  left: number = 0;

  resultText: string = "You Win!";
  instructionsOpen: boolean = true;
  @ViewChild('instructions') instructionDialog!: ElementRef;
  @ViewChild('result') resultDialog!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.tileSideLengthPx = Math.floor(Math.sqrt(window.innerWidth * window.innerHeight / 310));
    /* First initialize the number of tiles based on the size of the screen */
    const tilesInViewWidth = Math.ceil(window.innerWidth / this.tileSideLengthPx);
    const tilesInViewHeight = Math.ceil(window.innerHeight / this.tileSideLengthPx);

    this.rowLength = tilesInViewWidth*3;
    this.numRows = tilesInViewHeight*3;
    this.bombCount = Math.floor(0.2 * this.rowLength * this.numRows);
    this.safeCount = (this.rowLength * this.numRows) - this.bombCount;

    this.width = this.tileSideLengthPx*this.rowLength;
    this.height = this.tileSideLengthPx*this.numRows;

    this.top = -1 * Math.floor(this.height / 3);
    this.left = -1 * Math.floor(this.width / 3);
    this.topAnchor = this.top;
    this.leftAnchor = this.left;

    // Select starting tile to open. It must be in the viewport of the initial screen
    const rowNum = Math.floor(Math.random()*tilesInViewHeight) + tilesInViewHeight;
    const rowPos = Math.floor(Math.random()*tilesInViewWidth) + tilesInViewWidth;
    const id = rowNum*this.rowLength + rowPos;

    const noBombs = [id, ...this.getNeighbors(id)];
    let bombTiles = this.generateBombLocations(this.bombCount, noBombs);
    for (let i = 0; i < this.numRows; i++) {
      const row = [];
      for (let j = 0; j < this.rowLength; j++) {
        const tile = new Tile();
        tile.id = i*this.rowLength + j;
        if(bombTiles.includes(tile.id)) {
          tile.isBomb = true;
        } else {
          const neighbors = this.getNeighbors(tile.id);
          const intersection = neighbors.filter(num => bombTiles.includes(num));
          tile.bombNeighbors = intersection.length;
          if (tile.id === id) {
            tile.isStart = true;
          }
        }
        row.push(tile);
      }
      this.tiles.push(row);
    }
  }

  ngAfterViewInit() {
    dialogPolyfill.default.registerDialog(this.instructionDialog.nativeElement);
    dialogPolyfill.default.registerDialog(this.resultDialog.nativeElement);
    this.instructionDialog.nativeElement.showModal();
  }

  closeResult() {
    this.resultDialog.nativeElement.close();
  }

  toggleInstructions() {
    if(this.instructionsOpen) {
      this.instructionDialog.nativeElement.close();
    } else {
      this.instructionDialog.nativeElement.showModal();
    }
    this.instructionsOpen = !this.instructionsOpen;
  }

  openNeighbors(id: number) {
    // need to open the neighbors of the id that was emitted.
    this.safeFound += 1;
    let tilesToOpen = this.getNeighbors(id);
    while (tilesToOpen.length > 0) {
      const tileId = tilesToOpen.splice(0, 1)[0]; // get the first item in the list to open
      const tile = this.getTile(tileId);
      if (!tile.isOpen) {
        tile.isOpen = true;
        this.safeFound += 1;
        if (tile.bombNeighbors === 0) { // if the neighbor is also zero, need to open it's neighbors too.
          const neighbors = this.getNeighbors(tileId);
          tilesToOpen = [...tilesToOpen, ...neighbors];
        }
      }
    }
  }

  gameOver(id: number) {
    // need to make the game a game over screen.
    this.resultText = "You Lose!";
    for (let row of this.tiles) {
      for (let tile of row) {
        if (tile.isBomb) {
          tile.isMarked = true;
        }
      }
    }
    this.resultDialog.nativeElement.showModal();
  }

  getNeighbors(id: number): number[] {
    const rowNum = Math.floor(id/this.rowLength);
    const rowPos = id % this.rowLength;
    const tileCount = this.rowLength*this.numRows;

    const up = (id + tileCount - this.rowLength) % tileCount;
    const down = (id + tileCount + this.rowLength) % tileCount;
    const right = ((rowPos + 1) % this.rowLength) + rowNum*this.rowLength; 
    const left = ((rowPos - 1 + this.rowLength) % this.rowLength) + rowNum*this.rowLength;

    const upperLeft = (left + tileCount - this.rowLength) % tileCount; // move up from the left neighbor id
    const upperRight = (right + tileCount - this.rowLength) % tileCount; // move up from the right neighbor id
    const lowerLeft = (left + tileCount + this.rowLength) % tileCount; // move down from the left neighbor id
    const lowerRight = (right + tileCount + this.rowLength) % tileCount; // move down from the right neighbor id
    return [up, down, left, right, upperLeft, upperRight, lowerLeft, lowerRight];
  }

  generateBombLocations(count: number, start: number[]): number[] {
    const ret: number[] = [];
    while (ret.length < count) {
      const id = Math.floor(Math.random()*this.numRows*this.rowLength);
      if(!ret.includes(id) && !start.includes(id)) {
        ret.push(id);
      }
    }
    return ret;
  }

  getTile(id: number): Tile {
    const rowPos = id % this.rowLength;
    const rowNum = Math.floor(id / this.rowLength);
    return this.tiles[(rowNum - this.rowRotation + this.numRows) % this.numRows][(rowPos - this.colRotation + this.rowLength) % this.rowLength];
  }

  drag(mouseEvent: MouseEvent) {
    this.lastPosX = mouseEvent.clientX;
    this.lastPosY = mouseEvent.clientY;
    // this.totalMoveX = 0;
    // this.totalMoveY = 0;

    this.isDragging = true;
  }

  move(mouseEvent: MouseEvent) {
    const offsetX = this.lastPosX - mouseEvent.clientX;
    const offsetY = this.lastPosY - mouseEvent.clientY;
    this.lastPosX = mouseEvent.clientX;
    this.lastPosY = mouseEvent.clientY;

    // this.totalMoveX += offsetX;
    // this.totalMoveY += offsetY;

    this.top = this.top - offsetY;
    this.left = this.left - offsetX;
  }

  drop() {
    this.isDragging = false;
    const leftAnchorDistance = this.leftAnchor - this.left;
    const topAnchorDistance = this.topAnchor - this.top;

    const onTargetDistanceLeft = Math.floor(leftAnchorDistance/this.tileSideLengthPx)*this.tileSideLengthPx;
    const onTargetDistanceTop  = Math.floor(topAnchorDistance /this.tileSideLengthPx)*this.tileSideLengthPx;

    const overShootDistanceLeft = onTargetDistanceLeft + this.tileSideLengthPx;
    const underShootDistanceLeft = onTargetDistanceLeft - this.tileSideLengthPx;

    const overShootDistanceTop = onTargetDistanceTop + this.tileSideLengthPx;
    const underShootDistanceTop = onTargetDistanceTop - this.tileSideLengthPx;

    const actualDistanceChangeLeft = this.closestToValue([
      onTargetDistanceLeft,
      overShootDistanceLeft,
      underShootDistanceLeft
    ], leftAnchorDistance);

    const actualDistanceChangeTop = this.closestToValue([ 
      overShootDistanceTop,
      underShootDistanceTop
    ], topAnchorDistance);
    // calculate how much to rotate the board.

    // apply changes to the board
    this.rotateBoard(actualDistanceChangeTop/this.tileSideLengthPx, actualDistanceChangeLeft/this.tileSideLengthPx);
    this.top = this.top + actualDistanceChangeTop;
    this.left = this.left + actualDistanceChangeLeft;

  }

  closestToValue(arr: number[], target: number): number {
    return arr.reduce((acc, x, index) => 
      index === 0 ? x :
      Math.abs(target - x) < Math.abs(target - acc) ? x : acc
    , 0);
  }

  setMode(val: boolean) {
    this.selectedMode = val;
  }

  updateBombsFound(isMarked: boolean) {
    if (isMarked) {
      this.bombsFound++;
    } else {
      this.bombsFound--;
    }
  }

  updateSafeFound() {
    this.safeFound += 1;
    if(this.safeFound === this.safeCount) {
      this.resultDialog.nativeElement.showModal();
    }
  }

  rotateBoard(rowRotation: number, colRotation: number) {
    let newTileBoard = [];
    for(let i = 0; i < this.numRows; i++) {
      let newRow = [];
      for(let j = 0; j < this.rowLength; j++) {
        newRow.push(this.tiles[(i + rowRotation + this.numRows) % this.numRows][(j + colRotation + this.rowLength) % this.rowLength]);
      }
      newTileBoard.push(newRow);
    }
    this.tiles = newTileBoard;


    // update row and col rotation values to new rotation after updating the board.
    this.rowRotation = (this.rowRotation + rowRotation + this.numRows) % this.numRows;
    this.colRotation = (this.colRotation + colRotation + this.rowLength) % this.rowLength;
  }

}
