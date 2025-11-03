import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

interface UserRegisterResponse {
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

  constructor(private http: HttpClient) {}

  register(body: UserRegisterPayload): Observable<UserRegisterResponse> {
    return this.http.post<UserRegisterResponse>(`${this.apiUrl}/usuarios`, body);
  }

  login(body: UserLoginPayload): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/usuarios/login`, body, {
      responseType: 'text' as 'json'
    });
  }

}
