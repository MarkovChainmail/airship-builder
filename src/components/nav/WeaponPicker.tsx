import * as React from "react";
import weapons from "../../data/weapons/weapondata.json";
import { SideContainer, WeaponContainer } from "../../classes/Loadout";
import { NavContext } from "../../App";
import { NavbarStateType } from "../../@types/NavbarState";
import NavTooltip from "./NavTooltip";
import { getWeapon } from "../../@types/Weapon";
import WeaponSelectButtons from "./WeaponSelectButtons";
import { Size } from "../../enums/Size";
import LinkDisplay from "../LinkDisplay";
import { WeaponDirection } from "../../enums/WeaponDirection";

function reverseDirection(direction: WeaponDirection) {
  switch (direction) {
    case WeaponDirection.port:
      return WeaponDirection.starboard;
    default:
      return WeaponDirection.port;
  }
}

function LinkButton({
  isLinked,
  container,
  refresh,
}: {
  isLinked: boolean;
  container: SideContainer;
  refresh: () => void;
}) {
  return (
    <button
      onClick={
        isLinked
          ? () => {
              container.unlink();
              refresh();
            }
          : () => {
              container.link();
              refresh();
            }
      }
    >
      {isLinked
        ? "Unlink"
        : "Overwrite " +
          reverseDirection(container.direction) +
          " and link"}{" "}
      <LinkDisplay isLinked={isLinked} />
    </button>
  );
}

export default function WeaponPicker({
  size,
  weaponcontainer,
  refresh,
}: {
  size: Size;
  weaponcontainer: WeaponContainer;
  refresh: () => void;
}) {
  const { state } = React.useContext(NavContext) as NavbarStateType;

  return (
    <nav className="nav">
      <h1>{state} Weapons</h1>
      {weaponcontainer instanceof SideContainer ? (
        <LinkButton
          isLinked={weaponcontainer.isLinked}
          container={weaponcontainer}
          refresh={refresh}
        />
      ) : null}
      <ul>
        {Object.values(weapons)
          .map((w) => getWeapon(w.name))
          .filter((w) => weaponcontainer.fitsContainer(w, size))
          .map((w) => (
            <li key={w.name}>
              <p>
                <NavTooltip object={w} wrapped={<b>{w.name}</b>} />, <br></br>{" "}
                {w.range ? (
                  <>
                    range {w.range.normal}
                    {w.range.extended ? `/${w.range.extended}` : null}
                  </>
                ) : (
                  "melee"
                )}
                , damage{" "}
                {w.damage ? (
                  <>
                    {w.damage.diceamount}
                    {w.damage.dice}
                    {w.damage.base ? `+${w.damage.base}` : null}
                  </>
                ) : (
                  "special"
                )}
                , price {w.price}gp <br></br>
                {w.slots} Slots
              </p>
              <WeaponSelectButtons
                weaponcontainer={weaponcontainer}
                w={w}
                refresh={refresh}
              />
            </li>
          ))}
      </ul>
    </nav>
  );
}
