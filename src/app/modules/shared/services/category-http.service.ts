import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../entities/category';
import { ICommandResult } from '../interfaces/i-command-result';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryHttpService {

  private endpoint: string = 'Category';

  constructor(private http: HttpService) { }

  public getAll(): Observable<Array<Category>> {
    return this.http.getAll<Array<Category>>(this.endpoint);
  }

  public get(id: string): Observable<Category> {
    return this.http.get<Category>(this.endpoint, id);
  }

  public insert(body: string): Observable<ICommandResult<Category>> {
    return this.http.post<ICommandResult<Category>>(this.endpoint, body);
  }

  public update(body: string): Observable<ICommandResult<Category>> {
    return this.http.put<ICommandResult<Category>>(this.endpoint, body);
  }

  public delete(id: string): Observable<ICommandResult<Category>> {
    return this.http.delete<ICommandResult<Category>>(this.endpoint, id);
  }
}
