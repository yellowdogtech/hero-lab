import { Injectable } from '@angular/core';
import { Owner } from './owner';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class OwnerService {

  private ownersUrl = 'api/heroes';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private db: AngularFireDatabase) { }

  /** GET owners from the server */
  getOwner (id: number): Observable<any> {
    let years = this.db.list('years', 
        ref => ref.orderByChild('year').equalTo(2018))
        .valueChanges()        
      .pipe(
        tap(year => console.log('year 2018 fetched')),
        catchError(this.handleError('owner', {})));
    
     return years;
  }


  // /** PUT: update the hero on the server */
  // updateHero (owner: Owner): Observable<any> {
    
  //   return this.http.put(this.heroesUrl, owner, httpOptions).pipe(
  //     tap(_ => this.log(`updated hero id=${owner.id}`)),
  //     catchError(this.handleError<any>('updateHero'))
  //   );
  // }

  // addHero(owner: Owner): Observable<Owner> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  //   };

  //   return this.http.post(this.heroesUrl, owner, httpOptions).pipe(
  //     tap((hero: Owner) => this.log(`added hero w/ id=${hero.id}`)),
  //     catchError(this.handleError<Hero>('addHero'))
  //   );
  // }

//   deleteHero (hero: Hero | number): Observable<Hero> {
//     const id = typeof hero === 'number' ? hero : hero.id;
//     const url = `${this.heroesUrl}/${id}`;

//     return this.http.delete<Hero>(url, httpOptions).pipe(
//       tap(_ => this.log(`deleted hero id=${id}`)),
//       catchError(this.handleError<Hero>('deleteHero'))
//     );
//   }

// /* GET heroes whose name contains search term */
// searchHeroes(term: string): Observable<Hero[]> {
//   if (!term.trim()) {
//     // if not search term, return empty hero array.
//     return of([]);
//   }
//   return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
//     tap(_ => this.log(`found heroes matching "${term}"`)),
//     catchError(this.handleError<Hero[]>('searchHeroes', []))
//   );
// }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
