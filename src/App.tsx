import * as React from 'react';

import SelectShip from "./components/SelectShip";
import Statblock from './components/statblock/Statblock';

import { getShip } from './@types/Ship';
import { CustomizedShip } from './classes/CustomizedShip'
import cloneDeep from 'lodash.clonedeep';
import { NavbarStateType } from './@types/NavbarState';
import NavBar from './components/nav/NavBar';

export const NavContext = React.createContext<NavbarStateType | null>(null)

export default function App() {
  const [currentship, setCurrentship] = React.useState('Caraval');
  const [navbar, setNavbar] = React.useState('');
  const [customizedship, setCustomizedShip] = React.useState(new CustomizedShip(getShip(currentship)))

  function refresh() {
    setCustomizedShip(cloneDeep(customizedship))
  }

  return (
    <div className="grid-container">
      <header className="header">
        <p>Ship generator</p>
      </header>
      
      <NavContext.Provider value={{ state: navbar, setter: setNavbar } as NavbarStateType}>
      <NavBar ship={customizedship} refresh={refresh} />
      <main className="main">
        <SelectShip ship={currentship} shipsetter={setCurrentship} objectsetter={setCustomizedShip} />

        <Statblock ship={customizedship} />
      </main>

      </NavContext.Provider>

      <aside className="sidebar">
        <h3>Sidebar</h3>
        <p>Maybe put dice rolls here? Or a database of ships you've built?</p>
        <ul><li>example</li></ul>
      </aside>
    </div>
  );
}