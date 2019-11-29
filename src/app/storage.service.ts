import { Injectable } from '@angular/core';
import { Shortening } from './models/shortening-response.interface';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  shortenings: Shortening[] = [];

  constructor() {
    this.shortenings = this.getShortenings();
  }

  saveShortening(shortening: Shortening): void {
    this.shortenings.push(shortening);
    this.updateStorage(this.shortenings);
  }

  deleteShortening(shortening: Shortening) {
    const index = this.shortenings.findIndex(value => value.id === shortening.id);
    this.shortenings.splice(index, 1);
    this.updateStorage(this.shortenings);
  }


  getShortenings(): Shortening[] {
    const shorteningsString = localStorage.getItem('shortenings');

    if (!shorteningsString) {
      return [];
    }

    try {
      return JSON.parse(shorteningsString);
    } catch {
      return [];
    }
  }

  getShorteningById(id: string): Shortening {
    return this.getShortenings().filter(short => short.id === id)[0];
  }

  updateStorage(shortenings: Shortening[]): void {
    localStorage.setItem('shortenings', JSON.stringify(shortenings));
  }


}
