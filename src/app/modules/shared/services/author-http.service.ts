import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../entities/author';
import { ICommandResult } from '../interfaces/i-command-result';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorHttpService {

  constructor(private http: HttpService) {
    http.endpoint = 'Author';
  }

  public getAll(): Observable<Array<Author>> {
    return this.http.getAll<Array<Author>>();
  }

  public get(id: string): Observable<Author> {
    return this.http.get<Author>(id);
  }

  public insert(body: string): Observable<ICommandResult<Author>> {
    return this.http.post<ICommandResult<Author>>(body);
  }

  public update(body: string): Observable<ICommandResult<Author>> {
    return this.http.put<ICommandResult<Author>>(body);
  }

  public delete(id: string): Observable<ICommandResult<Author>> {
    return this.http.delete<ICommandResult<Author>>(id);
  }
}
