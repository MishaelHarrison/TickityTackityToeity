import { Component, Input } from '@angular/core';

const winnableLines: number[][] =
  [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {

  grid: String[] = 
  [
    ' ', ' ', ' ',
    ' ', ' ', ' ',
    ' ', ' ', ' ',
  ];

  winners: number[] = [];

  @Input() isRobot: boolean = true;
  currentTurn: 'X' | 'O' = 'X';
  endState: boolean = false;
  isDraw: boolean = false;
  isWin: boolean = false;

  play(i: number){
    if(this.endState){
      this.grid = this.grid.map(x=>' ');
      this.currentTurn = 'X';
      this.endState = false;
      this.isDraw = false;
      this.isWin = false;
      this.winners = [];
      return;
    }
    if(this.grid[i] !== ' ') return;
    this.grid[i] = this.currentTurn;
    if(this.currentTurn === 'X') this.currentTurn = 'O';
    else this.currentTurn = 'X';
    this.checkWin();
    if(this.isRobot && !this.endState){
      this.currentTurn = 'X';
      this.robotPlay();
      this.checkWin();
    }
  }

  checkWin(){
    if(this.isWinGrid(this.grid) !== ' '){
      this.endState = true;
      this.isWin = true;
    }
    if(this.fullBoard()){
      this.endState = true;
      this.isDraw = true;
    }
  }

  fullBoard(): boolean{
    for(let i=0;i<9;i++)
      if(this.grid[i] === ' ')
        return false;
    return true;
  }

  isWinGrid(grid: String[]): String{
    for(let x of winnableLines){
      if(
        grid[x[0]] !== ' ' &&
        grid[x[0]] === grid[x[1]] &&
        grid[x[0]] === grid[x[2]])
      {
        this.winners = [...x];
        return grid[x[0]];
      }
    }
    return ' ';
  }

  robotPlay(){
    for(let i=0;i<9;i++){
      if(this.grid[i] !== ' ') continue;
      let grid: String[] = [...this.grid];
      grid[i] = 'O';
      if(this.isWinGrid(grid) === 'O'){
        this.grid = grid;
        return;
      }
    }

    for(let i=0;i<9;i++){
      if(this.grid[i] !== ' ') continue;
      let grid: String[] = [...this.grid];
      grid[i] = 'X';
      if(this.isWinGrid(grid) === 'X'){
        grid[i] = 'O';
        this.grid = grid;
        return;
      }
    }

    let numBlanks: number = 0;
    this.grid.forEach(x=>{
      if(x === ' ') numBlanks++;
    });
    let play: number = Math.floor(Math.random() * numBlanks);
    for(let i=0;;i++){
      if(this.grid[i] === ' '){
        if(play === 0){
          this.grid[i] = 'O';
          return;
        }
        play--;
      }
    }
  }

}
