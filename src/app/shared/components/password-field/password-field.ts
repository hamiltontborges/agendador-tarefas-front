import { Component, Input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'input-password-field',
  imports: [MatInputModule, MatIconModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './password-field.html',
  styleUrl: './password-field.scss',
})
export class PasswordField {
  hide = signal(true);

  @Input({ required: true }) control!: FormControl;

  get passwordError(): string | null {
    const passwordControl = this.control;
    if (passwordControl?.hasError('required')) return 'A senha é obrigatória.';
    if (passwordControl?.hasError('minlength'))
      return 'A senha deve ter pelo menos 6 caracteres.';
    return null;
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
