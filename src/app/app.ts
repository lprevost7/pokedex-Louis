import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonCoponent } from './pokemon-component/pokemon-coponent/pokemon-coponent';
import { PokemonService } from './shared/service/pokemon-service';
import { IPokemon } from './shared/interface/pokemon';

@Component({
  imports: [RouterOutlet, PokemonCoponent],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  readonly pokemons;
  team: IPokemon[] = [];
  teamTabOpen = false;

  constructor(private readonly pokemonService: PokemonService) {
    this.pokemons = this.pokemonService.getPokemons();
  }

  updateTeam(event: { pokemon: IPokemon; selected: boolean }): void {
    if (event.selected) {
      this.team = [...this.team, event.pokemon];
      return;
    }

    this.team = this.team.filter((pokemon) => pokemon.id !== event.pokemon.id);
  }

  toggleTeamTab(): void {
    this.teamTabOpen = !this.teamTabOpen;
  }
}
