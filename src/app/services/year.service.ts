import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message.service';
import { catchError, map, tap } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class YearService {

  constructor(
    private messageService: MessageService,
    private db: AngularFireDatabase) { }

  getYears(): Observable<any[]> {
    return this.db.list('years').valueChanges()
      .pipe(
        tap(years => this.log('years fetched')),
        catchError(this.handleError('years', []))
      );
  }

  getSelectedYear(year: number): Observable<any> {
    return this.db.list('years', ref => ref.orderByChild('year').equalTo(year)).valueChanges()
      .pipe(
        tap(year => this.log('year fetched')),
        catchError(this.handleError('year', {}))
      );
  }
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

  /** Log a YearService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`YearService: ${message}`);
  }

}
