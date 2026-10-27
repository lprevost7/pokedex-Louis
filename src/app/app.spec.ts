import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { vi } from 'vitest';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the team selector', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.team-tab')?.textContent).toContain('(0/6)');
  });

  it('plays Cynthia music only for her complete team and stops when it changes', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    const audio = fixture.nativeElement.querySelector('audio') as HTMLAudioElement;
    const play = vi.spyOn(audio, 'play').mockResolvedValue();
    const pause = vi.spyOn(audio, 'pause').mockImplementation(() => {});
    const ids = [448, 445, 350, 423, 407, 442];
    const clickPokemon = (id: number) => {
      const index = app.pokemons.findIndex((pokemon) => pokemon.id === id);
      (fixture.nativeElement.querySelectorAll('.pokemon-card')[index] as HTMLElement).click();
    };
    ids.slice(0, 5).forEach(clickPokemon);
    expect(app.isCynthiaTeam).toBe(false);
    expect(play).not.toHaveBeenCalled();
    clickPokemon(ids[5]);
    await fixture.whenStable();
    expect(app.isCynthiaTeam).toBe(true);
    expect(play).toHaveBeenCalledTimes(1);
    expect(fixture.nativeElement.querySelector('.cynthia-panel').hidden).toBe(false);
    expect(fixture.nativeElement.querySelector('.cynthia-panel img')).toBeTruthy();
    audio.currentTime = 15;
    clickPokemon(ids[0]);
    await fixture.whenStable();
    expect(pause).toHaveBeenCalledTimes(1);
    expect(audio.currentTime).toBe(0);
    expect(fixture.nativeElement.querySelector('.cynthia-panel').hidden).toBe(true);
    clickPokemon(ids[0]);
    expect(play).toHaveBeenCalledTimes(2);
    fixture.destroy();
    expect(pause).toHaveBeenCalledTimes(2);
  });

  it('does not activate for a different team of six', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    app.pokemons.slice(0, 6).forEach((pokemon) => app.updateTeam({ pokemon, selected: true }));
    expect(app.isCynthiaTeam).toBe(false);
  });

  it('opens the secret console only with Charizard and Mewtwo and removes it on deselection', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const app = fixture.componentInstance;
    const clickPokemon = (id: number) => {
      const index = app.pokemons.findIndex((pokemon) => pokemon.id === id);
      (fixture.nativeElement.querySelectorAll('.pokemon-card')[index] as HTMLElement).click();
    };
    expect(fixture.nativeElement.querySelector('iframe')).toBeNull();
    clickPokemon(150);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('iframe')).toBeNull();
    clickPokemon(6);
    await fixture.whenStable();
    const consoleFrame = fixture.nativeElement.querySelector('iframe');
    expect(consoleFrame?.getAttribute('src')).toBe('emulator/index.html');
    clickPokemon(25);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('iframe')).toBe(consoleFrame);
    clickPokemon(150);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('iframe')).toBeNull();
    clickPokemon(150);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('iframe')).toBeTruthy();
    clickPokemon(6);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('iframe')).toBeNull();
  });
});
