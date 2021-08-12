
// 1.Создай Ангуляр приложение

// 2.Создай одну index страницу на которой будет отображаться список блоков пива полученный из - punkapi.com

// 3.В каждом блоке должно быть - Name, ABV, Tagline, Image.

// 4.Пользователь должен иметь возможность сортировать по ABV (low-to-high and high-to-low). Пользователь может очистить фильтры.

// 5.Пользователь должен иметь возможность поиска пива по описанию (tagline), вводя в инпут значения.


import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { combineLatest, from, fromEvent, merge, Observable, of, BehaviorSubject } from 'rxjs';
import {  take, filter, tap, map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { BeerService, BeerI } from './services/beer.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {

  beer$:BehaviorSubject<BeerI[] | null> = new BehaviorSubject<BeerI[] | null>(null);
  @ViewChild('toFilter') toFilter!: ElementRef;
  loading!:boolean;
 
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

   sort(sortType:string) { 
    let arr = this.beer$.value;
    if (!arr) return;

    if(sortType === 'asc') 
      arr =  arr.sort((a,b) => (a.abv > b.abv) ? 1 : ((b.abv > a.abv) ? -1 : 0));

      if(sortType === 'desc') 
        arr =  arr.sort((a,b) => (a.abv < b.abv) ? 1 : ((b.abv < a.abv) ? -1 : 0));  

        this.beer$.next(arr);   
   }


   ngAfterViewInit() {

    fromEvent(this.toFilter.nativeElement, 'keyup').pipe(
        map((event:any)=>event.target.value),
        debounceTime(500),
        distinctUntilChanged(),
        tap(res=>{
          this.loading = true;
        }),
        switchMap(query=>this.filterData(query)),
        tap(res=>this.loading = false),
    ).subscribe((res:any) => {
      this.beer$.next(res);  
      });
  }


  filterData(query:string):any {

    const promise:Promise<BeerI[]> = new Promise(
      resolve=>{
        const arr:BeerI[] = this.beerService.restoreArray;
        const filteredArr = arr.filter(val=>(val.tagline.toLowerCase().indexOf(query.toLowerCase()) > -1));
        resolve(filteredArr)
      }
    )
    
    return promise;
  }

  ngOnDestroy() {}
}
