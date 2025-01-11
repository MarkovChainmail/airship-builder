import { keyBy } from "lodash";
import { getOilTank } from "../@types/OilTank";
import { parseTankSize, WhaleOilTankSize } from "../enums/Size"

type Tanks = {
    [key in WhaleOilTankSize]: number;
};

export class Fuel {
    baseTanksAmt: number
    baseTanksSize: WhaleOilTankSize
    runtimeAmt: number
    runtimeUnit: string
    additionalTanks: Tanks

    constructor(fuel : {tanks: {amount: number, size: string}, runtime: {amount: number, unit: string}}) {
        this.baseTanksAmt = fuel.tanks.amount
        this.baseTanksSize = parseTankSize(fuel.tanks.size)
        this.runtimeAmt = fuel.runtime.amount
        this.runtimeUnit = fuel.runtime.unit
        this.additionalTanks = {
            "small": 0,
            "medium": 0,
            "large": 0,
            "huge": 0,
            "gargantuan": 0,
            "titan": 0
        }
    }

    usagePerTimeUnit() {
        return this.baseFuelCapacity() / this.runtimeAmt
    }

    timePerFuelTon() {
        return this.runtimeAmt / this.baseFuelCapacity()
    }

    baseFuelCapacity() {
        return getOilTank().content[this.baseTanksSize] * this.baseTanksAmt
    }

    additionalCapacity() {
        const oiltank = getOilTank()
        return Object.entries(this.additionalTanks).map(([key, value]) => (oiltank.content as any)[key] * value).reduce((a,b)=>a+b)
    }

    totalCapacity() {
        return this.baseFuelCapacity() + this.additionalCapacity()
    }

    baseRuntime() {
        return {
            amount: this.runtimeAmt * this.baseTanksAmt,
            unit: this.runtimeUnit
        }
    }

    totalRuntime() {
        return {
            amount: this.baseRuntime().amount + this.timePerFuelTon() * this.additionalCapacity(),
            unit: this.runtimeUnit
        }
    }

    addTank(size: WhaleOilTankSize) {
        this.additionalTanks[size]++
    }

    removeTank(size: WhaleOilTankSize) {
        this.additionalTanks[size]--
    }

    hasAdditional(size: WhaleOilTankSize) {
        return this.additionalTanks[size]
    }

    hasTotal(size: WhaleOilTankSize) {
        if (this.baseTanksSize == size) {
            return this.baseTanksAmt + this.additionalTanks[size]
        }
        return this.additionalTanks[size]
    }

    weight() {
        const oiltank = getOilTank()
        return Object.entries(this.additionalTanks).map(([key, value]) => (oiltank.weight as any)[key] * value).reduce((a,b)=>a+b)
    }

    price() {
        const oiltank = getOilTank()
        return Object.entries(this.additionalTanks).map(([key, value]) => (oiltank.price as any)[key] * value).reduce((a,b)=>a+b)
    }

}