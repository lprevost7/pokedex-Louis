import { pokemonType } from "../enum/pokemon-type";

export interface IPokemon {
  id: number;
  name: string;
  type: pokemonType;
  image: string;
  hp: number;
  sp: number;
  atq: number;
  spe_atq: number;
  def: number;
  spe_def: number;
  cr: number;
}