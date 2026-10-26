import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCoponent } from './pokemon-coponent';

describe('PokemonCoponent', () => {
  let component: PokemonCoponent;
  let fixture: ComponentFixture<PokemonCoponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCoponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCoponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
