import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IClient } from '../models/client.model';
import { Observable } from 'rxjs';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient, private router: Router) {}

  public getClient(client: IClient): Observable<IClient> | Observable<object> {
    const baseHeader = new HttpHeaders().set(
      'Authorization',
      `Bearer ${sessionStorage.getItem('token')}`
    );
    return this.http.get(`${apiUrl}/api/clients`, {
      params: { ...client },
      headers: baseHeader,
    });
  }
}
