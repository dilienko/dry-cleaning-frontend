import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  public login(
    username: string,
    password: string
  ): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${apiUrl}/login`, { username, password })
      .pipe(
        tap((response) => {
          sessionStorage.setItem('token', response.token);
          this.router.navigate(['']);
        })
      );
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('token');
  }
}
