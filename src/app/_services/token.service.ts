import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  static tokenKey: Token;
  constructor(private httpClient: HttpClient) { }


  public generateVerificationToken(user: User): Observable<Token>{
    return this.httpClient.post<Token>('http://localhost:8080/token', user);
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

}

export interface JWT{
  token: string;
}

export interface Token {
  value: string;
}

export interface User {
  name: string;
  surname: string;
  street?: string;
  homeNumber?: string;
  localNumber?: string;
}

export interface AdminUser {
  username: string;
  password: string;
}
