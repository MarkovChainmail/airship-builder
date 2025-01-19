import React, { useContext } from "react";
import { CustomizedShip } from "../../classes/CustomizedShip";
import { NavContext } from "../../App";
import { NavbarStateType } from "../../@types/NavbarState";

export default function WeaponSides({ ship }: { ship: CustomizedShip }) {
  const { setter } = useContext(NavContext) as NavbarStateType;

  const setside = (name: string) => {
    return function () {
      setter(name);
    };
  };

  return (
    <div className="property-block">
      <h4>Weapons</h4>

      {ship.loadout.isRedundant() ? (
        <p>No weapon slots</p>
      ) : (
        <ul>
          {ship.loadout.innate ? (
            <li key="innate">
              <p>Innate</p>
              <ul>
                {Object.entries(ship.loadout.innate.weapons).map((data) => (
                  <li key={data[0]}>
                    {data[0]} x{data[1]}
                  </li>
                ))}
              </ul>
            </li>
          ) : null}
          {ship.loadout.bow.isRedundant() ? null : (
            <li key="bow" className="shipside" onClick={setside("Bow")}>
              <p>
                Bow ({ship.loadout.bow.slotsused}/{ship.loadout.bow.capacity})
              </p>
              <ul>
                {ship.upgrades.kiteshield ? (
                  <li>Frontal weapons blocked by Kite Shield</li>
                ) : null}
                {Object.entries(ship.loadout.bow.weapons).map((data) => (
                  <li key={data[0]}>
                    {data[0]} x{data[1]}
                  </li>
                ))}
              </ul>
            </li>
          )}
          <li key="port" className="shipside" onClick={setside("Port")}>
            <p>
              Port ({ship.loadout.port.slotsused}/{ship.loadout.port.capacity})
            </p>
            <ul>
              {Object.entries(ship.loadout.port.weapons).map((data) => (
                <li key={data[0]}>
                  {data[0]} x{data[1]}
                </li>
              ))}
            </ul>
          </li>
          <li
            key="starboard"
            className="shipside"
            onClick={setside("Starboard")}
          >
            <p>
              Starboard ({ship.loadout.starboard.slotsused}/
              {ship.loadout.starboard.capacity})
            </p>
            <ul>
              {Object.entries(ship.loadout.starboard.weapons).map((data) => (
                <li key={data[0]}>
                  {data[0]} x{data[1]}
                </li>
              ))}
            </ul>
          </li>
          {ship.loadout.stern.isRedundant() ? null : (
            <li key="stern" className="shipside" onClick={setside("Stern")}>
              <p>
                Stern ({ship.loadout.stern.slotsused}/
                {ship.loadout.stern.capacity})
              </p>
              <ul>
                {Object.entries(ship.loadout.stern.weapons).map((data) => (
                  <li key={data[0]}>
                    {data[0]} x{data[1]}
                  </li>
                ))}
              </ul>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
