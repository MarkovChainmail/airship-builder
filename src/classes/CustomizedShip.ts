import { getShip, Ship } from "../@types/Ship";
import { Loadout } from "./Loadout";
import * as ArmorFunctions from "../functions/ArmorFunctions";
import { Upgrades } from "./Upgrades";
import { parseSize, Size } from "../enums/Size";
import { Fuel } from "./Fuel";
import { Propulsion } from "./Propulsion";

export class CustomizedShip {
  base: Ship;
  loadout: Loadout;
  upgrades: Upgrades;
  fuel?: Fuel;
  propulsion?: Propulsion;

  private constructor() {
    this.base = {} as Ship;
    this.loadout = {} as Loadout;
    this.upgrades = {} as Upgrades;
  }

  public static fromScratch(ship: Ship): CustomizedShip {
    const obj = new CustomizedShip();
    obj.base = ship;
    obj.loadout = Loadout.fromScratch(ship.weaponslots, ship.name == "Brig");
    obj.upgrades = Upgrades.fromScratch(
      obj.loadout.bow,
      ship.properties.includes("sails"),
    );

    if (ship.fuel) {
      obj.fuel = Fuel.fromScratch(ship.fuel);
      obj.propulsion = Propulsion.fromScratch(
        ship.properties.includes("peddles"),
        false,
      );
    }
    return obj;
  }

  public static fromJSON(json: any): CustomizedShip {
    const obj = CustomizedShip.fromScratch(getShip(json.base.name));

    obj.loadout = Loadout.fromJSON(json.loadout);
    obj.upgrades = Upgrades.fromJSON(obj.loadout.bow, json.upgrades);

    if (json.base.fuel) {
      obj.fuel = Fuel.fromJSON(json.fuel);
      obj.propulsion = Propulsion.fromJSON(json.propulsion);
    }

    return obj
  }

  AC() {
    return ArmorFunctions.calculateAC(this.upgrades.armor, this.base.ac);
  }

  HP() {
    return ArmorFunctions.calculateHP(this.upgrades.armor, this.base.hp.max);
  }

  hitdice() {
    return (
      ArmorFunctions.calculateHP(this.upgrades.armor, this.base.hp.diceamount) +
      this.base.hp.dice
    );
  }

  maxspeed() {
    return ArmorFunctions.calculateSpeed(
      this.upgrades.armor,
      this.base.speed.max,
    );
  }

  enginespeed() {
    return ArmorFunctions.calculateSpeed(
      this.upgrades.armor,
      this.base.speed.engine,
    );
  }

  dailyspeed() {
    return ArmorFunctions.calculateSpeed(
      this.upgrades.armor,
      this.base.speed.daily,
    );
  }

  sailstationspeed() {
    return ArmorFunctions.calculateSpeed(
      this.upgrades.armor,
      this.base.speed.unit,
    );
  }

  threshold() {
    return ArmorFunctions.calculateThreshold(
      this.upgrades.armor,
      this.base.threshold,
      this.base.size.category,
    );
  }

  size(): Size {
    // Return enum if JSON is well-written
    return parseSize(this.base.size.category);
  }

  weight() {
    let weight = this.loadout.weight() + this.upgrades.weight(this.size());
    if (this.fuel) {
      weight += this.fuel.weight();
    }
    if (this.propulsion) {
      weight += this.propulsion.weight(this.size());
    }
    return weight;
  }

  price() {
    let price =
      this.base.price + this.loadout.price() + this.upgrades.price(this.size());
    if (this.fuel) {
      price += this.fuel.price();
    }
    if (this.propulsion) {
      price += this.propulsion.price(this.size());
    }
    return price;
  }
}
