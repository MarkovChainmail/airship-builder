import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import shipdata from "../data/ships/shipdata.json";
import { CustomizedShip } from "../classes/CustomizedShip";
import { getShip, Ship } from "../@types/Ship";
import { NavbarStateType } from "../@types/NavbarState";
import ListSubheader from "@mui/material/ListSubheader";
import { NavContext } from "../App";

function getContent(header: string) {
  let data = Object.values(shipdata);
  switch (header) {
    // case 'Civilian':
    //   data = data.filter(sh => sh.properties.includes('civilian'))
    //   break;
    case "Small":
      data = data.filter((sh) => sh.size.category == "small");
      break;
    case "Medium":
      data = data.filter((sh) => sh.size.category == "medium");
      break;
    case "Large":
      data = data.filter((sh) => sh.size.category == "large");
      break;
    case "Huge":
      data = data.filter((sh) => sh.size.category == "huge");
      break;
    case "Gargantuan":
      data = data.filter((sh) => sh.size.category == "gargantuan");
      break;
  }
  return data;
}

export default function SelectShip({
  ship,
  shipsetter,
  objectsetter,
}: {
  ship: string;
  shipsetter: (ship: string) => void;
  objectsetter: (ship: CustomizedShip) => void;
}) {
  const { setter } = React.useContext(NavContext) as NavbarStateType;

  const handleChange = (event: SelectChangeEvent) => {
    shipsetter(event.target.value as string);
    const newship = CustomizedShip.fromScratch(
      getShip(event.target.value) as Ship,
    );
    objectsetter(newship);
    setter("");
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl>
        <InputLabel id="demo-simple-select-label">New Ship</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={ship}
          label="Select your ship"
          onChange={handleChange}
          MenuProps={{
            MenuListProps: {
              subheader: <li />,
            },
            PaperProps: {
              style: {
                maxHeight: 300,
                width: 250,
              },
            },
          }}
        >
          {/* <ListSubheader>Civilian</ListSubheader>
          {getContent('Civilian').map((ship) => (
            <MenuItem key={ship.name} value={ship.name}>{ship.name}</MenuItem>
          ))} */}
          <ListSubheader>Small</ListSubheader>
          {getContent("Small").map((ship) => (
            <MenuItem key={ship.name} value={ship.name}>
              {ship.name}
            </MenuItem>
          ))}
          <ListSubheader>Medium</ListSubheader>
          {getContent("Medium").map((ship) => (
            <MenuItem key={ship.name} value={ship.name}>
              {ship.name}
            </MenuItem>
          ))}
          <ListSubheader>Large</ListSubheader>
          {getContent("Large").map((ship) => (
            <MenuItem key={ship.name} value={ship.name}>
              {ship.name}
            </MenuItem>
          ))}
          <ListSubheader>Huge</ListSubheader>
          {getContent("Huge").map((ship) => (
            <MenuItem key={ship.name} value={ship.name}>
              {ship.name}
            </MenuItem>
          ))}
          <ListSubheader>Gargantuan</ListSubheader>
          {getContent("Gargantuan").map((ship) => (
            <MenuItem key={ship.name} value={ship.name}>
              {ship.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
