import { Injectable } from '@angular/core';
import { pokemonType } from '../enum/pokemon-type';
import { IAttack } from '../interface/atq';

@Injectable({
  providedIn: 'root',
})
export class AtqService {

  private readonly attacks: IAttack[] = [
    {
      id: 1,
      name: 'Charge',
      pp_max: 35,
      type: pokemonType.Normal,
      power: 40,
      precision: 100
    },
    {
      id: 2,
      name: 'Fouet Lianes',
      pp_max: 25,
      type: pokemonType.Grass,
      power: 45,
      precision: 100
    },
    {
      id: 3,
      name: 'Flammèche',
      pp_max: 25,
      type: pokemonType.Fire,
      power: 40,
      precision: 100
    },
    {
      id: 4,
      name: 'Lance-Flammes',
      pp_max: 15,
      type: pokemonType.Fire,
      power: 90,
      precision: 100
    },
    {
      id: 5,
      name: 'Pistolet à O',
      pp_max: 25,
      type: pokemonType.Water,
      power: 40,
      precision: 100
    },
    {
      id: 6,
      name: 'Hydrocanon',
      pp_max: 5,
      type: pokemonType.Water,
      power: 110,
      precision: 80
    },
    {
      id: 7,
      name: 'Éclair',
      pp_max: 30,
      type: pokemonType.Electric,
      power: 40,
      precision: 100
    },
    {
      id: 8,
      name: 'Tonnerre',
      pp_max: 15,
      type: pokemonType.Electric,
      power: 90,
      precision: 100
    },
    {
      id: 9,
      name: 'Psyko',
      pp_max: 10,
      type: pokemonType.Psychic,
      power: 90,
      precision: 100
    },
    {
      id: 10,
      name: 'Ball Ombre',
      pp_max: 15,
      type: pokemonType.Ghost,
      power: 80,
      precision: 100
    }
  ];

  // Récupérer toutes les attaques
  public getAttacks(): IAttack[] {
    return this.attacks;
  }

  // Récupérer une attaque par son ID
  public getAttackById(id: number): IAttack | undefined {
    return this.attacks.find(attack => attack.id === id);
  }

  // Récupérer les attaques d'un type
  public getAttacksByType(type: pokemonType): IAttack[] {
    return this.attacks.filter(attack => attack.type === type);
  }
}