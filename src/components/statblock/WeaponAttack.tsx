import React from "react";
import { Loadout } from "../../classes/Loadout";
import { Weapon } from "../../@types/Weapon";

function rangedAttack(weapon: Weapon) {
    return <p><i>Ranged Weapon Attack:</i> +{weapon.tohit ? weapon.tohit : 5} to hit, range {weapon.range!.normal}/{weapon.range!.extended}, one target. <br></br>
        <i>Hit:</i> {weapon.damage!.average} ({weapon.damage!.diceamount}{weapon.damage!.dice}{weapon.damage!.base ? `+${weapon.damage!.base}` : null}) {weapon.damage!.type} damage.</p>
}

function meleeRange(weapon: Weapon, width: number): number {
    if (weapon.name.includes("Titan")) {
        return width/2
    } else {
        return 5
    }
}

function meleeAttack(weapon: Weapon, width: number) {
    return <p><i>Melee Weapon Attack:</i> +{weapon.tohit ? weapon.tohit : 5} to hit, reach {meleeRange(weapon, width)}ft. one target. <br></br>
        <i>Hit:</i> {weapon.damage!.average} ({weapon.damage!.diceamount}{weapon.damage!.dice}) {weapon.damage!.type} damage.</p>
}

function areaAttack(weapon: Weapon) {
    return <p><i>Area Attack:</i> {weapon.area!.size}ft. {weapon.area!.shape}. {weapon.damage!.average} ({weapon.damage!.diceamount}{weapon.damage!.dice}) {weapon.damage!.type} damage. DC{weapon.area!.dc} dexterity halved.</p>
}

function FormatAttack({ weapon, width }: { weapon: Weapon, width: number }) {
    if (weapon.damage) {
        return (
            <div>{weapon.range ?
                rangedAttack(weapon)
                :
                (weapon.area ? areaAttack(weapon) : meleeAttack(weapon, width))
            }
            </div>
        )
    } else {
        return <div><p>{weapon.name}</p> deals no damage (special)</div>
    }
}


export default function WeaponAttack({ loadout, width }: { loadout: Loadout, width: number }) {

    return (
        <div>
            {
                loadout.getWeapons().map((w: Weapon) =>
                    <div className="property-block">
                        <h4>{w.name}.</h4>
                        <FormatAttack weapon={w} width={width}/>
                    </div>
                )
            }
        </div>
    )
}
