import * as React from 'react';
import shiptraits from 'data/ships/shiptraitsdata.json'

function displayTrait({ name, description }: { name: string, description: string }) {
    return (
        <div className='property-block'>
            <h4>{name}.</h4> <p>{description}</p>
        </div>
    )
}

function replaceCore(name: string, hasMagicCore: boolean | undefined) {
    if (hasMagicCore) {
        return name.replace("Whale Oil", "Magic Core")
    }
    return name
}

function TraitsDisplay({ traits, hasPaddlesUpgrade, hasAutoPilot, hasMagicCore }: { traits: string[], hasPaddlesUpgrade: boolean | undefined, hasAutoPilot: boolean, hasMagicCore: boolean | undefined }) {
    const hasPaddles = traits.includes('paddling') || hasPaddlesUpgrade
    return (<>
        {traits.includes('helmsman') && !hasAutoPilot ?
            displayTrait(shiptraits['helmsman'])
            : null}
        {traits.includes('helmsman') && hasAutoPilot ?
            displayTrait(shiptraits['nohelmsman'])
            : null}
        {traits.includes('agile') ?
            displayTrait(shiptraits['agile'])
            : null}
        {traits.includes('sails') && traits.includes('engine') && !hasPaddles ?
            displayTrait({ name: replaceCore(shiptraits['mixedengine'].name, hasMagicCore), description: shiptraits['mixedengine'].description })
            : null}
        {traits.includes('sails') && traits.includes('engine') && hasPaddles ?
            displayTrait({ name: replaceCore(shiptraits['mixedenginepaddling'].name, hasMagicCore), description: shiptraits['mixedenginepaddling'].description }) : null}
        {traits.includes('sails') && !traits.includes('engine') ?
            displayTrait(shiptraits['sail'])
            : null}
        {!traits.includes('sails') && traits.includes('engine') && !hasPaddles ?
            displayTrait(shiptraits['independent'])
            : null}
        {!traits.includes('sails') && traits.includes('engine') && hasPaddles ?
            displayTrait(shiptraits['mixedpaddling'])
            : null}


    </>);
}

export default TraitsDisplay;