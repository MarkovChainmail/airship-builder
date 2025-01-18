import { getUpgrade, Upgrade } from "../@types/Upgrade";
import { ArmorType } from "../enums/ArmorType";
import { MagicShieldType } from "../enums/MagicShieldType";
import { SailsType } from "../enums/SailsType";
import { Size } from "../enums/Size";
import { BowContainer } from "./Loadout";

export class Upgrades {
  armor: ArmorType;
  kiteshield: boolean;
  sails?: SailsType;
  magicshield: MagicShieldType;
  teleportationcircle: boolean;
  autopilot: boolean;

  bow: BowContainer;

  constructor(bow: BowContainer, hasSails: boolean) {
    this.armor = ArmorType.medium;
    this.kiteshield = false;
    this.bow = bow;
    if (hasSails) this.sails = SailsType.canvas;
    this.magicshield = MagicShieldType.none;
    this.teleportationcircle = false;
    this.autopilot = false;
  }

  setArmorLight() {
    this.armor = ArmorType.light;
  }

  setArmorMedium() {
    this.armor = ArmorType.medium;
  }

  setArmorHeavy() {
    this.armor = ArmorType.heavy;
  }

  setKiteShieldTrue() {
    this.kiteshield = true;
    this.bow.installKiteShield();
  }

  setKiteShieldFalse() {
    this.kiteshield = false;
    this.bow.uninstallKiteShield();
  }

  setSailsCanvas() {
    this.sails = SailsType.canvas;
  }

  setSailsLinen() {
    this.sails = SailsType.linen;
  }

  setSailsSolar() {
    this.sails = SailsType.solar;
  }

  setMagicShieldNone() {
    this.magicshield = MagicShieldType.none;
  }

  setMagicShieldSpell() {
    this.magicshield = MagicShieldType.spell;
  }

  setMagicShieldArcane() {
    this.magicshield = MagicShieldType.arcane;
  }

  setAutoPilotFalse() {
    this.autopilot = false;
  }

  setAutoPilotTrue() {
    this.autopilot = true;
  }

  setTeleportationCircleFalse() {
    this.teleportationcircle = false;
  }

  setTeleportationCircleTrue() {
    this.teleportationcircle = true;
  }

  getUpgrades() {
    var list: Upgrade[] = [];
    switch (this.armor) {
      case ArmorType.light:
        list.push(getUpgrade("Light Hull Armor"));
        break;
      case ArmorType.medium:
        list.push(getUpgrade("Medium Hull Armor"));
        break;
      case ArmorType.heavy:
        list.push(getUpgrade("Heavy Hull Armor"));
        break;
    }
    if (this.kiteshield) {
      list.push(getUpgrade("Kite Shield"));
    }
    if (this.sails) {
      switch (this.sails) {
        case SailsType.canvas:
          list.push(getUpgrade("Sails (Canvas)"));
          break;
        case SailsType.linen:
          list.push(getUpgrade("Sails (Linen)"));
          break;
        case SailsType.solar:
          list.push(getUpgrade("Solar Sails"));
          break;
      }
    }

    switch (this.magicshield) {
      case MagicShieldType.none:
        break;
      case MagicShieldType.arcane:
        list.push(getUpgrade("Arcane Shield"));
        break;
      case MagicShieldType.spell:
        list.push(getUpgrade("Spell Shield"));
        break;
    }

    if (this.autopilot) {
      list.push(getUpgrade("Automated Pilot"));
    }

    if (this.teleportationcircle) {
      list.push(getUpgrade("Teleportation Circle"));
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
