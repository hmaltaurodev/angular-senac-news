import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from '../entities/news';
import { ICommandResult } from '../interfaces/i-command-result';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class NewsHttpService {

  constructor(private http: HttpService) {
    http.endpoint = 'News';
  }

  public getAll(): Observable<Array<News>> {
    return this.http.getAll<Array<News>>();
  }

  public get(id: string): Observable<News> {
    return this.http.get<News>(id);
  }

  public insert(body: string): Observable<ICommandResult<News>> {
    return this.http.post<ICommandResult<News>>(body);
  }

  public update(body: string): Observable<ICommandResult<News>> {
    return this.http.put<ICommandResult<News>>(body);
  }

  public delete(id: string): Observable<ICommandResult<News>> {
    return this.http.delete<ICommandResult<News>>(id);
  }
}
