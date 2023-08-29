import Gameboard from "./Gameboard"

export default class Player {
    private id: number
    private board: Gameboard

    constructor(id: number, board: Gameboard) {
        this.id = id
        this.board = board
    }

    public getId(): number {
        return this.id
    }

    public getBoard(): Gameboard {
        return this.board
    }

}