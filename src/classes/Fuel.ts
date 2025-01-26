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

  private constructor() {
    this.baseTanksAmt = 0;
    this.baseTanksSize = WhaleOilTankSize.small;
    this.baseTanksRemoved = 0;
    this.runtimeAmt = 0;
    this.runtimeUnit = "";
    this.additionalTanks = {
      small: 0,
      medium: 0,
      large: 0,
      huge: 0,
      gargantuan: 0,
      titan: 0,
    };
  }

  public static fromScratch(fuel: {
    tanks: { amount: number; size: string };
    runtime: { amount: number; unit: string };
  }): Fuel {
    const obj = new Fuel();
    obj.baseTanksAmt = fuel.tanks.amount;
    obj.baseTanksSize = parseTankSize(fuel.tanks.size);
    obj.baseTanksRemoved = 0;
    obj.runtimeAmt = fuel.runtime.amount;
    obj.runtimeUnit = fuel.runtime.unit;
    obj.additionalTanks = {
      small: 0,
      medium: 0,
      large: 0,
      huge: 0,
      gargantuan: 0,
      titan: 0,
    };
    return obj;
  }

  public static fromJSON(json: any) {
    const obj = new Fuel();
    obj.baseTanksAmt = json.baseTanksAmt;
    obj.baseTanksSize = parseTankSize(json.baseTanksSize);
    obj.baseTanksRemoved = json.baseTanksRemoved;
    obj.runtimeAmt = json.runtimeAmt;
    obj.runtimeUnit = json.runtimeUnit;
    obj.additionalTanks = {
      small: json.additionalTanks.small,
      medium: json.additionalTanks.medium,
      large: json.additionalTanks.large,
      huge: json.additionalTanks.huge,
      gargantuan: json.additionalTanks.gargantuan,
      titan: json.additionalTanks.titan,
    };
    return obj;
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
      return (
        this.baseTanksAmt - this.baseTanksRemoved + this.additionalTanks[size]
      );
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
