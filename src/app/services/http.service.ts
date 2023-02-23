import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseURL: string = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  getData(): Observable<string[]> {
    return this.http.get<string[]>(this.baseURL + 'data')
  }
}
