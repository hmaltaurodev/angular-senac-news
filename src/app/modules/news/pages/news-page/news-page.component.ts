import { NewsHttpService } from 'src/app/modules/shared/services/news-http.service';
import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/modules/shared/entities/news';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit {

  public newsList: News[] = [];

  constructor(private toast: ToastrService,
              private newsHttpService: NewsHttpService) { }

  public ngOnInit(): void {
    this.loadNews();
  }

  private loadNews(): void {
    this.newsHttpService.getAll().subscribe({
      next: (news: Array<News>) => {
        this.newsList = news;
      },
      error: () => {
        this.toast.error('Não foi possível carregar a lista de notícias!');
      }
    });
  }
}
