import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../core/model/page/pageable';
import { Author } from './model/author';
import { AuthorPage } from './model/author-page';
import { HttpClient } from '@angular/common/http';
import { AUTHOR_DATA_LIST } from './model/mock-authors-list';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private apiURL: string = "http://localhost:8080/author";

  constructor(
    private http: HttpClient
  ) { }

  getAuthors(pageable: Pageable): Observable<AuthorPage> {
    return this.http.post<AuthorPage>(this.apiURL, { pageable: pageable });
  }

  saveAuthor(author: Author): Observable<void> {
    if (author.id != null) this.apiURL += '/' + author.id;

    return this.http.put<void>(this.apiURL, author);
  }

  deleteAuthor(idAuthor: number): Observable<void> {
    return this.http.delete<void>(this.apiURL + '/' + idAuthor);
  }

  getAllAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.apiURL);
  }
}
