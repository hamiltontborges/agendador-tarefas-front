import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserResponse, UserService } from '../../services/user-service';

@Component({
  selector: 'app-user-data',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-data.html',
  styleUrl: './user-data.scss',
})
export class UserData {
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);

  user: UserResponse | null = this.userService.getUser();

  form: FormGroup = this.formBuilder.group({
    nome: [{ value: this.user?.nome || '', disabled: true }],
    email: [{ value: this.user?.email || '', disabled: true }],
  });
}
