import * as React from "react";
import { CustomizedShip } from "../../classes/CustomizedShip";
import { useEffect } from "react";

function NameDisplayInput({ ship, refresh }: { ship: CustomizedShip, refresh: () => void }) {
  const [inputtingName, setInputtingName] = React.useState(false);

  function submitName(e: React.SyntheticEvent<HTMLInputElement>) {
    setInputtingName(false);
    const inputElement = e.target as HTMLInputElement;
    if (inputElement.value != "") {
      ship.name = inputElement.value;
      refresh()
    }
  }

  useEffect(() => {
    document.title = ship.name + " - Airship Builder";
  }, [ship.name]);

  return (
    <div>
      {inputtingName ? (
        <input
          type="text"
          placeholder="Enter Name"
          onBlur={(e) => submitName(e)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submitName(e);
            }
          }}
          autoFocus
        />
      ) : (
        <h1
          className="clickable"
          onClick={() => setInputtingName(true)}
          tabIndex={0}
        >
          {ship.name}
        </h1>
      )}
    </div>
  );
}

export default NameDisplayInput;
