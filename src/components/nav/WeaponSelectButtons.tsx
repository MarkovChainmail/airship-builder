import * as React from 'react';
import { WeaponContainer } from '../../classes/Loadout';
import { Weapon } from '../../@types/Weapon';

function WeaponSelectButtons({weaponcontainer, w, refresh} : {weaponcontainer: WeaponContainer, w: Weapon, refresh: Function}) {
    const minus = (name: string) => {
        return function () { //event: React.MouseEvent<HTMLElement>
            weaponcontainer.remove(name)
            refresh()
        }
    };
    
    const plus = (name: string) => {
        return function () {
            weaponcontainer.add(name)
            refresh()
        }
    };
    
    return ( <div><button onClick={minus(w.name)} disabled={!weaponcontainer.hasAmount(w.name)}>-</button> {weaponcontainer.hasAmount(w.name)} <button onClick={plus(w.name)} disabled={!weaponcontainer.hasCapacity(w.slots) || (weaponcontainer.hasRam() && w.properties.includes('ram')) || (weaponcontainer.hasHead() && w.properties.includes('head'))}>+</button></div> );
}

export default WeaponSelectButtons;