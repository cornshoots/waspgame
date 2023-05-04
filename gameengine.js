//Basic class for a wasp, with a method for hitting that wasp that remove's the occurring damage from it's hitpoints

class Wasp {
    constructor(type, hitPoints, damage) {
        this.type = type;
        this.hitPoints = hitPoints;
        this.damage = damage;
    }

    hit() {
        this.hitPoints -= this.damage;
        // Ensure hit points do not go below zero
        if (this.hitPoints < 0) {
            this.hitPoints = 0;
        }
    }
}

//Class for a new game to be set up, values hardcoded for this excersise but could edit constructor to allow customised games, methods to hit wasps, check for game over

class WaspGame {
    constructor() {
        this.wasps = [
            new Wasp('Queen', 80, 7),
            ...Array(5).fill.map(() => new Wasp('Worker', 68, 10)),
            ...Array(8).fill.map(() => new Wasp('Drone', 60, 12))
        ];
    }

    hitWasp() {
        //Ensure dead wasps are not hit by discounting wasps with hitpoints at zero and ensuring a wasp is only selected within the new range
        const aliveWasps = this.wasps.filter(wasp => wasp.hitPoints > 0)
        const randomIndex = Math.floor(Math.random() * aliveWasps.length)
        const waspToHit = aliveWasps[randomIndex];
        waspToHit.hit();

        //Set all wasp hitpoints to zero if Queen's hp reaches zero
        if (waspToHit.type === 'Queen' && waspToHit.hitPoints === 0) {
            this.wasps.forEach(wasp => {
                wasp.hitPoints = 0;
            })
        }
    }

    isGameOver() {
        return this.wasps.every(wasp => wasp.hitPoints === 0);
    }
}