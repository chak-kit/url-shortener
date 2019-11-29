import {Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Shortening} from '../models/shortening-response.interface';
import {StorageService} from '../storage.service';
import { Router, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {
  routeSubscription: Subscription;
  shortening: Shortening;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): any {
    this.routeSubscription = this.route.url.subscribe(url => {
      const id = url[1].path;
      console.log('url = ' + id);

      this.shortening = this.storageService.getShorteningById(id);
      console.log(this.shortening);

    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  delete() {
    const isDelete = confirm('Do you want delete me?');
    if (isDelete) {
      this.storageService.deleteShortening(this.shortening);
      this.router.navigateByUrl('/shortener');

    } else {
      return;
    }
  }


}



