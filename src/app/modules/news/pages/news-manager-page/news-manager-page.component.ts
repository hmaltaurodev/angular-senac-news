import { DialogNewsComponent } from '../../components/dialog-news/dialog-news.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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

  constructor(private dialog: MatDialog) { }

  public ngOnInit(): void {
    this.loadNews();
  }

  protected openDialog(): void {
    this.dialog.open(DialogNewsComponent).afterClosed().subscribe((val) => {
      if (val === 'save') {
        this.loadNews();
      }
    });
  }

  protected openEditDialog(index: number, news: any): void {
    this.dialog.open(DialogNewsComponent, {
      data: {
        news: news,
        index: index
      }
    }).afterClosed().subscribe((val) => {
      if (val === 'save') {
        this.loadNews();
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

  }

  protected deleteNews(index: number): void {

  }
}
