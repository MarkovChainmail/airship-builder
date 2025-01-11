export enum WeaponDirection {
    bow = "bow",
    port = "port",
    starboard = "starboard",
    stern = "stern"
}

export function parseWeaponDirection(direction: string) {
    for (const value of Object.values(WeaponDirection)) {
        if (direction == value) {
            return value
        }
    }
    throw Error("Direction: " + direction + " does not exist!")
}

export function isWeaponDirection(direction: string) {
    for (const value of Object.values(WeaponDirection)) {
        if (direction == value) {
            return true
        }
    }
    return false
}