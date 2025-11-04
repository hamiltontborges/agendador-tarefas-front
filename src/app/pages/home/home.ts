import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-home',
  imports: [MatIconModule, MatDividerModule, MatButtonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  imgHero = 'assets/imagem-hero.svg';

  // constructor(private authService: AuthService, private router: Router) {}

  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/tasks']);
    }
  }
}
