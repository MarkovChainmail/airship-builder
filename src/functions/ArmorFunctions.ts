import { ArmorType } from "../enums/ArmorType";

export function calculateAC(currentarmor: ArmorType, ac: number) {
  if (currentarmor == ArmorType.light) {
    return ac - 2;
  } else if (currentarmor == ArmorType.heavy) {
    return ac + 2;
  } else {
    return ac;
  }
}

export function calculateHP(currentarmor: ArmorType, hp: number) {
  if (currentarmor == ArmorType.light) {
    return Math.floor(0.8 * hp);
  } else if (currentarmor == ArmorType.heavy) {
    return Math.floor(1.2 * hp);
  } else {
    return hp;
  }
}

export function calculateSpeed(currentarmor: ArmorType, maxspeed: number) {
  if (currentarmor == ArmorType.light) {
    return Math.ceil((1.2 * maxspeed) / 5) * 5;
  } else if (currentarmor == ArmorType.heavy) {
    return Math.ceil((0.8 * maxspeed) / 5) * 5;
  } else {
    return maxspeed;
  }
}

export function calculateThreshold(
  currentarmor: ArmorType,
  threshold: number,
  size: string,
) {
  let delta;
  if (size === "s" || size === "m") {
    delta = 5;
  } else {
    delta = 10;
  }

  if (currentarmor == ArmorType.light) {
    return threshold - delta;
  } else if (currentarmor == ArmorType.heavy) {
    return threshold + delta;
  } else {
    return threshold;
  }
}
