import Gameboard from "../components/Gameboard";
import Player from "../components/Player";

describe("Player tests", () => {
    test("Create new Player", () => {
        const board = new Gameboard(7)
        const p = new Player(1, board)
        expect(p.getId()).toBe(1)
        expect(p.getBoard()).toStrictEqual(board)
    })
})