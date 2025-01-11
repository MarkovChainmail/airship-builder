import * as React from 'react';
import Button from '@mui/material/Button';

export default function NameGenerator() {

    const [names, setNames] = React.useState('');

    return (
        <div>
            <p>{names}</p>
            <Button onClick={async () => {
                let alphabet = [...Array(26).keys()].map(i => String.fromCharCode(i + 97));
                let letters = [...Array(10)].map(() => { return alphabet[Math.floor(Math.random() * 26)] });

                let adjectives = await fetch('data/words/adjectives.txt', {
                    headers: { 
                      'Accept': 'text/plain' 
                    }
                  })
                    .then(response => response.text())
                    .then(response => response.split('\n'));

                let nouns = await fetch('data/words/nouns.txt')
                    .then(response => response.text())
                    .then(response => response.split('\n'));

                let alliterations: string[] = [...letters].map((letter: string) => {
                    // Grab random words with the letters
                    let f1 = adjectives.filter((word: string) => word.substring(0, 1) as string === letter as string);
                    let adj = f1[Math.floor(Math.random() * f1.length)];

                    let f2 = nouns.filter((word: string) => word.substring(0, 1) as string === letter as string);
                    let noun = f2[Math.floor(Math.random() * f2.length)];
                    
                    return "The " + adj + " " + noun;
                });
                setNames(alliterations.join("\n"));
            }}>
                Generate!
            </Button>
        </div>
    )
}
