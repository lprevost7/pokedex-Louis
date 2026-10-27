import { Injectable, signal } from '@angular/core';
import { IPokemon } from '../interface/pokemon';
import { pokemonType } from '../enum/pokemon-type';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {

  public readonly pokemons = signal<IPokemon[]>([

    {
      id: 1,
      name: 'Bulbasaur',
      type: [pokemonType.Grass],
      hp: 45,
      cr: 45,
      sp: 45,
      atq: 49,
      spe_atq: 65,
      def: 49,
      spe_def: 65
    },
    {
      id: 3,
      name: 'Venusaur',
      type: [pokemonType.Grass, pokemonType.Poison],
      hp: 80,
      cr: 45,
      sp: 80,
      atq: 82,
      spe_atq: 100,
      def: 83,
      spe_def: 100
    },

    // ========================
    // CHARMANDER AND EVOLUTIONS
    // ========================

    {
      id: 4,
      name: 'Charmander',
      type: [pokemonType.Fire],
      hp: 39,
      cr: 45,
      sp: 65,
      atq: 52,
      spe_atq: 60,
      def: 43,
      spe_def: 50
    },

    {
      id: 6,
      name: 'Charizard',
      type: [pokemonType.Fire, pokemonType.Flying],
      hp: 78,
      cr: 45,
      sp: 100,
      atq: 84,
      spe_atq: 109,
      def: 78,
      spe_def: 85
    },

    // ========================
    // SQUIRTLE AND EVOLUTIONS
    // ========================

    {
      id: 7,
      name: 'Squirtle',
      type: [pokemonType.Water],
      hp: 44,
      cr: 45,
      sp: 43,
      atq: 48,
      spe_atq: 50,
      def: 65,
      spe_def: 64
    },

    {
      id: 9,
      name: 'Blastoise',
      type: [pokemonType.Water],
      hp: 79,
      cr: 45,
      sp: 78,
      atq: 83,
      spe_atq: 85,
      def: 100,
      spe_def: 105
    },

    {
      id: 25,
      name: 'Pikachu',
      type: [pokemonType.Electric],
      hp: 35,
      cr: 190,
      sp: 0,
      atq: 55,
      spe_atq: 50,
      def: 40,
      spe_def: 50
    },

    {
      id: 150,
      name: 'Mewtwo',
      type: [pokemonType.Psychic],
      hp: 106,
      cr: 3,
      sp: 0,
      atq: 110,
      spe_atq: 154,
      def: 90,
      spe_def: 90
    },

    {
      id: 151,
      name: 'Mew',
      type: [pokemonType.Psychic],
      hp: 100,
      cr: 45,
      sp: 0,
      atq: 100,
      spe_atq: 100,
      def: 100,
      spe_def: 100
    },

    {
      id: 350,
      name: 'Milotic',
      type: [pokemonType.Water],
      hp: 95,
      cr: 60,
      sp: 81,
      atq: 60,
      spe_atq: 100,
      def: 79,
      spe_def: 125
    },
    {
      id: 407,
      name: 'Roserade',
      type: [pokemonType.Grass, pokemonType.Poison],
      hp: 60,
      cr: 75,
      sp: 90,
      atq: 70,
      spe_atq: 125,
      def: 65,
      spe_def: 105
    },
    {
      id: 423,
      name: 'Gastrodon',
      type: [pokemonType.Water, pokemonType.Ground],
      hp: 111,
      cr: 75,
      sp: 39,
      atq: 83,
      spe_atq: 92,
      def: 68,
      spe_def: 82
    },
    {
      id: 442,
      name: 'Spiritomb',
      type: [pokemonType.Ghost],
      hp: 50,
      cr: 100,
      sp: 35,
      atq: 92,
      spe_atq: 92,
      def: 108,
      spe_def: 108
    },
    {
      id: 445,
      name: 'Garchomp',
      type: [pokemonType.Dragon, pokemonType.Ground],
      hp: 108,
      cr: 45,
      sp: 102,
      atq: 130,
      spe_atq: 80,
      def: 95,
      spe_def: 85
    },
    {
      id: 448,
      name: 'Lucario',
      type: [pokemonType.Fighting, pokemonType.Steel],
      hp: 70,
      cr: 45,
      sp: 90,
      atq: 110,
      spe_atq: 115,
      def: 70,
      spe_def: 70
    },
    {
      id: 483,
      name: 'Dialga',
      type: [pokemonType.Dragon, pokemonType.Steel],
      hp: 100,
      cr: 30,
      sp: 90,
      atq: 120,
      spe_atq: 150,
      def: 120,
      spe_def: 100
    },
    {
      id: 484,
      name: 'Palkia',
      type: [pokemonType.Dragon, pokemonType.Water],
      hp: 90,
      cr: 30,
      sp: 100,
      atq: 120,
      spe_atq: 150,
      def: 100,
      spe_def: 120
    }

  ]);

  public getPokemons(): IPokemon[] {
    return this.pokemons();
  }

  public getPokemonById(id: number): IPokemon | undefined {
    return this.pokemons().find(pokemon => pokemon.id === id);
  }

  public addPokemon(pokemon: IPokemon): void {
    if (this.getPokemonById(pokemon.id)) {
      throw new Error(`Le Pokémon avec l'identifiant ${pokemon.id} existe déjà.`);
    }

    this.pokemons.update(pokemons => [...pokemons, pokemon]);
  }

  public updatePokemon(pokemon: IPokemon): void {
    if (!this.getPokemonById(pokemon.id)) {
      throw new Error(`Le Pokémon avec l'identifiant ${pokemon.id} n'existe pas.`);
    }

    this.pokemons.update(pokemons =>
      pokemons.map(currentPokemon =>
        currentPokemon.id === pokemon.id ? pokemon : currentPokemon
      )
    );
  }
}