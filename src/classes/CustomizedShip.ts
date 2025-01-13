import { Ship } from "../@types/Ship";
import {Loadout} from "./Loadout"
import * as ArmorFunctions from '../functions/ArmorFunctions';
import { Upgrades } from "./Upgrades";
import { parseSize, Size } from "../enums/Size";
import { Fuel } from "./Fuel";
import { Propulsion } from "./Propulsion";

export class CustomizedShip {
    base: Ship;
    loadout: Loadout
    upgrades: Upgrades
    fuel?: Fuel
    propulsion?: Propulsion

    constructor(ship: Ship) {
        this.base = ship
        this.loadout = new Loadout(ship.weaponslots)
        this.upgrades = new Upgrades(this.loadout.bow, ship.properties.includes('sails'))
        
        if (ship.fuel) {
            this.fuel = new Fuel(ship.fuel)
            this.propulsion = new Propulsion(ship.properties.includes('peddles'), false)
        }
        
    }

    AC() {
        return ArmorFunctions.calculateAC(this.upgrades.armor, this.base.ac)
    }

    HP() {
        return ArmorFunctions.calculateHP(this.upgrades.armor, this.base.hp.max)
    }

    hitdice() {
        return ArmorFunctions.calculateHP(this.upgrades.armor, this.base.hp.diceamount) + this.base.hp.dice
    }

    maxspeed() {
        return ArmorFunctions.calculateSpeed(this.upgrades.armor, this.base.speed.max)
    }

    enginespeed() {
        return ArmorFunctions.calculateSpeed(this.upgrades.armor, this.base.speed.engine)
    }

    dailyspeed() {
        return ArmorFunctions.calculateSpeed(this.upgrades.armor, this.base.speed.daily)
    }

    sailstationspeed() {
        return ArmorFunctions.calculateSpeed(this.upgrades.armor, this.base.speed.unit)
    }

    threshold() {
        return ArmorFunctions.calculateThreshold(this.upgrades.armor, this.base.threshold, this.base.size.category)
    }

    size(): Size {
        // Return enum if JSON is well-written
        return parseSize(this.base.size.category)
    }

    weight() {
        var weight = this.loadout.weight() + this.upgrades.weight(this.size()) 
        if (this.fuel) {
            weight += this.fuel.weight()
        }
        if (this.propulsion) {
            weight += this.propulsion.weight(this.size())
        }
        return weight
    }

    price() {
        var price = this.base.price + this.loadout.price() + this.upgrades.price(this.size())
        if (this.fuel) {
            price += this.fuel.price()
        }
        if (this.propulsion) {
            price += this.propulsion.price(this.size())
        }
        return price
    }
}