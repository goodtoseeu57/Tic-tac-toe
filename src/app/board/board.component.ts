import { Component, OnInit, Input } from '@angular/core';
import { BoardCell } from '../boardCell';
import {PLAYER_HUMAN2} from '../player';
import {Location} from '@angular/common';

import {PLAYER_COMPUTER2} from '../player';


@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {




  constructor(private location: Location) { }



  get winningIndexes(): any[] {
    return [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]];
  }

  PLAYER_COMPUTER = { name: 'Nick', symbol: 'o' };
  PLAYER_HUMAN = { name: 'Chris', symbol: 'x' };
  DRAW = { name: 'Draw' };


  board = [];
  currentPlayer = this.PLAYER_HUMAN;
  lastWinner: any;
  gameOver: boolean;
  boardLocked: boolean;



  xIsNext: null;
  winner: null;
  private letters: string[];
  private rows: number[];




  private static getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;

  }

  pageReload() {
    location.reload();
  }

    ngOnInit() {
        this.newGame();
    }

    newGame() {

      this.letters = ['A', 'B', 'C'];
      this.rows = [1, 2, 3];
      this.letters.forEach((letter) => {
        this.rows.forEach((row) => {
          const boardCell = new BoardCell();
          boardCell.name = letter + row;
          boardCell.value = '';
          this.board.push(boardCell);
        });
      });
      this.gameOver = false;
      this.boardLocked = false;


    }


    square_click(square) {
      if (square.value === '' && !this.gameOver) {
        if (this.currentPlayer === this.PLAYER_HUMAN) {
          square.value = this.PLAYER_HUMAN.symbol;
          this.completeMove(this.PLAYER_HUMAN);
          this.currentPlayer = this.PLAYER_COMPUTER;
        } else if ( this.currentPlayer === this.PLAYER_COMPUTER) {
          square.value = this.PLAYER_COMPUTER.symbol;
          this.completeMove(this.PLAYER_COMPUTER);
          this.currentPlayer = this.PLAYER_HUMAN;
        } else {
          console.log('Something is wrong');
        }
      }

    }


  completeMove(player) {
    if (this.isWinner(player.symbol)) {
      this.showGameOver(player);
    } else if (!this.availableSquaresExist()) {
      this.showGameOver(this.DRAW);
 } else { console.log('do nothing');
    }
  }

  availableSquaresExist(): boolean {
    return this.board.filter(s => !s.value).length > 0;
  }


  showGameOver(winner) {
    this.gameOver = true;
    this.lastWinner = winner;

    if (winner !== this.DRAW) {
      this.currentPlayer = winner;
    }
  }

  isWinner(symbol): boolean {
    for (const pattern of this.winningIndexes) {
      const foundWinner = this.board[pattern[0]].value === symbol
        && this.board[pattern[1]].value === symbol
        && this.board[pattern[2]].value === symbol;

      if (foundWinner) {
        for (const index of pattern) {
          this.board[index].winner = true;
        }

        return true;
      }
    }

    return false;
  }
}

