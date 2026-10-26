import { Injectable } from '@angular/core';
import { IPokemon } from '../interface/pokemon';
import { pokemonType } from '../enum/pokemon-type';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {

  private readonly pokemons: IPokemon[] = [

    // ========================
    // BULBASAUR AND EVOLUTIONS
    // ========================

    {
      id: 1,
      name: 'Bulbasaur',
      type: pokemonType.Grass,
      image: 'https://img.pokemondb.net/sprites/black-white/anim/normal/bulbasaur.gif',
      hp: 45,
      cr: 45,
      sp: 0,
      atq: 49,
      spe_atq: 65,
      def: 49,
      spe_def: 65
    },
    {
      id: 2,
      name: 'Ivysaur',
      type: pokemonType.Grass,
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png',
      hp: 60,
      cr: 45,
      sp: 0,
      atq: 62,
      spe_atq: 80,
      def: 63,
      spe_def: 80
    },
    {
      id: 3,
      name: 'Venusaur',
      type: pokemonType.Grass,
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png',
      hp: 80,
      cr: 45,
      sp: 0,
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
      type: pokemonType.Fire,
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
      hp: 39,
      cr: 45,
      sp: 0,
      atq: 52,
      spe_atq: 60,
      def: 43,
      spe_def: 50
    },
    {
      id: 5,
      name: 'Charmeleon',
      type: pokemonType.Fire,
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png',
      hp: 58,
      cr: 45,
      sp: 0,
      atq: 64,
      spe_atq: 80,
      def: 58,
      spe_def: 65
    },
    {
      id: 6,
      name: 'Charizard',
      type: pokemonType.Fire,
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
      hp: 78,
      cr: 45,
      sp: 0,
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
      type: pokemonType.Water,
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
      hp: 44,
      cr: 45,
      sp: 0,
      atq: 48,
      spe_atq: 50,
      def: 65,
      spe_def: 64
    },
    {
      id: 8,
      name: 'Wartortle',
      type: pokemonType.Water,
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png',
      hp: 59,
      cr: 45,
      sp: 0,
      atq: 63,
      spe_atq: 65,
      def: 80,
      spe_def: 80
    },
    {
      id: 9,
      name: 'Blastoise',
      type: pokemonType.Water,
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png',
      hp: 79,
      cr: 45,
      sp: 0,
      atq: 83,
      spe_atq: 85,
      def: 100,
      spe_def: 105
    },

    // ========================
    // PIKACHU
    // ========================

    {
      id: 25,
      name: 'Pikachu',
      type: pokemonType.Electric,
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
      hp: 35,
      cr: 190,
      sp: 0,
      atq: 55,
      spe_atq: 50,
      def: 40,
      spe_def: 50
    },

    // ========================
    // MEWTWO
    // ========================

    {
      id: 150,
      name: 'Mewtwo',
      type: pokemonType.Psychic,
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png',
      hp: 106,
      cr: 3,
      sp: 0,
      atq: 110,
      spe_atq: 154,
      def: 90,
      spe_def: 90
    },

    // ========================
    // MEW
    // ========================

    {
      id: 151,
      name: 'Mew',
      type: pokemonType.Psychic,
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png',
      hp: 100,
      cr: 45,
      sp: 0,
      atq: 100,
      spe_atq: 100,
      def: 100,
      spe_def: 100
    }

  ];

  public getPokemons(): IPokemon[] {
    return this.pokemons;
  }

  public getPokemonById(id: number): IPokemon | undefined {
    return this.pokemons.find(pokemon => pokemon.id === id);
  }
}