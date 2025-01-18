import * as React from "react";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Fade from "@mui/material/Fade";
import { capitalizeFirstLetter } from "../../functions/Utility";

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#FDF1DC",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 500,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #7A200D",
  },
}));

function NavTooltip({
  object,
  wrapped,
}: {
  object: DnDObject | string;
  wrapped: React.JSX.Element;
}) {
  const dndobject = object as DnDObject;
  return (
    <HtmlTooltip
      slots={{
        transition: Fade,
      }}
      disableInteractive
      enterDelay={1000}
      placement="top-end"
      title={
        <React.Fragment>
          <div className="ministatblock">
            {typeof object == "string" ? (
              <div className="creature-heading">
                <h3>{object}</h3>
              </div>
            ) : (
              <>
                <div className="creature-heading">
                  <h3>{dndobject.name}</h3>
                  {dndobject.size ? (
                    <h2>{capitalizeFirstLetter(dndobject.size)} Object</h2>
                  ) : null}
                  {dndobject.rarity ? (
                    <h2>Rarity: {capitalizeFirstLetter(dndobject.rarity)}</h2>
                  ) : null}
                </div>
                {dndobject.ac && dndobject.hp ? (
                  <div className="top-stats">
                    <div className="property-line">
                      <h4>Armor Class</h4>
                      <p>{dndobject.ac}</p>
                    </div>
                    <div className="property-line">
                      <h4>Hit Points</h4>
                      <p>{dndobject.hp}</p>
                    </div>
                  </div>
                ) : null}
                {dndobject.immunities ? (
                  <div className="property-line">
                    <h4>Damage Immunities</h4>
                    <p>{dndobject.immunities.join(", ")}</p>
                  </div>
                ) : null}
                <p>
                  <i>{dndobject.description}</i>
                </p>
              </>
            )}
          </div>
        </React.Fragment>
      }
    >
      {wrapped}
    </HtmlTooltip>
  );
}

export default NavTooltip;
