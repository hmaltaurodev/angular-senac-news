import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit {

  public newsList: any[] = [];

  constructor() { }

  public ngOnInit(): void {
    this.loadNews();
  }

  private loadNews(): void {

  }
}
