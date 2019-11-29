import {PipeTransform, Pipe} from '@angular/core';
import {Shortening} from '../models/shortening-response.interface';

@Pipe({
  name: 'shortenerFilter'
})

export class ShortenerFilterPipe implements PipeTransform {
  transform(shortenings: Shortening[], searchTerm: string): Shortening[] {
    if (!shortenings || !searchTerm) {
      return shortenings;
    }

    return shortenings.filter(sort =>
      sort.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }
}


