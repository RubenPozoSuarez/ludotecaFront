import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Game } from './model/game';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl = "http://localhost:8080/game";

  constructor(
    private http: HttpClient
  ) { }

  getGames(title?: String, categoryId?: number): Observable<Game[]> {
    return this.http.get<Game[]>(this.composeFindUrl(title, categoryId));
  }

  saveGame(game: Game): Observable<void> {
    this.apiUrl = "http://localhost:8080/game";

    if (game.id != null) {
      this.apiUrl += '/' + game.id;
    }

    return this.http.put<void>(this.apiUrl, game);
  }

  private composeFindUrl(title?: String, categoryId?: number): string {
    let params = '';

    if (title != null) {
      params += 'title=' + title;
    }

    if (categoryId != null) {
      if (params != '') params += "&";
      params += "idCategory=" + categoryId;
    }

    if (params == '') return this.apiUrl;
    else return this.apiUrl + '?' + params;
  }

}
