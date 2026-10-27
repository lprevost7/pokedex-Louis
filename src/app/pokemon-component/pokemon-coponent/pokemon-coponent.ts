import { Component } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IPokemon } from '../../shared/interface/pokemon';
import { CaptureRatePipe } from '../../shared/pipe/capture-rate.pipe';
import { PokemonNamePipe } from '../../shared/pipe/pokemon-name.pipe';
import { PokemonDisplayMode } from '../../shared/enum/card-display';
import { pokemonType } from '../../shared/enum/pokemon-type';

@Component({
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CaptureRatePipe,
    PokemonNamePipe,
  ],
  selector: 'app-pokemon-coponent',
  styleUrl: './pokemon-coponent.scss',
  templateUrl: './pokemon-coponent.html',
})
export class PokemonCoponent {
  @Input({ required: true }) pokemon!: IPokemon;
  @Input({ required: true }) displayMode!: PokemonDisplayMode;
  @Output() teamSelectionChange = new EventEmitter<{
    pokemon: IPokemon;
    selected: boolean;
  }>();
  @Output() editPokemon = new EventEmitter<IPokemon>();
  public isPartOfTeam = false;
  public DisplayMode = PokemonDisplayMode;

  public getTypeImage(type: pokemonType): string {
    return `https://raw.githubusercontent.com/partywhale/pokemon-type-icons/main/icons/${type.toLowerCase()}.svg`;
  }

  get profileImage(): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${this.pokemon.id}.gif`;
  }

  public get primaryType(): pokemonType {
    return this.pokemon.type[0];
  }

  public updatePokemon(): void {
    this.editPokemon.emit(this.pokemon);
  }

  public toggleTeamSelection(): void {
    this.isPartOfTeam = !this.isPartOfTeam;
    this.teamSelectionChange.emit({
      pokemon: this.pokemon,
      selected: this.isPartOfTeam,
    });
  }

}