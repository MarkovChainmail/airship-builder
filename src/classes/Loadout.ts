import { getWeapon, Weapon } from "../@types/Weapon";
import { isSize, Size } from "../enums/Size";
import { isWeaponDirection, WeaponDirection } from "../enums/WeaponDirection";

export class Loadout {
  innate?: WeaponContainer;
  bow: BowContainer;
  port: WeaponContainer;
  starboard: WeaponContainer;
  stern: WeaponContainer;

  private constructor() {
    this.bow = {} as BowContainer;
    this.port = {} as WeaponContainer;
    this.starboard = {} as WeaponContainer;
    this.stern = {} as WeaponContainer;
  }

  public static fromScratch(parameters: number[], isBrig: boolean): Loadout {
    const obj = new Loadout();

    if (parameters.length != 4) {
      throw new Error("Loadout needs exactly 4 parameters");
    }
    if (isBrig) {
      obj.innate = WeaponContainer.fromScratch(2, WeaponDirection.bow, isBrig);
      obj.innate.add("Battering Ram");
    }
    obj.bow = BowContainer.fromScratch(parameters[0], WeaponDirection.bow, isBrig);
    obj.port = WeaponContainer.fromScratch(parameters[1], WeaponDirection.port, isBrig);
    obj.starboard = WeaponContainer.fromScratch(
      parameters[2],
      WeaponDirection.starboard,
      isBrig
    );
    obj.stern = WeaponContainer.fromScratch(
      parameters[3],
      WeaponDirection.stern,
      isBrig
    );

    return obj;
  }

  public static fromJSON(json: any): Loadout {
    const obj = new Loadout();
    obj.innate = json.innate
      ? WeaponContainer.fromJSON(json.innate)
      : undefined;
    obj.bow = BowContainer.fromJSON(json.bow);
    obj.port = WeaponContainer.fromJSON(json.port);
    obj.starboard = WeaponContainer.fromJSON(json.starboard);
    obj.stern = WeaponContainer.fromJSON(json.stern);
    return obj;
  }

  getWeapons(): Weapon[] {
    const innate = this.innate ? this.innate.getWeapons() : [];

    const weaponset = new Set([
      ...innate,
      ...this.bow.getWeapons(),
      ...this.port.getWeapons(),
      ...this.starboard.getWeapons(),
      ...this.stern.getWeapons(),
    ]);
    return [...weaponset].map((weapon) => getWeapon(weapon));
  }

  isRedundant(): boolean {
    return (
      this.bow.isRedundant() &&
      this.port.isRedundant() &&
      this.starboard.isRedundant() &&
      this.stern.isRedundant()
    );
  }

  weight() {
    return (
      this.bow.weight() +
      this.stern.weight() +
      this.port.weight() +
      this.starboard.weight()
    );
  }

  price() {
    return (
      this.bow.price() +
      this.stern.price() +
      this.port.price() +
      this.starboard.price()
    );
  }
}

export class WeaponContainer {
  capacity: number;
  slotsused: number;
  weapons: { [id: string]: number };
  direction: WeaponDirection;
  innateRam: boolean;

  protected constructor() {
    this.capacity = 0;
    this.slotsused = 0;
    this.weapons = {};
    this.direction = WeaponDirection.bow;
    this.innateRam = false;
  }

  public static fromScratch(
    capacity: number,
    direction: WeaponDirection,
    innateRam: boolean
  ): WeaponContainer {
    const obj = new WeaponContainer();
    obj.capacity = capacity;
    obj.slotsused = 0;
    obj.weapons = {};
    obj.direction = direction;
    obj.innateRam = innateRam;
    return obj;
  }

  public static fromJSON(json: any): WeaponContainer {
    const obj = new WeaponContainer();
    obj.capacity = json.capacity;
    obj.slotsused = json.slotsused;
    obj.weapons = json.weapons;
    obj.direction = json.direction;
    obj.innateRam = json.innateRam;
    return obj;
  }

  // total amount of weapons mounted
  amount() {
    return Object.values(this.weapons).reduce((a, b) => a + b, 0);
  }

  // amount of specific weapon mounted
  hasAmount(weapon: string) {
    const w = this.weapons[weapon];
    return w ? w : 0;
  }

  hasCapacity(slots: number) {
    // TODO: add weight tallyer blocking adding new weapons
    return this.capacity != 0 && this.capacity - slots - this.slotsused >= 0;
  }

  add(weapon: string) {
    // If the weapon exists and there is capacity, add it
    const weapondata = getWeapon(weapon);
    if (this.hasCapacity(weapondata.slots)) {
      this.slotsused += weapondata.slots;
      if (weapon in this.weapons) {
        this.weapons[weapon]++;
      } else {
        this.weapons[weapon] = 1;
      }
    } else {
      throw new Error("Not enough capacity for " + weapon + "!");
    }
  }

  remove(weapon: string) {
    // If this container has the weapon, delete it
    const weapondata = getWeapon(weapon);
    const value = this.weapons[weapon];

    if (value) {
      this.slotsused -= weapondata.slots;
      if (value == 1) {
        delete this.weapons[weapon];
      } else {
        this.weapons[weapon]--;
      }
    } else {
      throw new Error("Weapon " + weapon + " does not exist on container!");
    }
  }

  getWeapons() {
    return Object.keys(this.weapons);
  }

  isRedundant() {
    return this.capacity == 0;
  }

  fitsContainer(w: Weapon, size: Size) {
    const directions = w.properties.filter((prop) => isWeaponDirection(prop));
    const sizes = w.properties.filter((prop) => isSize(prop));
    return (
      (directions.length == 0 || directions.includes(this.direction)) &&
      (sizes.length == 0 || sizes.includes(size)) &&
      w.slots <= this.capacity
    );
  }

  weight() {
    return Object.entries(this.weapons)
      .map(([key, value]) => getWeapon(key).weight * value)
      .reduce((a, b) => a + b, 0);
  }

  price() {
    return Object.entries(this.weapons)
      .map(([key, value]) => getWeapon(key).price * value)
      .reduce((a, b) => a + b, 0);
  }

  hasRam() {
    return (
      this.innateRam ||
      Object.keys(this.weapons)
        .map((key) => getWeapon(key))
        .some((w) => w.properties.includes("ram"))
    );
  }

  hasHead() {
    return Object.keys(this.weapons)
      .map((key) => getWeapon(key))
      .some((w) => w.properties.includes("head"));
  }
}

export class BowContainer extends WeaponContainer {
  private constructor() {
    super();
  }

  public static fromScratch(capacity: number, direction: WeaponDirection, innateRam: boolean): BowContainer {
    const obj = new BowContainer();
    obj.capacity = capacity;
    obj.slotsused = 0;
    obj.weapons = {};
    obj.direction = direction;
    obj.innateRam = innateRam;
    return obj;
  }

  public static fromJSON(json: any): BowContainer {
    const obj = new BowContainer();
    obj.capacity = json.capacity;
    obj.slotsused = json.slotsused;
    obj.weapons = json.weapons;
    obj.direction = json.direction;
    obj.innateRam = json.innateRam;
    return obj;
  }

  installKiteShield() {
    this.weapons = {};
    this.slotsused = this.capacity;
  }

  uninstallKiteShield() {
    this.weapons = {};
    this.slotsused = 0;
  }
}
