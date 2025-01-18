import weapondata from "data/weapons/weapondata.json";

export type Weapon = {
  name: string;
  size: string;
  ac: number;
  hp: number;
  immunities: string[];
  description: string;
  properties: string[];
  weight: number;
  price: number;
  slots: number;
  actions?: number;
  range?: {
    normal: number;
    extended?: number;
  };
  area?: {
    size: number;
    shape: string;
    dc: number;
  };
  damage?: {
    base?: number;
    dice: string;
    diceamount: number;
    average: number;
    type?: string;
  };
  reload?: number;
  tohit?: number;
};

export function getWeapon(weapon: string): Weapon {
  const res = (weapondata as { [id: string]: Weapon })[weapon];

  if (!res) {
    throw new Error("Weapon " + weapon + " does not exist!");
  }

  return res;
}
