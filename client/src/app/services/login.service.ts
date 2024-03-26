import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'https://localhost:3000/api/login';

  constructor(private http: HttpClient) {}

  loginUser(loginData: Login): Observable<any> {
    return this.http.post(this.apiUrl, loginData);
  }
}
