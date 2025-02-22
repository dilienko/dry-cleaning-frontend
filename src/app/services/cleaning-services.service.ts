import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { apiUrl } from './apiUrl';
import { Observable } from 'rxjs';
import { IServiceType } from '../models/serviceType.model';

@Injectable({
  providedIn: 'root',
})
export class CleaningServicesService {
  private baseHeader;

  constructor(private http: HttpClient, private router: Router) {
    this.baseHeader = new HttpHeaders().set(
      'Authorization',
      `Bearer ${sessionStorage.getItem('token')}`
    );
  }

  getAllServices(): Observable<IServiceType[]> {
    return this.http.get<IServiceType[]>(`${apiUrl}/api/service-types`, {
      headers: this.baseHeader,
    });
  }
}
