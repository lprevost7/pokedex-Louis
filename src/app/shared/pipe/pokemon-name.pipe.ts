import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonName',
  standalone: true,
})
export class PokemonNamePipe implements PipeTransform {
  transform(name: string): string {
    const formattedName = name.trim().toLowerCase();

    return formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
  }
}
