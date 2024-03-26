import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUser} from "../models/user.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private getApiUrl: string = 'https://localhost:3000/api/profile/';

  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<IUser> {
    return this.http.get<IUser>((this.getApiUrl + id))
  }
}
