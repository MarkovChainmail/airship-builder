import ships from "../data/ships/shipdata.json";

export type Ship = {
  name: string;
  description: string;
  properties: string[];
  ac: number;
  hp: {
    max: number;
    dice: string;
    diceamount: number;
  };
  threshold: number;
  crew: {
    min: number;
    max: number;
  };
  passengers: number;
  size: {
    category: string;
    area: {
      length: number;
      width: number;
    };
  };
  initiative: number;
  tonnage: {
    total: number;
    hold: number;
  };
  weaponslots: number[];
  speed: {
    max: number;
    unit: number;
    engine: number;
    daily: number;
  };
  sailstations: number;
  price: number;
  fuel?: {
    tanks: {
      amount: number;
      size: string;
    };
    runtime: {
      amount: number;
      unit: string;
    };
  };
};

export function getShip(ship: string): Ship {
  const res = (ships as { [id: string]: Ship })[ship];

  if (!res) {
    throw new Error("Ship " + ship + " does not exist!");
  }

  return res;
}
