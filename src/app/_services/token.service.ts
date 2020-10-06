import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  static tokenKey: Token;
  constructor(private httpClient: HttpClient) { }


  public generateVerificationToken(user: User): Observable<Token>{
    return this.httpClient.post<Token>('http://localhost:8080/token', user);
  }

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
