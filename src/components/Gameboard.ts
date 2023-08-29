import { DIRECTION } from "../types/directions";
import Ship from "./Ship";


const MISSED_ATTACK = -8


export default class Gameboard {
    private board: number[][]
    private ships: Ship[] = []

    constructor (size: number) {
        // Creates a size x size board.
        this.board = new Array(size).fill(null).map(() => new Array(size).fill(0));
    }

    // GETTERS
    public getShips(): Ship[] {
        return this.ships
    }

    public getBoardState(): number[][] {
        return this.board
    }

    public getCell(row: number, col: number) {
        return this.board[row][col]
    }

    public validPlacement(length: number, row: number, col: number, dir: DIRECTION): boolean {
        let newRow = row;
        let newCol = col;
        for (let i = 0; i < length; i++) {
            if (newRow < 0 || newRow >= this.board.length || newCol < 0 || newCol >= this.board.length) {
                return false;
            }
            // Check for existing ship; assuming 1 represents an occupied cell
            if (this.board[newRow][newCol] > 0) {
                    return false;
            }
            if (dir === DIRECTION.LEFT) {
                newCol--;
            } else if (dir === DIRECTION.UP) {
                newRow--;
            } else if (dir === DIRECTION.RIGHT) {
                newCol++;
            } else if (dir === DIRECTION.DOWN) {
                newRow++;
            }
        }
        return true;
    }

    

    public placeShip(ship: Ship, row: number, col: number, dir: number): boolean {
        if (!this.validPlacement(ship.getLength(), row, col, dir)) {
            console.log("Invalid placement");
            return false
        }

        this.ships[ship.getId()] = ship
        let newRow = row
        let newCol = col
        for (let i = 0; i < ship.getLength(); i++) {
            this.board[newRow][newCol] = ship.getId()
            if (dir === DIRECTION.LEFT) {
                newCol--;
            } else if (dir === DIRECTION.UP) {
                newRow--;
            } else if (dir === DIRECTION.RIGHT) {
                newCol++;
            } else if (dir === DIRECTION.DOWN) {
                newRow++;
            }
        }
        return true;
    }


    // every attack will change the board state to -1
    public receiveAttack(row: number, col: number) {
        // this logic may need to be altered to support game looping
        const attackedSpot = this.board[row][col]
        if (attackedSpot < 0) {
            console.log("already attacked here??!")
            return;
        }

        const attackedShip = this.ships[attackedSpot]
        if (attackedSpot === 0) {
            this.board[row][col] = MISSED_ATTACK
            console.log("landed in water")
            return false
        } else {
            this.board[row][col] = attackedSpot * -1 // invert this to negative to show its hit
            attackedShip.hit()
            return true
        }

    }

    public checkGameEnd() {
        for (let i = 1; i < this.ships.length; i++) {
            const ship = this.ships[i]
            if (this.ships[i] === undefined) return false;
            if (!ship.getIsSunk()) return false;
        }

        return true;
    }

    

}