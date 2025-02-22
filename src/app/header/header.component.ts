import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { NgFor, NgIf } from '@angular/common';

interface NavLink {
  text: string;
  path: string[];
}

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatButton,
    NgIf,
    NgFor,
    MatMenuModule,
    MatIconModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public links: NavLink[] = [
    { text: 'Нове замовлення', path: ['/new-order'] },
    { text: 'Статус замовлень', path: ['/status'] },
    { text: 'Повернення замовлення', path: ['/returnOrder'] },
    { text: 'Статистика', path: ['/stats'] },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
  }

  redirectTo(link: string[]): void {
    this.router.navigate(link);
  }
}
