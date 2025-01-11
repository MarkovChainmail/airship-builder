interface DnDObject {
    name: string;
    ac?: number;
    hp?: number;
    size?: string;
    rarity?: string;
    immunities?: string[];
    vulnerabilities?: string[];
    description: string;
}