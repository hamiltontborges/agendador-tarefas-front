import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { RouterState } from '../../../../core/router/router-state';

@Component({
  selector: 'app-top-menu',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './top-menu.html',
  styleUrl: './top-menu.scss',
})
export class TopMenu implements OnInit, OnDestroy {
  appLogo: string = 'assets/logo-agendador-javanauta.png';
  actualRoute: string = '';
  subscriptionRoute!: Subscription;

  private routerService = inject(RouterState);

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
}
