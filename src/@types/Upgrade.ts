import upgrades from "../data/upgrades/upgradedata.json";
import { Size } from "../enums/Size";

export type Upgrade = {
  name: string;
  price: {
    small: number;
    medium: number;
    large: number;
    huge: number;
    gargantuan: number;
  };
  rarity: string;
  weight: {
    small: number;
    medium: number;
    large: number;
    huge: number;
    gargantuan: number;
  };
  description: string;
  hp?: {
    small: number;
    medium: number;
    large: number;
    huge: number;
    gargantuan: number;
  };
  ac?: number;
  immunities?: string[];
  vulnerabilities?: string[];
};

export function getUpgrade(upgrade: string): Upgrade {
  const res = (upgrades as { [id: string]: Upgrade })[upgrade];

  if (!res) {
    throw new Error("Upgrade " + upgrade + " does not exist!");
  }

  return res;
}

export function deriveDnDObject(upgrade: Upgrade, size: Size): DnDObject {
  return {
    name: upgrade.name,
    description: upgrade.description,
    rarity: upgrade.rarity,
    ...(upgrade.ac && { ac: upgrade.ac }),
    ...(upgrade.hp && { hp: upgrade.hp[size] }),
    ...(upgrade.immunities && { immunities: upgrade.immunities }.immunities),
    ...(upgrade.vulnerabilities && {
      vulnerabilities: upgrade.vulnerabilities,
    }),
  };
}

export function getDnDObject(upgrade: string, size: Size) {
  return deriveDnDObject(getUpgrade(upgrade), size);
}
