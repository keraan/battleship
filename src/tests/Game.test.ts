import Game from "../components/Game";
import { SHIPS } from "../types/Ships";
import { DIRECTION } from "../types/directions";

const t1B1 =  [
    [1, 1, 1, 1, 1, 0, 0],
    [2, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 3, 0, 0, 0],
    [2, 0, 0, 3, 0, 0, 0],
    [2, 0, 0, 3, 0, 0, 0],
    [0, 0, 5, 5, 0, 0, 0],
    [0, 0, 0, 0, 4, 4, 4]
]

describe("Full Game Test", () => {
    const game = new Game()
    // game.board1.placeShip(SHIPS.carrier, 0, 0, DIRECTION.RIGHT)
    // game.board1.placeShip(SHIPS.battleship, 1, 0, DIRECTION.DOWN)
    // game.board1.placeShip(SHIPS.destroyer, 4, 3, DIRECTION.UP)
    // game.board1.placeShip(SHIPS.submarine, 6, 6, DIRECTION.LEFT)
    // game.board1.placeShip(SHIPS.patrolBoat, 5, 2, DIRECTION.RIGHT)

    

    test("Test One", () => {
        expect(game.getBoardOne().getBoardState()).toStrictEqual(t1B1)
        const p1 = game.getPlayerOne()
        console.log(p1.getBoard())
        const p2 = game.getPlayerTwo()
        console.log(p2.getBoard())
    })
})