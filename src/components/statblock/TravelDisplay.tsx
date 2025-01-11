import * as React from 'react';
import { Fuel } from '../../classes/Fuel';

function TravelDisplay({fuel, dailyspeed, passengers} : {fuel: Fuel | undefined, dailyspeed: number, passengers: number}) {
    const runtime = fuel ? fuel.totalRuntime() : undefined
    
    return ( <div className="actions">
        <h3>Travel Info</h3>
        <ul>
            <li>Daily speed: {dailyspeed} miles</li>
            { runtime ? <li>Engine operation time: {runtime.amount} {runtime.unit}</li> : 
                <li>Engine operation time: none</li>
            }
            { fuel ? <li>Total fuel capacity: {fuel.totalCapacity()} tons</li> : null}
            <li>Passengers: {passengers}</li>
        </ul>
        </div> );
}

export default TravelDisplay;