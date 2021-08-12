import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse }from "@angular/common/http";
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
//import { BeerI} from '../models/interfaces';

export interface BeerI {
    name:string,
    abv:string, 
    tagline:string,
    image_url:string, 
}


@Injectable({providedIn:'root'})
export class BeerService {

    restoreArray:BeerI[] = [];  // возможно имеет смысл запрашивать с сервера

    constructor(
        private http:HttpClient
    ) {}


    getBeerList():Observable<BeerI[]> {

        return  this.http.get(`${environment.beerUrl}`)
         .pipe(   
              map((result:any)=><BeerI[]>result),
              tap((result:BeerI[])=>this.restoreArray = result),
         ) 
    }

}