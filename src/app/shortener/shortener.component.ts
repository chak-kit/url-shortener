import {Component, OnInit, Output} from '@angular/core';
import { ShortenerApiService } from '../shortener-api.service';
import { StorageService } from '../storage.service';
import { Shortening } from '../models/shortening-response.interface';


@Component({
  selector: 'app-shortener',
  templateUrl: './shortener.component.html',
  styleUrls: ['./shortener.component.css']
})
export class ShortenerComponent implements OnInit {
  url = '';
  name = '';
  shortenings: Shortening[] = [];

  constructor(
    private shortAPI: ShortenerApiService,
    private storageService: StorageService,
  ) {}

  ngOnInit() {
    this.updateShortenings();
  }

  onSubmit() {
    if (!this.url || !this.name) {
      alert('You should enter both url and name');
      return;
    }

    const id = `f${(+new Date).toString(16)}`;

    this.shortAPI.shortenUrl(this.url).subscribe((res) => {
      res.result.name = this.name;
      res.result.id = id;
      this.storageService.saveShortening(res.result);
      this.updateShortenings();
    });
  }

  updateShortenings() {
    this.shortenings = this.storageService.getShortenings();
  }

  delete(shortening: Shortening) {
    const isDelete = confirm('Do you want delete me?');
    if (isDelete) {
      this.storageService.deleteShortening(shortening);
      this.updateShortenings();
    } else {
      return;
    }
  }
}
