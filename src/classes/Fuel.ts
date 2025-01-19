import { keyBy } from "lodash";
import { getOilTank } from "../@types/OilTank";
import { parseTankSize, WhaleOilTankSize } from "../enums/Size";

type Tanks = {
  [key in WhaleOilTankSize]: number;
};

export class Fuel {
  baseTanksAmt: number;
  baseTanksSize: WhaleOilTankSize;
  baseTanksRemoved: number;
  runtimeAmt: number;
  runtimeUnit: string;
  additionalTanks: Tanks;

  constructor(fuel: {
    tanks: { amount: number; size: string };
    runtime: { amount: number; unit: string };
  }) {
    this.baseTanksAmt = fuel.tanks.amount;
    this.baseTanksSize = parseTankSize(fuel.tanks.size);
    this.baseTanksRemoved = 0;
    this.runtimeAmt = fuel.runtime.amount;
    this.runtimeUnit = fuel.runtime.unit;
    this.additionalTanks = {
      small: 0,
      medium: 0,
      large: 0,
      huge: 0,
      gargantuan: 0,
      titan: 0,
    };
  }

  usagePerTimeUnit() {
    return this.baseFuelCapacity() / this.runtimeAmt;
  }

  timePerFuelTon() {
    return this.runtimeAmt / this.baseFuelCapacity();
  }

  baseFuelCapacity() {
    return getOilTank().content[this.baseTanksSize] * this.baseTanksAmt;
  }

  baseFuelModifiedCapacity() {
    return (
      getOilTank().content[this.baseTanksSize] *
      (this.baseTanksAmt - this.baseTanksRemoved)
    );
  }

  additionalCapacity() {
    const oiltank = getOilTank();
    return Object.entries(this.additionalTanks)
      .map(([key, value]) => (oiltank.content as any)[key] * value)
      .reduce((a, b) => a + b);
  }

  totalCapacity() {
    return this.baseFuelModifiedCapacity() + this.additionalCapacity();
  }

  baseRuntime() {
    return {
      amount: this.runtimeAmt * this.baseTanksAmt,
      unit: this.runtimeUnit,
    };
  }

  modifiedBaseRuntime() {
    return this.baseFuelModifiedCapacity() * this.timePerFuelTon();
  }

  totalRuntime() {
    return {
      amount:
        this.modifiedBaseRuntime() +
        this.timePerFuelTon() * this.additionalCapacity(),
      unit: this.runtimeUnit,
    };
  }

  addTank(size: WhaleOilTankSize) {
    if (size == this.baseTanksSize && this.baseTanksRemoved > 0) {
      this.baseTanksRemoved--;
    } else {
      this.additionalTanks[size]++;
    }
  }

  removeTank(size: WhaleOilTankSize) {
    if (
      size == this.baseTanksSize &&
      this.baseTanksRemoved < this.baseTanksAmt &&
      this.additionalTanks[size] == 0
    ) {
      this.baseTanksRemoved++;
    } else {
      this.additionalTanks[size]--;
    }
  }

  hasAdditional(size: WhaleOilTankSize) {
    return this.additionalTanks[size];
  }

  hasTotal(size: WhaleOilTankSize) {
    if (this.baseTanksSize == size) {
      return this.baseTanksAmt - this.baseTanksRemoved + this.additionalTanks[size];
    }
    return this.additionalTanks[size];
  }

  weight() {
    const oiltank = getOilTank();
    return Object.entries(this.additionalTanks)
      .map(([key, value]) => (oiltank.weight as any)[key] * value)
      .reduce((a, b) => a + b);
  }

  price() {
    const oiltank = getOilTank();
    return Object.entries(this.additionalTanks)
      .map(([key, value]) => (oiltank.price as any)[key] * value)
      .reduce((a, b) => a + b);
  }
}
