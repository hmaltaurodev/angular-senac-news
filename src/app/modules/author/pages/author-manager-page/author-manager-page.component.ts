import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Author } from 'src/app/modules/shared/entities/author';
import { DialogAuthorComponent } from '../../components/dialog-author/dialog-author.component';

@Component({
  selector: 'app-author-manager-page',
  templateUrl: './author-manager-page.component.html',
  styleUrls: ['./author-manager-page.component.css']
})
export class AuthorManagerPageComponent implements OnInit {

  public displayedColumns: string[] = ['name', 'email', 'action'];
  public dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private toast: ToastrService,
              private dialog: MatDialog) { }

  public ngOnInit(): void {
    this.loadAuthor();
  }

  protected openDialog(): void {
    this.dialog.open(DialogAuthorComponent).afterClosed().subscribe((val) => {
      if (val) {
        this.loadAuthor();
        this.toast.success('Autor salvo com sucesso!');
      }
    });
  }

  protected openEditDialog(index: number, author: Author): void {
    this.dialog.open(DialogAuthorComponent, {
      data: {
        author: author,
        index: index
      }
    }).afterClosed().subscribe((val) => {
      if (val) {
        this.loadAuthor();
        this.toast.success('Autor atualizado com sucesso!');
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

  private loadAuthor(): void {

  }

  protected deleteAuthor(index: number): void {

  }
}
