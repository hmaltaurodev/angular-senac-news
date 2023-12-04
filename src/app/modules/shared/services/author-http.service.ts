import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../entities/author';
import { ICommandResult } from '../interfaces/i-command-result';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorHttpService {

  private endpoint: string = 'Author';

  constructor(private http: HttpService) { }

  public getAll(): Observable<Array<Author>> {
    return this.http.getAll<Array<Author>>(this.endpoint);
  }

  public get(id: string): Observable<Author> {
    return this.http.get<Author>(this.endpoint, id);
  }

  public insert(body: string): Observable<ICommandResult<Author>> {
    return this.http.post<ICommandResult<Author>>(this.endpoint, body);
  }

  public update(body: string): Observable<ICommandResult<Author>> {
    return this.http.put<ICommandResult<Author>>(this.endpoint, body);
  }

  public delete(id: string): Observable<ICommandResult<Author>> {
    return this.http.delete<ICommandResult<Author>>(this.endpoint, id);
  }
}
