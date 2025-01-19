import React, { useContext } from "react";
import { NavContext } from "../../App";
import { NavbarStateType } from "../../@types/NavbarState";
import { Upgrades } from "../../classes/Upgrades";
import { MagicShieldType } from "../../enums/MagicShieldType";
import { Propulsion } from "../../classes/Propulsion";

function PropulsionList({ propulsion }: { propulsion: Propulsion }) {
  return (
    <>
      <li key="engine">{propulsion.toString()}</li>
      {propulsion.peddles ? <li key="peddles">Peddles System</li> : null}
    </>
  );
}

export default function UpgradesDisplay({
  upgrades,
  propulsion,
}: {
  upgrades: Upgrades;
  propulsion: Propulsion | undefined;
}) {
  const { setter } = useContext(NavContext) as NavbarStateType;

  const onClick = () => {
    setter("Upgrades");
  };

  return (
    <div className="property-block shipside" onClick={onClick}>
      <h4>Upgrades</h4>
      <ul>
        <li key="protection">
          <p>Protection</p>
          <ul>
            <li key="armor">{upgrades.armor} Hull Armor</li>
            {upgrades.kiteshield ? <li>Kite Shield</li> : null}
            {upgrades.magicshield == MagicShieldType.none ? null : (
              <li key={"shield"}>{upgrades.magicshield} Shield</li>
            )}
          </ul>
        </li>
        <li key="propulsion">
          <p>Propulsion</p>
          <ul>
            {upgrades.sails ? (
              <li key="sails">{upgrades.sails} Sails</li>
            ) : null}
            {propulsion ? <PropulsionList propulsion={propulsion} /> : null}
          </ul>
        </li>
        {upgrades.autopilot || upgrades.teleportationcircle ? (
          <li key="misc">
            <p>Miscellaneous</p>
            <ul>
              {upgrades.teleportationcircle ? (
                <li key="tele">Teleportation Circle</li>
              ) : null}
              {upgrades.autopilot ? <li key="autopilot">Autopilot</li> : null}{" "}
            </ul>
          </li>
        ) : null}
      </ul>
    </div>
  );
}
