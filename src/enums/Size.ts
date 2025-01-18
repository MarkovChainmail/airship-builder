export enum Size {
  small = "small",
  medium = "medium",
  large = "large",
  huge = "huge",
  gargantuan = "gargantuan",
}

export enum WhaleOilTankSize {
  small = "small",
  medium = "medium",
  large = "large",
  huge = "huge",
  gargantuan = "gargantuan",
  titan = "titan",
}

export function parseSize(size: string) {
  for (const value of Object.values(Size)) {
    if (size == value) {
      return value;
    }
  }
  throw Error("Size: " + size + " does not exist!");
}

export function isSize(size: string) {
  for (const value of Object.values(Size)) {
    if (size == value) {
      return true;
    }
  }
  return false;
}

export function parseTankSize(size: string) {
  for (const value of Object.values(WhaleOilTankSize)) {
    if (size == value) {
      return value;
    }
  }
  throw Error("Tank size: " + size + " does not exist!");
}

export function getOilSizesForShip(size: Size) {
  const index = Object.keys(Size).indexOf(size);
  return Object.keys(WhaleOilTankSize)
    .slice(Math.max(0, index - 2), index + 3)
    .map((s) => parseTankSize(s));
}
