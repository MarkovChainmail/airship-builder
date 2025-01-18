import { getUpgrade } from "../@types/Upgrade";
import { Size } from "../enums/Size";

export class Propulsion {
  peddles: boolean;
  core: boolean;
  extraengines: number;

  constructor(peddles: boolean, core: boolean) {
    this.peddles = peddles;
    this.core = core;
    this.extraengines = 0;
  }

  toString() {
    var res = "";

    if (this.core) {
      res += "Magic Core Engine";
    } else {
      res += "Whale Oil Engine";
    }

    if (this.extraengines) {
      res += " with " + this.extraengines + " backup engines";
    }

    return res;
  }

  addEngine() {
    this.extraengines++;
  }

  subtractEngine() {
    this.extraengines--;
  }

  getUpgrades() {
    var list = [];
    if (this.peddles) {
      list.push(getUpgrade("Peddles System"));
    }
    if (this.core) {
      list.push(getUpgrade("Magic Core"));
    }
    for (const _ in [...Array(this.extraengines).keys()]) {
      list.push(getUpgrade("Whale Oil Engine"));
    }
    return list;
  }

  weight(size: Size) {
    return this.getUpgrades()
      .map((u) => u.weight[size])
      .reduce((a, b) => a + b, 0);
  }

  price(size: Size) {
    return this.getUpgrades()
      .map((u) => u.price[size])
      .reduce((a, b) => a + b, 0);
  }
}
