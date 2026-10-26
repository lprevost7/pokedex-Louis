import { Injectable } from '@angular/core';
import { IPokemon } from '../interface/pokemon';
import { pokemonType } from '../enum/pokemon-type';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly pokemons: IPokemon[] = [
    {
      id: 25,
      name: 'Pikachu',
      type: pokemonType.Electric,
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
      hp: 35,
      cr: 190,
      sp: 0,
      atq: 0,
      spe_atq: 0,
      def: 0,
      spe_def: 0
    },
  ];

  getPokemons(): IPokemon[] {
    return this.pokemons;
  }
}
