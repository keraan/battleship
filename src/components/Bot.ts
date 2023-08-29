import Player from "./Player";
import Game from "./Game";
import Gameboard from "./Gameboard";

export class Bot extends Player {
    private game: Game

    constructor (id: number, board: Gameboard, game: Game) {
        super(id, board);  // Call the parent class's constructor
        this.game = game;
    }


    private sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    public async getMove() {
        let row = 0;
        let col = 0;
        
        while (!this.game.isValidAttack(row, col)) {
            await this.sleep((Math.random() * 2000) + 700);
            row = Math.floor((Math.random() * 100) % 7);
            col = Math.floor((Math.random() * 100) % 7);
        }
    
        return {row, col};
    }
}