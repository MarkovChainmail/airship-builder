import * as React from "react";
import { saveAs } from 'file-saver';
import cloneDeep from "lodash.clonedeep";

import SelectShip from "./components/SelectShip";
import Statblock from "./components/statblock/Statblock";

import { getShip } from "./@types/Ship";
import { CustomizedShip } from "./classes/CustomizedShip";
import { NavbarStateType } from "./@types/NavbarState";
import NavBar from "./components/nav/NavBar";

export const NavContext = React.createContext<NavbarStateType | null>(null);

export default function App() {
  const [currentship, setCurrentship] = React.useState<string>("Caraval");
  const [navbar, setNavbar] = React.useState<string>("");
  const [customizedship, setCustomizedShip] = React.useState<CustomizedShip>(
    CustomizedShip.fromScratch(getShip(currentship))
  );

  function refresh(): void {
    setCustomizedShip(cloneDeep(customizedship));
  }

  function saveCustomizedShipAsJson(): void {
    const json = JSON.stringify(customizedship, undefined, 2);
    const blob = new Blob([json], { type: 'application/json' });
    saveAs(blob, 'customizedship.json');
  }

  function loadCustomizedShipFromJson(event: React.ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const json = e.target?.result as string;
        const loadedShip = JSON.parse(json);
        setCustomizedShip(CustomizedShip.fromJSON(loadedShip));
      };
      reader.readAsText(file);
    }
  }

  return (
    <div className="grid-container">
      <header className="header">
        <p>Ship generator</p>
        <button onClick={saveCustomizedShipAsJson}>Save as JSON</button>
        <input type="file" accept="application/json" onChange={loadCustomizedShipFromJson} />
      </header>

      <NavContext.Provider
        value={{ state: navbar, setter: setNavbar } as NavbarStateType}
      >
        <NavBar ship={customizedship} refresh={refresh} />
        <main className="main">
          <SelectShip
            ship={currentship}
            shipsetter={setCurrentship}
            objectsetter={setCustomizedShip}
          />

          <Statblock ship={customizedship} />
        </main>
      </NavContext.Provider>

      <aside className="sidebar">
        <h3>Sidebar</h3>
        <p>
          Credit to DragonDean for his airship guide homebrew and to my little
          brother for the basic CSS/HTML template. 5e DND statblock by
          https://codepen.io/retractedhack
        </p>
      </aside>
    </div>
  );
}
