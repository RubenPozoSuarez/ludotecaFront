import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from './model/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiURL: string = "http://localhost:8080/client";

  constructor( private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiURL);
  }
  
  saveClient(client : Client): Observable<Client> {
        if (client.id != null) this.apiURL += '/'+ client.id;

        return this.http.put<Client>(this.apiURL, client);
  }

  deleteClient(idClient : number): Observable<any> {
    return this.http.delete(this.apiURL + '/' + idClient);
  }  
}
