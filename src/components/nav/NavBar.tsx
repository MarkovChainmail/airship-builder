import React, { useContext } from "react";
import { CustomizedShip } from "../../classes/CustomizedShip";
import WeaponPicker from "./WeaponPicker";
import { NavContext } from "../../App";
import { NavbarStateType } from "../../@types/NavbarState";
import UpgradePicker from "./UpgradePicker";

export default function NavBar({
  ship,
  refresh,
}: {
  ship: CustomizedShip;
  refresh: () => void;
}) {
  const { state } = useContext(NavContext) as NavbarStateType;

  if (state == "") return <></>;
  else if (state == "Port")
    return (
      <WeaponPicker
        size={ship.size()}
        weaponcontainer={ship.loadout.port}
        refresh={refresh}
      ></WeaponPicker>
    );
  else if (state == "Starboard")
    return (
      <WeaponPicker
        size={ship.size()}
        weaponcontainer={ship.loadout.starboard}
        refresh={refresh}
      ></WeaponPicker>
    );
  else if (state == "Bow")
    return (
      <WeaponPicker
        size={ship.size()}
        weaponcontainer={ship.loadout.bow}
        refresh={refresh}
      ></WeaponPicker>
    );
  else if (state == "Stern")
    return (
      <WeaponPicker
        size={ship.size()}
        weaponcontainer={ship.loadout.stern}
        refresh={refresh}
      ></WeaponPicker>
    );
  else if (state == "Upgrades")
    return <UpgradePicker ship={ship} refresh={refresh} />;
  else return <></>;
}
