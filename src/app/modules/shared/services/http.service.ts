import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiUrl: string = 'https://localhost:7280/api';
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  private options = { headers: this.headers };

  constructor(private http: HttpClient) { }

  public getAll<T>(endpoint: string): Observable<T> {
    const url: string = `${this.apiUrl}/${endpoint}/List`;
    return this.http.get<T>(url, this.options);
  }

  public get<T>(endpoint: string, id: string): Observable<T> {
    const url: string = `${this.apiUrl}/${endpoint}/${id}`;
    return this.http.get<T>(url, this.options);
  }

  public delete<T>(endpoint: string, id: string): Observable<T> {
    const url: string = `${this.apiUrl}/${endpoint}/${id}`;
    return this.http.delete<T>(url, this.options);
  }

  public post<T>(endpoint: string, body: string): Observable<T> {
    const url: string = `${this.apiUrl}/${endpoint}/Add`;
    return this.http.post<T>(url, body, this.options);
  }

  public put<T>(endpoint: string, body: string): Observable<T> {
    const url: string = `${this.apiUrl}/${endpoint}/Update`;
    return this.http.put<T>(url, body, this.options);
  }
}
