import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { News } from 'src/app/modules/shared/entities/news';
import { NewsHttpService } from 'src/app/modules/shared/services/news-http.service';
import { DialogNewsComponent } from '../../components/dialog-news/dialog-news.component';

@Component({
  selector: 'app-news-manager-page',
  templateUrl: './news-manager-page.component.html',
  styleUrls: ['./news-manager-page.component.css']
})
export class NewsManagerPageComponent implements OnInit {

  public displayedColumns: string[] = ['title', 'subTitle', 'author', 'publishDate', 'action'];
  public dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private toast: ToastrService,
              private dialog: MatDialog,
              private newsHttpService: NewsHttpService) { }

  public ngOnInit(): void {
    this.loadNews();
  }

  protected openDialog(): void {
    this.dialog.open(DialogNewsComponent).afterClosed().subscribe((val) => {
      if (val) {
        this.loadNews();
        this.toast.success('Notícia salva com sucesso!');
      }
    });
  }

  protected openEditDialog(news: News): void {
    this.dialog.open(DialogNewsComponent, {
      data: news
    }).afterClosed().subscribe((val) => {
      if (val) {
        this.loadNews();
        this.toast.success('Notícia atualizada com sucesso!');
      }
    });
  }

  protected applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private loadNews(): void {
    this.newsHttpService.getAll().subscribe({
      next: (news: Array<News>) => {
        this.dataSource = new MatTableDataSource(news);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.paginator._intl.itemsPerPageLabel = 'Notícias por página:';
      },
      error: () => {
        this.toast.error('Não foi possível carregar a lista de notícias!');
      }
    });
  }

  protected deleteNews(id: string): void {
    this.newsHttpService.delete(id).subscribe({
      next: () => {
        this.toast.success('Nóticia deletada com sucesso!');
        this.loadNews();
      },
      error: () => {
        this.toast.error('Não foi possível deletar a nóticia!');
      }
    });
  }
}
