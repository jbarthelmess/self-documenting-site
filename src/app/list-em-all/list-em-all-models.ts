export type PokemonData = {
    name: string;
    id: number;
    found: boolean;
    notFound: boolean;
}

export type Generation = {
    number: number;
    count: number;
    offset: number;
}

export type BasicPokemon = {
    name: string;
    url: string;
}

export type SpeciesListReturn = {
    count: number;
    next: string;
    results: BasicPokemon[];
    previous: string | null;
}
