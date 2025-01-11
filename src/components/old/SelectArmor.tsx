import * as React from 'react';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

export default function SelectArmor({ armor, setter }: { armor: string, setter: Function }) {

  const [alignment, setAlignment] = React.useState('medium');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
    setter(newAlignment)
  };

  return (
    <div>
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="light">Light</ToggleButton>
      <ToggleButton value="medium">Medium</ToggleButton>
      <ToggleButton value="heavy">Heavy</ToggleButton>
    </ToggleButtonGroup>
    </div>
  )
 }
