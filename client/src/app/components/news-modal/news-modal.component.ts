import {Component, OnInit} from '@angular/core';
import {NewsService} from "../../services/news.service";

@Component({
  selector: 'app-news-modal',
  templateUrl: './news-modal.component.html',
  styleUrl: './news-modal.component.css'
})
export class NewsModalComponent implements OnInit {
  newsText: string = '';

  constructor(private newsService: NewsService) { }

  ngOnInit() {
  }

  saveNews() {
    const currentDate = new Date();
    console.log(currentDate)
    this.newsService.addNews({ text: this.newsText, date: currentDate });
    this.newsText = '';
  }
}
