import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Registration} from "../models/registration.model";

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private apiUrl = 'https://localhost:3000/api/registration';

  constructor(private http: HttpClient) {}

  registerUser(registrationData: Registration): Observable<any> {
    return this.http.put(this.apiUrl, registrationData);
  }
}
