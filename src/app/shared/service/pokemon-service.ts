import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { pokemonType } from '../enum/pokemon-type';
import { IPokemon } from '../interface/pokemon';

interface ApiAttack {
  id: number;
  name: string;
  points: number;
}

interface ApiPokemon {
  id: number;
  name: string;
  type: string | string[];
  attacks: ApiAttack[];
  defensePoints: number;
  healthPoints: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  captureRate: number;
  imageURL: string;
}

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private readonly apiUrl = 'http://localhost:7000/api/pokemons';
  private readonly loadingPromise: Promise<void>;
  public readonly pokemons = signal<IPokemon[]>([]);

  constructor(private readonly http: HttpClient) {
    this.loadingPromise = this.loadPokemons().catch(error => {
      console.error('Impossible de charger les Pokémon depuis l’API.', error);
      throw error;
    });
  }

  public getPokemonById(id: number): IPokemon | undefined {
    return this.pokemons().find(pokemon => pokemon.id === id);
  }

  public getPokemons(): IPokemon[] {
    return this.pokemons();
  }

  public async addPokemon(pokemon: IPokemon): Promise<void> {
    try {
      await this.loadingPromise;
      const created = await firstValueFrom(this.http.post<ApiPokemon>(
        this.apiUrl,
        this.toApiPokemon(pokemon)
      ));
      this.pokemons.update(pokemons => [...pokemons, this.fromApiPokemon(created)]);
    } catch (error) {
      throw new Error(this.getApiErrorMessage(error, 'Impossible de créer le Pokémon.'));
    }
  }

  public async updatePokemon(pokemon: IPokemon): Promise<void> {
    try {
      await this.loadingPromise;
      const updated = await firstValueFrom(
        this.http.put<ApiPokemon>(`${this.apiUrl}/${pokemon.id}`, this.toApiPokemon(pokemon))
      );
      this.pokemons.update(pokemons =>
        pokemons.map(current => current.id === pokemon.id ? this.fromApiPokemon(updated) : current)
      );
    } catch (error) {
      throw new Error(this.getApiErrorMessage(error, 'Impossible de modifier le Pokémon.'));
    }
  }

  private async loadPokemons(): Promise<void> {
    const apiPokemons = await firstValueFrom(this.http.get<ApiPokemon[]>(this.apiUrl));
    this.pokemons.set(apiPokemons.map(pokemon => this.fromApiPokemon(pokemon)));
  }

  private fromApiPokemon(pokemon: ApiPokemon): IPokemon {
    const types = (Array.isArray(pokemon.type) ? pokemon.type : [pokemon.type])
      .map(type => this.toPokemonType(type))
      .filter((type): type is pokemonType => type !== undefined);
    return {
      id: pokemon.id,
      name: pokemon.name,
      type: types,
      hp: pokemon.healthPoints,
      sp: pokemon.speed,
      atq: pokemon.attacks[0]?.points ?? 0,
      spe_atq: pokemon.specialAttack,
      def: pokemon.defensePoints,
      spe_def: pokemon.specialDefense,
      cr: pokemon.captureRate,
      attacks: pokemon.attacks,
      imageURL: pokemon.imageURL,
    };
  }

  private toApiPokemon(pokemon: IPokemon): Omit<ApiPokemon, 'id'> {
    const attacks = pokemon.attacks?.length
      ? pokemon.attacks.map((attack, index) => ({
        ...attack,
        points: index === 0 ? pokemon.atq : index === 1 ? pokemon.spe_atq : attack.points,
      }))
      : [
        { id: 0, name: 'Attaque', points: pokemon.atq },
        { id: 0, name: 'Attaque spéciale', points: pokemon.spe_atq },
      ];

    return {
      name: pokemon.name,
      type: pokemon.type.map(type => type.toUpperCase()),
      attacks,
      defensePoints: pokemon.def,
      healthPoints: pokemon.hp,
      specialAttack: pokemon.spe_atq,
      specialDefense: pokemon.spe_def,
      speed: pokemon.sp,
      captureRate: pokemon.cr,
      imageURL: pokemon.imageURL ?? '',
    };
  }

  private toPokemonType(type: string): pokemonType | undefined {
    return Object.values(pokemonType).find(value => value.toUpperCase() === type.toUpperCase());
  }

  private getApiErrorMessage(error: unknown, fallback: string): string {
    if (!(error instanceof HttpErrorResponse)) return fallback;

    const apiMessage = error.error?.message;
    if (typeof apiMessage === 'string') return apiMessage;

    const validationErrors = error.error?.errors;
    if (validationErrors && typeof validationErrors === 'object') {
      return Object.values(validationErrors).flat().join(' ');
    }

    return error.message || fallback;
  }
}
