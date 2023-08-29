const SHIP_LENGTHS = {
    carrier: 5,
    battleship: 4,
    destroyer: 3,
    submarine: 3,
    patrolBoat: 2
}

export default class Ship {
    private id: number
    private length: number
    private timesHit: number
    private isSunk: boolean

    constructor(id: number, length: number, timesHit: number, isSunk: boolean) {
        this.id = id
        this.length = length
        this.timesHit = timesHit
        this.isSunk = isSunk
    }

    // Getters
    public getIsSunk(): boolean {
        return this.isSunk
    }

    public getTimesHit(): number {
        return this.timesHit
    }

    public getLength(): number {
        return this.length
    }

    public getId(): number {
        return this.id
    }

    calculateIsSunk(): boolean {
        if (this.timesHit === this.length) {
            this.isSunk = true;
            return true
        }
        return false;
    }



    hit(): number {
        this.timesHit++
        this.calculateIsSunk()
        // I might need to add something that checks if the ship sinks here? or this can be done externally
        return this.timesHit
    }
}