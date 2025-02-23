import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IClient } from '../models/client.model';
import { Observable } from 'rxjs';
import { apiUrl } from './apiUrl';
import { IOrder } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private baseHeader;
  constructor(private http: HttpClient, private router: Router) {
    this.baseHeader = new HttpHeaders().set(
      'Authorization',
      `Bearer ${sessionStorage.getItem('token')}`
    );
  }

  public getClient(client: IClient): Observable<IClient> | Observable<object> {
    return this.http.get(`${apiUrl}/api/clients`, {
      params: { ...client },
      headers: this.baseHeader,
    });
  }

  public getClientsOrders(client: IClient): Observable<IOrder[]> {
    return this.http.get(`${apiUrl}/api/services/clientOrders`, {
      params: { ...client },
      headers: this.baseHeader,
    }) as Observable<IOrder[]>;
  }

  public changeStatus(client: IClient): Observable<IClient> {
    return this.http.patch(
      `${apiUrl}/api/client`,
      { id: client._id },
      {
        headers: this.baseHeader,
      }
    ) as Observable<IClient>;
  }
}
