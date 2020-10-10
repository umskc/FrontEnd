import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AdminUser, JWT} from './token.service';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) {
  }

  login(adminUser: AdminUser): Observable<JWT> {
    return this.http.post<JWT>('http://localhost:8080/login', adminUser, httpOptions);
  }

}
