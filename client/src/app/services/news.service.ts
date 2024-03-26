import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private baseUrl = 'https://localhost:3000';
  private newsSubject = new Subject<any>();

  news$ = this.newsSubject.asObservable();

  constructor(private http: HttpClient) { }

  getProfileNews(id: number): Observable<any> {
    const url = `${this.baseUrl}/api/profile/${id}/news`;
    return this.http.get(url);
  }

  addNews(news: any) {
    this.newsSubject.next(news);
  }
}
