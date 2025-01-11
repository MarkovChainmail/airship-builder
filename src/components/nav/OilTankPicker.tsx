import * as React from 'react';
import { Fuel } from '../../classes/Fuel';
import { getOilSizesForShip, Size, WhaleOilTankSize } from '../../enums/Size';
import { capitalizeFirstLetter } from '../../functions/Utility';

function OilTankButtons({ fuel, size, refresh }: { fuel: Fuel, size: WhaleOilTankSize, refresh: Function }) {
    const minus = () => {
        fuel.removeTank(size)
        refresh()
    };

    const plus = () => {
        fuel.addTank(size)
        refresh()
    };

    return (<div><button onClick={minus} disabled={!fuel.hasAdditional(size)}>-</button> {fuel.hasTotal(size)} <button onClick={plus} >+</button></div>);

}

function OilTankPicker({ fuel, refresh, size } : { fuel: Fuel, refresh: Function, size: Size }) {
    return (<ul className='nav-vertical-list'>
        {getOilSizesForShip(size).map(ws => <li><div><OilTankButtons fuel={fuel} size={ws} refresh={refresh}/> {capitalizeFirstLetter(ws)}</div></li>)}
    </ul>
    );
}

export default OilTankPicker;