import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'top-menu',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './top-menu.html',
  styleUrl: './top-menu.scss',
})
export class TopMenu implements OnInit, OnDestroy {
  appLogo: string = 'assets/logo-agendador-javanauta.png';
  actualRoute: string = '';
  subscriptionRoute!: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.actualRoute = this.router.url;
    this.subscriptionRoute = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.actualRoute = event.url;
      });
  }

  ngOnDestroy(): void {
    this.subscriptionRoute.unsubscribe();
  }

  isOnRouteRegister(): boolean {
    return this.actualRoute === '/register';
  }
}
