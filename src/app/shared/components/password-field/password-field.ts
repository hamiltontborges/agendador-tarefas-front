import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'input-password-field',
  imports: [MatInputModule, MatIconModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './password-field.html',
  styleUrl: './password-field.scss',
})
export class PasswordField {
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
