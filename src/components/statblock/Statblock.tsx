import * as React from 'react';

import { CustomizedShip } from '../../classes/CustomizedShip';
import WeaponAttack from './WeaponAttack';
import WeaponSides from './WeaponSides';
import UpgradesDisplay from './UpgradesDisplay';
import { capitalizeFirstLetter, intOrTwoDecimals } from '../../functions/Utility';
import TravelDisplay from './TravelDisplay';
import TraitsDisplay from './TraitsDisplay';

// 5e statblock code from:
// https://codepen.io/retractedhack/pen/gPLpWe

export default function Statblock({ ship }: { ship: CustomizedShip }) {
	return (
		<div>
			<div className="stat-block wide">
				<hr className="orange-border" />
				<div className="section-left">
					<div className="creature-heading">
						<h1>{ship.base.name}</h1>
						<h2>{capitalizeFirstLetter(ship.base.size.category)} Ship, {ship.base.size.area.length}x{ship.base.size.area.width}ft.</h2>
					</div>
					<svg height="5" width="100%" className="tapered-rule">
						<polyline points="0,0 400,2.5 0,5"></polyline>
					</svg>
					<div className="top-stats">
						<div className="property-line first">
							<h4>Armor Class</h4>
							<p>{ship.AC()} {ship.upgrades.kiteshield ? "(bow-side +5)" : null}</p>
						</div>
						<div className="property-line">
							<h4>Hull Points</h4>
							<p>{ship.HP()} ({ship.hitdice()})</p>
						</div>
						<div className="property-line">
							<h4>Speed</h4>
							<p>max {ship.maxspeed()} ft., {ship.enginespeed() ? <>engine speed {ship.enginespeed()} ft., </> : null}stations {ship.base.sailstations}x{ship.sailstationspeed()} ft.</p>
						</div>
						<div className="property-line last">
							<h4>Initiative</h4>
							<p>+{ship.base.initiative}</p>
						</div>
						<svg height="5" width="100%" className="tapered-rule">
							<polyline points="0,0 400,2.5 0,5"></polyline>
						</svg>
						<div className="abilities">
							<div className="ability-strength">
								<h4>STR</h4>
								<p>-</p>
							</div>
							<div className="ability-dexterity">
								<h4>DEX</h4>
								<p>-</p>
							</div>
							<div className="ability-constitution">
								<h4>CON</h4>
								<p>-</p>
							</div>
							<div className="ability-intelligence">
								<h4>INT</h4>
								<p>-</p>
							</div>
							<div className="ability-wisdom">
								<h4>WIS</h4>
								<p>-</p>
							</div>
							<div className="ability-charisma">
								<h4>CHA</h4>
								<p>-</p>
							</div>
						</div>
						<svg height="5" width="100%" className="tapered-rule">
							<polyline points="0,0 400,2.5 0,5"></polyline>
						</svg>
						<div className="property-line first">
							<h4>Damage Immunities</h4>
							<p>{ship.threshold() > 0 ? "damage threshold " + ship.threshold() + ", " : null}poison, psychic</p>
						</div>
						<div className="property-line last">
							<h4>Condition Immunities</h4>
							<p>all except grappled.</p>
						</div>
						{/* <div className="property-line last">
							<h4>Senses</h4>
							<p></p>
						</div> */}
					</div>
					<svg height="5" width="100%" className="tapered-rule">
						<polyline points="0,0 400,2.5 0,5"></polyline>
					</svg>
					<TraitsDisplay traits={ship.base.properties} hasPaddlesUpgrade={ship.propulsion?.peddles} hasAutoPilot={ship.upgrades.autopilot} hasMagicCore={ship.propulsion?.core} />
					<div className='property-block'>
						<h4>Price.</h4> <p>{ship.price()} gp</p>
					</div>
					<WeaponSides ship={ship} />
					<UpgradesDisplay upgrades={ship.upgrades} fuel={ship.fuel} propulsion={ship.propulsion} />
					<div className="property-block">
						<h4>Tonnage.</h4>
						<p>{intOrTwoDecimals(ship.weight())}/{ship.base.tonnage.total} total ({ship.base.tonnage.hold} cargo)</p>
					</div>
					<div className="property-block">
						<h4>Crew.</h4>
						<p>{ship.base.crew.min}/{ship.base.crew.max}</p>
					</div>
				</div>
				<div className="section-right">
					<div className="actions">
						<h3>Actions</h3>
						<WeaponAttack loadout={ship.loadout} width={ship.base.size.area.width}></WeaponAttack>
					</div>

					<div className="actions">
						<h3>Inventory</h3>
					</div>
					<TravelDisplay fuel={ship.fuel} dailyspeed={ship.dailyspeed()} passengers={ship.base.passengers} />
				</div>
				<hr className="orange-border bottom" />
			</div>
		</div>
	)
}