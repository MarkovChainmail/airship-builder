import oiltankdata from "data/upgrades/oiltankdata.json";

export type OilTank = {
  name: string;
  price: {
    small: number;
    medium: number;
    large: number;
    huge: number;
    gargantuan: number;
    titan: number;
  };
  rarity: string;
  weight: {
    small: number;
    medium: number;
    large: number;
    huge: number;
    gargantuan: number;
    titan: number;
  };
  content: {
    small: number;
    medium: number;
    large: number;
    huge: number;
    gargantuan: number;
    titan: number;
  };
  description: string;
};

export function getOilTank(): OilTank {
  return oiltankdata as OilTank;
}
