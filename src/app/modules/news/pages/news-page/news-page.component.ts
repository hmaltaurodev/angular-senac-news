import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit {

  public newsList: any[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews() {
    this.api.getNews().then((res) => {
      this.newsList = res;
      console.log(this.newsList);
    });
  }
}
