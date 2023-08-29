import Ship from '../components/Ship'
import { shipType } from '../types/shipTypes';
import { SHIPS } from '../types/Ships';

describe("Ship testing", () => {
    test("Ship is sunk, 5 length, 5 hits", () => {
        const s = new Ship(SHIPS.carrier.shipID, SHIPS.carrier.length, 5, false);
        expect(s.calculateIsSunk()).toBe(true)
    })
    test("Ship is not sunk, 5 length, 4 hits", () => {
        const s = new Ship(SHIPS.carrier.shipID, SHIPS.carrier.length, 4, false);
        expect(s.calculateIsSunk()).toBe(false)
    })
    test("Ship is not sunk, 5 length, 0 hits", () => {
        const s = new Ship(SHIPS.carrier.shipID, SHIPS.carrier.length, 0, false);
        expect(s.calculateIsSunk()).toBe(false)
    })
})

describe("Hits", () => {
    test("Takes 1 hit, (0 --> 1)", () => {
        const s = new Ship(SHIPS.carrier.shipID, SHIPS.carrier.length, 0, false);
        s.hit()
        expect(s.getTimesHit()).toBe(1)
    })
})