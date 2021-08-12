
// 1.Создай Ангуляр приложение

// 2.Создай одну index страницу на которой будет отображаться список блоков пива полученный из - punkapi.com

// 3.В каждом блоке должно быть - Name, ABV, Tagline, Image.

// 4.Пользователь должен иметь возможность сортировать по ABV (low-to-high and high-to-low). Пользователь может очистить фильтры.

// 5.Пользователь должен иметь возможность поиска пива по описанию (tagline), вводя в инпут значения.


import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { BeerService, BeerI } from './services/beer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {

  beer$:BehaviorSubject<BeerI[] | null> = new BehaviorSubject<BeerI[] | null>(null);
  
 
  constructor(
    private beerService:BeerService,
    ) {}
 

  ngOnInit(): void {
    this.getBeerList();
  }

  getBeerList() {
    this.beerService.getBeerList().pipe(take(1)).subscribe(
      result=>this.beer$.next(result)
    );
  }

  ngOnDestroy() {}
}
