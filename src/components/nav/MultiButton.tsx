import * as React from "react";
import NavTooltip from "./NavTooltip";

function MultiButton({
  fields,
  callbacks,
  currentvalue,
  tooltips,
}: {
  fields: string[];
  callbacks: React.MouseEventHandler<HTMLButtonElement>[];
  currentvalue: string;
  tooltips: (string | DnDObject)[];
}) {
  if (fields.length != callbacks.length)
    throw Error("Fields and callbacks must have equal length!");

  return (
    <ul>
      {fields.map((f, i) => (
        <NavTooltip
          key={f}
          object={tooltips[i]}
          wrapped={
            <li key={f}>
              <button onClick={callbacks[i]} disabled={currentvalue == f}>
                {f}
              </button>
            </li>
          }
        />
      ))}
    </ul>
  );
}

export default MultiButton;
