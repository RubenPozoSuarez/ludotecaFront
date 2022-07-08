import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from './model/category';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiURL: string = "http://localhost:8080/category";

  constructor( private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiURL);
  }
  
  saveCategory(category: Category): Observable<Category> {
        if (category.id != null) this.apiURL += '/'+category.id;

        return this.http.put<Category>(this.apiURL, category);
  }

  deleteCategory(idCategory : number): Observable<any> {
    return this.http.delete(this.apiURL + '/' + idCategory);
  }  
}
