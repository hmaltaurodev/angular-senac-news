import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../entities/category';
import { ICommandResult } from '../interfaces/i-command-result';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryHttpService {

  constructor(private http: HttpService) {
    http.endpoint = 'Category';
  }

  public getAll(): Observable<Array<Category>> {
    return this.http.getAll<Array<Category>>();
  }

  public get(id: string): Observable<Category> {
    return this.http.get<Category>(id);
  }

  public insert(body: string): Observable<ICommandResult<Category>> {
    return this.http.post<ICommandResult<Category>>(body);
  }

  public update(body: string): Observable<ICommandResult<Category>> {
    return this.http.put<ICommandResult<Category>>(body);
  }

  public delete(id: string): Observable<ICommandResult<Category>> {
    return this.http.delete<ICommandResult<Category>>(id);
  }
}
