import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from '../entities/news';
import { ICommandResult } from '../interfaces/i-command-result';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class NewsHttpService {

  private endpoint: string = 'News';

  constructor(private http: HttpService) { }

  public getAll(): Observable<Array<News>> {
    return this.http.getAll<Array<News>>(this.endpoint);
  }

  public get(id: string): Observable<News> {
    return this.http.get<News>(this.endpoint, id);
  }

  public insert(body: string): Observable<ICommandResult<News>> {
    return this.http.post<ICommandResult<News>>(this.endpoint, body);
  }

  public update(body: string): Observable<ICommandResult<News>> {
    return this.http.put<ICommandResult<News>>(this.endpoint, body);
  }

  public delete(id: string): Observable<ICommandResult<News>> {
    return this.http.delete<ICommandResult<News>>(this.endpoint, id);
  }
}
