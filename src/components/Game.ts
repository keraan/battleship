import Player from "./Player"
import Gameboard from "./Gameboard"
import { Bot } from "./Bot"

// type GameTypes = {
//     player1: Player,
//     player2: Player,
//     board1: Gameboard,
//     board2: Gameboard
// }

export default class Game {
    private turn: number
    private player1: Player
    private player2: Player
    private board1: Gameboard
    private board2: Gameboard

    // constructor ({player1, board1, player2, board2}: GameTypes) {
    //     this.turn = 1 // whos turn it is
    //     this.player1 = player1
    //     this.player2 = player2
    //     this.board1 = board1
    //     this.board2 = board2
    // } 
    constructor () {
        this.turn = 1 // Means that it will be player 1's turn at first.
        this.board1 = new Gameboard(7)
        this.board2 = new Gameboard(7)
        this.player1 = new Player(1, this.board1)
        // this.player2 = new Player(2, this.board2)
        this.player2 = new Bot(2, this.board2, this)
    }

    public getPlayerOne() {
        return this.player1
    }

    public getPlayerTwo() {
        return this.player2
    }

    public getTurn() {
        return this.turn
    }

    public getBoardOne() {
        return this.board1
    }

    public getBoardTwo() {
        return this.board2
    }

    public isValidAttack(row: number, col: number): boolean {
        //const currentPlayer = this.turn === 1 ? this.player1 : this.player2
        const opposingBoard = this.turn === 1 ? this.board2 : this.board1

        if (opposingBoard.getCell(row, col) < 0) return false
        return true
    }

    public startTurn(row: number, col: number): boolean {
        //const currentPlayer = this.turn === 1 ? this.player1 : this.player2
        const opposingBoard = this.turn === 1 ? this.board2 : this.board1

         // now current player gets to pick a move
        // lets just hardcode this for now.

        if (opposingBoard.receiveAttack(row, col)) {
            // this.switchTurn()
            return true
        } else {
            return false
        }
    }

    public gameOver(): number {
        if (this.board1.checkGameEnd()) return 2; // All ships on BOARD 1 are destroyed
        if (this.board2.checkGameEnd()) return 1; // All ships on BOARD 2 are destroyed

        return 0;
    }

    public switchTurn() {
        this.turn = this.turn === 1 ? 2 : 1
    }
}