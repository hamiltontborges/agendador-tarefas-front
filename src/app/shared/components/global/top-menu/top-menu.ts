import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { RouterState } from '../../../../core/router/router-state';
import { AuthService } from '../../../../services/auth-service';
import { UserService } from '../../../../services/user-service';

@Component({
  selector: 'app-top-menu',
  imports: [MatToolbarModule, MatButtonModule, MatMenuModule, MatIconModule, RouterLink],
  templateUrl: './top-menu.html',
  styleUrl: './top-menu.scss',
})
export class TopMenu implements OnInit, OnDestroy {
  appLogo: string = 'assets/logo-agendador-javanauta.png';
  actualRoute: string = '';
  subscriptionRoute!: Subscription;

  private routerService = inject(RouterState);
  private authService = inject(AuthService);
  private router = inject(Router);
  private userService = inject(UserService);

  ngOnInit(): void {
    this.subscriptionRoute = this.routerService.actualRoute$.subscribe((route) => {
      this.actualRoute = route;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionRoute.unsubscribe();
  }

  isOnRouteRegister(): boolean {
    return this.actualRoute === '/register';
  }

  isOnRouteLogin(): boolean {
    return this.actualRoute === '/login';
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get userInitials(): string {
    const user = this.userService.getUser();
    if (user && user.nome) {
      return user.nome.charAt(0).toUpperCase();
    }
    return '';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
