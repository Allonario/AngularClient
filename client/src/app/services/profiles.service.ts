import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})

export class ProfilesService {
  private apiUrl = 'https://localhost:3000/api/profile_list';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this.http.get<{ [key: string]: IUser }>(this.apiUrl)
      .pipe(
        map(response => Object.values(response))
      );
  }
}
