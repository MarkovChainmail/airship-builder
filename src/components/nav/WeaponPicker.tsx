import * as React from "react";
import weapons from "data/weapons/weapondata.json";
import { WeaponContainer } from "../../classes/Loadout";
import { NavContext } from "../../App";
import { NavbarStateType } from "../../@types/NavbarState";
import NavTooltip from "./NavTooltip";
import { getWeapon } from "../../@types/Weapon";
import WeaponSelectButtons from "./WeaponSelectButtons";
import { Size } from "../../enums/Size";

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
      <ul>
        {Object.values(weapons)
          .map((w) => getWeapon(w.name))
          .filter((w) => weaponcontainer.fitsContainer(w, size))
          .map((w) => (
            <li>
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
