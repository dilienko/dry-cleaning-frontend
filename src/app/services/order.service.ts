import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { apiUrl } from './apiUrl';
import { Observable } from 'rxjs';
import { IOrder } from '../models/order.model';
import { status } from '../models/dryCleaning.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseHeader;

  constructor(private http: HttpClient, private router: Router) {
    this.baseHeader = new HttpHeaders().set(
      'Authorization',
      `Bearer ${sessionStorage.getItem('token')}`
    );
  }

  createNewOrder(orderDetail: object): Observable<IOrder[]> {
    return this.http.put(`${apiUrl}/api/services/new`, orderDetail, {
      headers: this.baseHeader,
    }) as Observable<IOrder[]>;
  }

  findOrders(branch: string): Observable<IOrder[]> {
    return this.http.get(`${apiUrl}/api/services/`, {
      headers: this.baseHeader,
      params: { branch },
    }) as Observable<IOrder[]>;
  }

  changeStatus(status: status, id: string): Observable<IOrder> {
    return this.http.patch(
      `${apiUrl}/api/services/status`,
      { status, id },
      {
        headers: this.baseHeader,
      }
    ) as Observable<IOrder>;
  }
}
