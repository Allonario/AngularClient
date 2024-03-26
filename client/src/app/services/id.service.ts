import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdService {
  private idSubject = new BehaviorSubject<number>(0);
  currentId = this.idSubject.asObservable();

  updateId(newId: number): void {
    this.idSubject.next(newId);
  }
}
