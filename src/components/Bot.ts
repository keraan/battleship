import Player from "./Player";
import Game from "./Game";
import Gameboard from "./Gameboard";
import Ship from "./Ship";

export class Bot extends Player {
    private game: Game
    private hasPlacedShips = false;

    constructor (id: number, board: Gameboard, game: Game) {
        super(id, board);  // Call the parent class's constructor
        this.game = game;
    }


    private sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    public async getMove() {
        let row = -1;
        let col = -1;
        
        while (!this.game.isValidAttack(row, col)) {
            await this.sleep((Math.random() * 2000) + 700);
            row = Math.floor((Math.random() * 100) % 7);
            col = Math.floor((Math.random() * 100) % 7);
        }
    
        return {row, col};
    }

    public placeShipsRandomly() {
        if (this.hasPlacedShips) return;
        const shipLengths = [5, 4, 3, 3, 2]; 
        for (let i = 1; i < 6; i++) {
            let placed = false;
    
            while (!placed) {
                const row = this.getRandomInt(0, 7 - 1);
                const col = this.getRandomInt(0, 7 - 1);
                const orientation = this.getRandomInt(0, 1);
                const ship = new Ship(i, shipLengths[i - 1], 0, false);
                if (this.game.getBoardTwo().validPlacement(ship.getLength(), row, col, orientation)) {
                    this.game.getBoardTwo().placeShip(ship, row, col, orientation)
                    placed = true
                }
            }
        }
        this.hasPlacedShips = true;
    }
    
      private getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
}