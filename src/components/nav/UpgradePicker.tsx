import * as React from "react";
import MultiButton from "./MultiButton";
import { ArmorType } from "../../enums/ArmorType";
import { SailsType } from "../../enums/SailsType";
import { MagicShieldType } from "../../enums/MagicShieldType";
import upgradedata from "../../data/upgrades/upgradedata.json";
import { getDnDObject, getUpgrade } from "../../@types/Upgrade";
import PropulsionForm from "./PropulsionForm";
import OilTankPicker from "./OilTankPicker";
import { CustomizedShip } from "../../classes/CustomizedShip";

export default function UpgradePicker({
  ship,
  refresh,
}: {
  ship: CustomizedShip;
  refresh: () => void;
}) {
  return (
    <nav className="nav">
      <h1>Upgrades</h1>
      <ul>
        <li>
          <h3>Armor</h3>
          <MultiButton
            fields={[ArmorType.light, ArmorType.medium, ArmorType.heavy]}
            currentvalue={ship.upgrades.armor}
            callbacks={[
              () => {
                ship.upgrades.setArmorLight();
                refresh();
              },
              () => {
                ship.upgrades.setArmorMedium();
                refresh();
              },
              () => {
                ship.upgrades.setArmorHeavy();
                refresh();
              },
            ]}
            tooltips={[
              upgradedata["Light Hull Armor"],
              upgradedata["Medium Hull Armor"],
              upgradedata["Heavy Hull Armor"],
            ]}
          />
        </li>
        <li>
          <h3>Kite Shield</h3>
          <MultiButton
            fields={["Off", "On"]}
            currentvalue={ship.upgrades.kiteshield ? "On" : "Off"}
            callbacks={[
              () => {
                ship.upgrades.setKiteShieldFalse();
                refresh();
              },
              () => {
                ship.upgrades.setKiteShieldTrue();
                refresh();
              },
            ]}
            tooltips={[
              "No Kite Shield",
              getDnDObject("Kite Shield", ship.size()),
            ]}
          />
        </li>
        <li>
          <h3>Magic Shield</h3>
          <MultiButton
            fields={[
              MagicShieldType.none,
              MagicShieldType.spell,
              MagicShieldType.arcane,
            ]}
            currentvalue={ship.upgrades.magicshield}
            callbacks={[
              () => {
                ship.upgrades.setMagicShieldNone();
                refresh();
              },
              () => {
                ship.upgrades.setMagicShieldSpell();
                refresh();
              },
              () => {
                ship.upgrades.setMagicShieldArcane();
                refresh();
              },
            ]}
            tooltips={[
              "No Magic Shield",
              getDnDObject("Spell Shield", ship.size()),
              getDnDObject("Arcane Shield", ship.size()),
            ]}
          />
        </li>
        {ship.upgrades.sails ? (
          <li>
            <h3>Sails</h3>
            <ul>
              <MultiButton
                fields={[SailsType.canvas, SailsType.linen, SailsType.solar]}
                currentvalue={ship.upgrades.sails}
                callbacks={[
                  () => {
                    ship.upgrades.setSailsCanvas();
                    refresh();
                  },
                  () => {
                    ship.upgrades.setSailsLinen();
                    refresh();
                  },
                  () => {
                    ship.upgrades.setSailsSolar();
                    refresh();
                  },
                ]}
                tooltips={[
                  getDnDObject("Sails (Canvas)", ship.size()),
                  getDnDObject("Sails (Linen)", ship.size()),
                  getDnDObject("Solar Sails", ship.size()),
                ]}
              />
            </ul>
          </li>
        ) : null}
        {ship.propulsion ? (
          <li>
            <h3>Propulsion</h3>
            <PropulsionForm
              propulsion={ship.propulsion}
              size={ship.size()}
              refresh={refresh}
              innatePaddles={ship.base.properties.includes("paddling")}
            />
          </li>
        ) : null}
        {getUpgrade("Teleportation Circle").price[ship.size()] == -1 ? null : (
          <li>
            <h3>Teleportation Circle</h3>
            <MultiButton
              fields={["Off", "On"]}
              currentvalue={ship.upgrades.teleportationcircle ? "On" : "Off"}
              callbacks={[
                () => {
                  ship.upgrades.setTeleportationCircleFalse();
                  refresh();
                },
                () => {
                  ship.upgrades.setTeleportationCircleTrue();
                  refresh();
                },
              ]}
              tooltips={[
                "No Teleportation Circle",
                getDnDObject("Teleportation Circle", ship.size()),
              ]}
            />
          </li>
        )}
        {getUpgrade("Automated Pilot").price[ship.size()] == -1 ? null : (
          <li>
            <h3>Automated Pilot</h3>
            <MultiButton
              fields={["Off", "On"]}
              currentvalue={ship.upgrades.autopilot ? "On" : "Off"}
              callbacks={[
                () => {
                  ship.upgrades.setAutoPilotFalse();
                  refresh();
                },
                () => {
                  ship.upgrades.setAutoPilotTrue();
                  refresh();
                },
              ]}
              tooltips={[
                "No Automated Pilot",
                getDnDObject("Automated Pilot", ship.size()),
              ]}
            />
          </li>
        )}
        {ship.fuel ? (
          <li>
            <h3>Oil Tanks</h3>
            <OilTankPicker
              fuel={ship.fuel}
              refresh={refresh}
              size={ship.size()}
            />
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
