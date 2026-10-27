import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCoponent } from './pokemon-coponent';
import { PokemonService } from '../../shared/service/pokemon-service';
import { PokemonDisplayMode } from '../../shared/enum/card-display';

describe('PokemonCoponent', () => {
  let component: PokemonCoponent;
  let fixture: ComponentFixture<PokemonCoponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCoponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCoponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('pokemon', TestBed.inject(PokemonService).getPokemons()[0]);
    fixture.componentRef.setInput('displayMode', PokemonDisplayMode.Spread);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
