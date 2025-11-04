import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service';

interface UserRegisterPayload {
  nome: string;
  email: string;
  senha: string;
  enderecos?: [
    {
      rua: string | null;
      numero: number | null;
      complemento: string | null;
      bairro: string | null;
      cidade: string | null;
      estado: string | null;
      cep: string | null;
    }
  ];
  telefones?: [
    {
      numero: string | null;
      ddd: string | null;
    }
  ];
}

export interface UserResponse {
  nome: string;
  email: string;
  enderecos:
    | [
        {
          rua: string | null;
          numero: number | null;
          complemento: string | null;
          bairro: string | null;
          cidade: string | null;
          estado: string | null;
          cep: string | null;
        }
      ]
    | null;
  telefones:
    | [
        {
          numero: string | null;
          ddd: string | null;
        }
      ]
    | null;
}

export interface UserLoginPayload {
  email: string;
  senha: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8083';
  private jwtHelper = new JwtHelperService();

  user = signal<UserResponse | null>(null);

  constructor(private http: HttpClient, private authService: AuthService) {
    const savedUser = this.authService.getUser();
    if (savedUser) {
      this.user.set(savedUser);
    }
  }

  register(body: UserRegisterPayload): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.apiUrl}/usuarios`, body);
  }

  login(body: UserLoginPayload): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/usuarios/login`, body, {
      responseType: 'text' as 'json',
    });
  }

  getUserByEmail(token: string): Observable<UserResponse> {
    const email = this.getEmailFromToken(token);

    if (!email) {
      throw new Error('Invalid token: unable to extract email.');
    }

    const headers = new HttpHeaders({ Authorization: `${token}` });
    return this.http.get<UserResponse>(`${this.apiUrl}/usuarios?email=${email}`, { headers });
  }

  getEmailFromToken(token: string): string | null {
    try {
      const decoded = this.jwtHelper.decodeToken(token);
      return decoded?.sub || null;
    } catch (e) {
      console.error('Error decoding token:', e);

      return null;
    }
  }

  getUser(): UserResponse | null {
    return this.user();
  }
}
