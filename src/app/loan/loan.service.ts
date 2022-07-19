import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Loan } from './model/loan';
import { Observable } from 'rxjs';
import { Pageable } from '../core/model/page/pageable';
import { LoanPage } from './model/loan-page';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private apiUrl = "http://localhost:8080/loan";

  constructor(
    private http: HttpClient
  ) { }

  getLoans(gameId?: number, clientId?: number, date?: Date, pageable?: Pageable): Observable<LoanPage> {
    return this.http.post<LoanPage>(this.composeFindUrl(gameId, clientId, date), {pageable: pageable});
  }

  saveLoan(loan: Loan): Observable<void> {
    return this.http.put<void>(this.apiUrl, loan);
  }

  deleteLoan(idLoan: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/' + idLoan);
  }

  private composeFindUrl(gameId?: number, clientId?: number, date?: Date): string {
    let params = '';

    if (gameId != null) {
      params += 'game=' + gameId;
    }

    if (clientId != null) {
      if (params != '') params += "&";
      params += "client=" + clientId;
    }

    if (date != null) {
      if (params != '') params += "&";
      params += "date=" + date;
    }

    if (params == '') return this.apiUrl;
    else return this.apiUrl + '?' + params;
  }
}
