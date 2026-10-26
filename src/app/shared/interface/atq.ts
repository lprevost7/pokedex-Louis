import { pokemonType } from "../enum/pokemon-type";

export interface IAttack {
    id: number;
    name: string;
    pp_max: number;
    type: pokemonType;
    power: number;
    precision: number;

}