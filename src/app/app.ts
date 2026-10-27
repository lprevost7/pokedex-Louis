import { Component, ElementRef, OnDestroy, ViewChild, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PokemonCoponent } from './pokemon-component/pokemon-coponent/pokemon-coponent';
import { PokemonService } from './shared/service/pokemon-service';
import { IPokemon } from './shared/interface/pokemon';
import { PokemonDisplayMode } from './shared/enum/card-display';
import { pokemonType } from './shared/enum/pokemon-type';

type PokemonStat = 'hp' | 'atq' | 'def' | 'spe_atq' | 'spe_def' | 'sp' | 'cr';

@Component({
  imports: [PokemonCoponent, MatButtonModule, MatIconModule],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App implements OnDestroy {
  @ViewChild('cynthiaAudio', { static: true })
  private cynthiaAudio!: ElementRef<HTMLAudioElement>;
  private readonly cynthiaTeamIds = [442, 407, 423, 448, 350, 445];
  readonly DisplayMode = PokemonDisplayMode;
  readonly pokemonTypes = Object.values(pokemonType);
  readonly formStats: { key: PokemonStat; label: string }[] = [
    { key: 'hp', label: 'PV' },
    { key: 'atq', label: 'Attaque' },
    { key: 'def', label: 'Défense' },
    { key: 'spe_atq', label: 'Att. Spé.' },
    { key: 'spe_def', label: 'Déf. Spé.' },
    { key: 'sp', label: 'Vitesse' },
    { key: 'cr', label: 'Taux de capture' },
  ];
  readonly isFormOpen = signal(false);
  readonly editingPokemon = signal<IPokemon | null>(null);
  readonly formPokemon = signal<IPokemon>(this.createEmptyPokemon());
  readonly formError = signal('');
  displayMode = PokemonDisplayMode.Spread;
  team: IPokemon[] = [];
  teamTabOpen = false;

  get isFireRedTeam(): boolean {
    return [6, 150].every((id) => this.team.some((pokemon) => pokemon.id === id));
  }

  get isCynthiaTeam(): boolean {
    return this.team.length === this.cynthiaTeamIds.length &&
      this.cynthiaTeamIds.every((id) => this.team.some((pokemon) => pokemon.id === id));
  }

  constructor(private readonly pokemonService: PokemonService) {}

  get pokemons(): IPokemon[] {
    return this.pokemonService.pokemons();
  }

  openCreateForm(): void {
    this.editingPokemon.set(null);
    this.formPokemon.set(this.createEmptyPokemon());
    this.formError.set('');
    this.isFormOpen.set(true);
  }

  openEditForm(pokemon: IPokemon): void {
    this.editingPokemon.set(pokemon);
    this.formPokemon.set({ ...pokemon, type: [...pokemon.type] });
    this.formError.set('');
    this.isFormOpen.set(true);
  }

  closeForm(): void {
    this.isFormOpen.set(false);
    this.formError.set('');
  }

  updateFormField(field: keyof IPokemon, event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = field === 'name' ? input.value : Number(input.value);
    this.formPokemon.update(pokemon => ({ ...pokemon, [field]: value }));
  }

  toggleFormType(type: pokemonType, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.formPokemon.update(pokemon => {
      const types = checked
        ? [...pokemon.type, type]
        : pokemon.type.filter(currentType => currentType !== type);
      return { ...pokemon, type: types.slice(0, 2) };
    });
  }

  savePokemon(): void {
    const pokemon = this.formPokemon();
    if (pokemon.id < 1 || !pokemon.name.trim() || pokemon.type.length === 0) {
      this.formError.set('L’identifiant, le nom et au moins un type sont obligatoires.');
      return;
    }

    try {
      if (this.editingPokemon()) {
        this.pokemonService.updatePokemon(pokemon);
      } else {
        this.pokemonService.addPokemon(pokemon);
      }
      this.closeForm();
    } catch (error) {
      this.formError.set(error instanceof Error ? error.message : 'Impossible d’enregistrer le Pokémon.');
    }
  }

  private createEmptyPokemon(): IPokemon {
    return {
      id: 0,
      name: '',
      type: [],
      hp: 1,
      sp: 1,
      atq: 1,
      spe_atq: 1,
      def: 1,
      spe_def: 1,
      cr: 1,
    };
  }

  updateTeam(event: { pokemon: IPokemon; selected: boolean }): void {
    const wasCynthiaTeam = this.isCynthiaTeam;
    if (event.selected) {
      if (!this.team.some((pokemon) => pokemon.id === event.pokemon.id)) {
        this.team = [...this.team, event.pokemon];
      }
    } else {
      this.team = this.team.filter((pokemon) => pokemon.id !== event.pokemon.id);
    }

    if (this.isCynthiaTeam === wasCynthiaTeam) return;

    const audio = this.cynthiaAudio.nativeElement;
    if (this.isCynthiaTeam) {
      audio.currentTime = 0;
      // Keep native controls available if the browser refuses automatic playback.
      void audio.play().catch(() => {});
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  ngOnDestroy(): void {
    if (this.isCynthiaTeam) this.cynthiaAudio?.nativeElement.pause();
  }

  toggleTeamTab(): void {
    this.teamTabOpen = !this.teamTabOpen;
  }

  changeDisplayMode(): void {
    const modes = Object.values(PokemonDisplayMode);
    const index = modes.indexOf(this.displayMode);
    this.displayMode = modes[(index + 1) % modes.length];
  }
}
