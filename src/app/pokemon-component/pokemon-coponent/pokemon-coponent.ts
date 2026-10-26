import { Component } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IPokemon } from '../../shared/interface/pokemon';

@Component({
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  selector: 'app-pokemon-coponent',
  styleUrl: './pokemon-coponent.scss',
  templateUrl: './pokemon-coponent.html',
})
export class PokemonCoponent {
  @Input({ required: true }) pokemon!: IPokemon;
  @Output() teamSelectionChange = new EventEmitter<{
    pokemon: IPokemon;
    selected: boolean;
  }>();
  public isPartOfTeam = false;

  get typeImage(): string {
    return `https://raw.githubusercontent.com/partywhale/pokemon-type-icons/main/icons/${this.pokemon.type.toLowerCase()}.svg`;
  }

  public updatePokemon(): number {
    return 0
  }

  public toggleTeamSelection(): void {
    this.isPartOfTeam = !this.isPartOfTeam;
    this.teamSelectionChange.emit({
      pokemon: this.pokemon,
      selected: this.isPartOfTeam,
    });
  }
}