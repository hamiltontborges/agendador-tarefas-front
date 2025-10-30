import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterState {
  private actualRouteSubject$ = new BehaviorSubject<string>('');
  public readonly actualRoute$ = this.actualRouteSubject$.asObservable();

  constructor(private router: Router) {
    this.actualRouteSubject$.next(this.router.url);
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.actualRouteSubject$.next(event.url);
    });
  }
}
