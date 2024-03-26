import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NewsService} from "../../services/news.service";
import {IdService} from "../../services/id.service";
import { format } from 'date-fns';
import {UserService} from "../../services/user.service";
import {HttpClient} from "@angular/common/http";
import {SocketService} from "../../services/socket.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {
  userId: number = 0;
  newsList: any[] = [];
  userName: string = '';
  onlySpacesAndNewlines = /^\s+$/;

  constructor(private route: ActivatedRoute,private newsService: NewsService,
              private idService: IdService, private userService: UserService,
              private http: HttpClient, private socketService: SocketService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.idService.updateId(this.userId);
      this.socketService.joinRoom(this.userId);
      this.route.paramMap.subscribe(params => {
        this.loadNews();
      });
      this.userService.getUser(this.userId).subscribe(user => {
        this.userName = user.name
      });
      this.socketService.onNewsAdded().subscribe((newsData: any) => {
        this.newsList = newsData;
      });
      this.addNews();
    });
  }


  addNews(): void{
      this.newsService.news$.subscribe(news => {
        if(this.onlySpacesAndNewlines.test(news.text) || news.text === ''){
          return
        }
        else {
          this.newsList.push([{date: format(news.date, 'dd.MM.yyyy HH:mm:ss'), text: news.text}, this.userName]);
          this.sortNews();
          const putNews: any[] = [];
          for (news of this.newsList) {
            if (news[1] === this.userName) {
              putNews.push(news[0]);
            }
          }
          this.socketService.sendNews({news: putNews}, this.userId);
          this.http.put('https://localhost:3000/api/profile/' + `${this.userId}`, {news: putNews})
            .subscribe(() => {
              console.log('OK')
            });
        }
      });
  }

  loadNews() {
    this.newsService.getProfileNews(this.userId).subscribe(
      data => {
        this.newsList = data.newsList;
        console.log(this.newsList)
      },
      error => {
        console.error('Error fetching news:', error);
      }
    );
  }

  sortNews() {
    this.newsList.sort((a, b) => {
      const dateA = new Date(a[0].date.replace(/(\d{2}).(\d{2}).(\d{4})/, '$3-$2-$1'));
      const dateB = new Date(b[0].date.replace(/(\d{2}).(\d{2}).(\d{4})/, '$3-$2-$1'));
      return dateB.getTime() - dateA.getTime();
    });
  }
}
