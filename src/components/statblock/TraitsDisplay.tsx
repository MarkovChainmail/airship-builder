import * as React from 'react';
import shiptraits from 'data/ships/shiptraitsdata.json'

function displayTrait({ name, description }: { name: string, description: string }) {
    return (
        <div className='property-block'>
            <h4>{name}.</h4> <p>{description}</p>
        </div>
    )
}

function TraitsDisplay({ traits, hasPaddlesUpgrade }: { traits: string[], hasPaddlesUpgrade: boolean | undefined }) {
    const hasPaddles = traits.includes('paddling') || hasPaddlesUpgrade
    return (<>
        {traits.includes('helmsman') ?
            displayTrait(shiptraits['helmsman'])
            : null}
        {traits.includes('agile') ?
            displayTrait(shiptraits['agile'])
            : null}
        {traits.includes('sails') && traits.includes('engine') && !hasPaddles ?
            displayTrait(shiptraits['mixedengine'])
            : null}
        {traits.includes('sails') && traits.includes('engine') && hasPaddles ?
            displayTrait(shiptraits['mixedenginepaddling'])
            : null}
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