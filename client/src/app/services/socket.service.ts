import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SocketService {
    private socket: any;

    constructor() {
        this.socket = io('https://localhost:3000');
    }

    sendNews(newsData: any, userId: number): void {
        this.socket.emit('addNews', newsData, userId);
    }

    onNewsAdded(): Observable<any> {
        return new Observable((observer) => {
            this.socket.on('newsAdded', (data: any) => {
                observer.next(data);
            });
        });
    }

    joinRoom(userId: number): void {
      console.log(userId);
        this.socket.emit('join', userId);
    }
}
