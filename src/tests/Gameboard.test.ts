import Gameboard from "../components/Gameboard";
import Ship from "../components/Ship";
import { shipType } from "../types/shipTypes";
import { SHIPS } from "../types/Ships";
import { DIRECTION } from "../types/directions";



const testBoardState1 = [
    [1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
]

const testBoardState2 = [
    [1, 1, 1, 1, 1, 0, 0],
    [2, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
]

const testBoardState3 = [
    [1, 1, 1, -1, -1, -8, 0],
    [2, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
]

const emptyBoard = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
]

describe("Gameboard tests", () => {
    const board = new Gameboard(7)
    test("Invalid placement: 5, (0, 0) LEFT", () => {
        expect(board.validPlacement(5, 0, 0, DIRECTION.LEFT)).toBe(false)
    })
    test("Valid placement: 5, (0, 0) RIGHT", () => {
        expect(board.validPlacement(5, 0, 0, DIRECTION.RIGHT)).toBe(true)
    })
    test("Carrier: (0, 0) RIGHT", () => {
        //board.placeShip(SHIPS.carrier, 0, 0, DIRECTION.RIGHT)
        expect(board.getBoardState()).toStrictEqual(testBoardState1)
    })
    test("Battleship: (1, 0) DOWN", () => {
        //board.placeShip(SHIPS.battleship, 1, 0, DIRECTION.DOWN)
        expect(board.getBoardState()).toStrictEqual(testBoardState2)
    })
    test("Overlapping ships: Destroyer: (0, 3) DOWN (SHOULD FAIL)", () => {
        //expect(board.placeShip(SHIPS.destroyer, 0, 3, DIRECTION.DOWN)).toBe(false)
        expect(board.getBoardState()).toStrictEqual(testBoardState2)
    })
    test("Attack on carrier, miss on right", () => {
        board.receiveAttack(0, 3);
        expect(board.getShips()[1].getTimesHit()).toBe(1)
        board.receiveAttack(0, 4);
        expect(board.getShips()[1].getTimesHit()).toBe(2)
        board.receiveAttack(0, 5);
        expect(board.getShips()[1].getTimesHit()).toBe(2)
        expect(board.getBoardState()).toStrictEqual(testBoardState3)
        expect(board.checkGameEnd()).toBe(false)
    })
    test("game end", () => {
        board.receiveAttack(0, 0)
        board.receiveAttack(0, 1)
        board.receiveAttack(0, 2)
        board.receiveAttack(1, 0)
        board.receiveAttack(2, 0)
        board.receiveAttack(3, 0)
        board.receiveAttack(4, 0)
        expect(board.checkGameEnd()).toBe(true)
    })
})


