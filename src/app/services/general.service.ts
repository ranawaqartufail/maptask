import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, map, tap, delay } from 'rxjs/operators';
import { BehaviorSubject, forkJoin, Observable, of, Subject, throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class GeneralService {
    baseUrl = 'https://wipperfuerth.pgconnect.de/api/v1/webgis';

constructor(private http: HttpClient) { }
    getAll(path: string): Observable<any> {
        let url = `${this.baseUrl}/${path}`;
        return this.http.get(url).pipe(
            tap(res => {
                return res;
            })
        );
    }

    get(path: string, id: number): Observable<any> {
        let url = `${this.baseUrl}/${path}/${id}`;
        return this.http.get(url).pipe(
            tap(res => {
                return res;
            })
        );
    }

    getWithParams(path: string, params: any): Observable<any> {
      
        let url = `${this.baseUrl}/${path}`;
        return this.http.get(url, { params: params }).pipe(
            tap(res => {
                return res;
            })
        );
    }
 

}