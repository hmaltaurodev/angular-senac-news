import { DialogNewsComponent } from './../../components/dialog-news/dialog-news.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.css']
})
export class ManagerPageComponent implements OnInit {
  public displayedColumns: string[] =
    ['title', 'caption', 'author', 'publishDate', 'action'];
  public dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog,
              private api: ApiService) { }

  ngOnInit(): void {
    this.loadNews();
  }

  openDialog() {
    this.dialog.open(DialogNewsComponent, {
      width: '50%'
    }).afterClosed().subscribe((val) => {
      if (val === 'save') {
        this.loadNews();
      }
    });
  }

  openEditDialog(index: number, news: any) {
    this.dialog.open(DialogNewsComponent, {
      width: '50%',
      data: {
        editNews: news,
        index: index
      }
    }).afterClosed().subscribe((val) => {
      if (val === 'save') {
        this.loadNews();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadNews() {
    this.api.getNews().then((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.paginator._intl.itemsPerPageLabel = 'Notícias por página:';
    });
  }

  deleteNews(index: number) {
    this.api.deleteNews(index).then(() => {
      this.loadNews();
    })
  }
}
