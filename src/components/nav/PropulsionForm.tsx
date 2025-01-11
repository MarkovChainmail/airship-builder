import * as React from 'react';
import NavTooltip from './NavTooltip';
import { getDnDObject } from '../../@types/Upgrade';
import { Size } from '../../enums/Size';
import { Propulsion } from '../../classes/Propulsion';

function PropulsionForm({propulsion, size, refresh, innatePaddles}: {propulsion : Propulsion, size : Size, refresh: Function, innatePaddles: boolean}) {
    const handlePeddles = () => { // e: React.ChangeEvent<HTMLInputElement>
        propulsion.peddles = !propulsion.peddles
        refresh()
    }

    const handleCore = () => {
        propulsion.core = !propulsion.core
        refresh()
    }

    const handlePlusEngines = () => {
        propulsion.addEngine()
        refresh()
    }

    const handleMinusEngines = () => {
        propulsion.subtractEngine()
        refresh()
    }

    return ( <ul className='nav-vertical-list'>
        <li><NavTooltip object={getDnDObject('Magic Core', size)} wrapped={<div><input type="checkbox" id="core" name="core" value="core" onChange={handleCore} checked={propulsion.core}/> <label htmlFor="core">Magic Core</label></div>}/></li>
        <li><NavTooltip object={getDnDObject('Whale Oil Engine', size)} wrapped={<div><button onClick={handleMinusEngines} disabled={propulsion.extraengines == 0}>-</button> {propulsion.extraengines} <button onClick={handlePlusEngines}>+</button> Backup Engines</div>}/>
            
        </li>
        {!innatePaddles ? <li><NavTooltip object={getDnDObject('Peddles System', size)} wrapped={<div><input type="checkbox" id="peddles" name="peddles" value="peddles" onChange={handlePeddles} checked={propulsion.peddles} /><label htmlFor="peddles">Peddles System</label></div>}/></li> : null}
    </ul> );
}

export default PropulsionForm;