export function capitalizeFirstLetter(val: string) {
    return val.charAt(0).toUpperCase() + val.slice(1);
}

export function intOrTwoDecimals(num: number) {
    return Math.round(num * 100) / 100
}