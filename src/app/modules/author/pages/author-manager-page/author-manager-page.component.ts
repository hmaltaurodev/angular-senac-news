import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Author } from 'src/app/modules/shared/entities/author';
import { DialogAuthorComponent } from '../../components/dialog-author/dialog-author.component';
import { AuthorHttpService } from 'src/app/modules/shared/services/author-http.service';

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
              private dialog: MatDialog,
              private authorHttpService: AuthorHttpService) { }

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

  protected openEditDialog(author: Author): void {
    this.dialog.open(DialogAuthorComponent, {
      data: author
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
    this.authorHttpService.getAll().subscribe({
      next: (authors: Array<Author>) => {
        this.dataSource = new MatTableDataSource(authors);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.paginator._intl.itemsPerPageLabel = 'Autores por página';
      },
      error: () => {
        this.toast.error('Não foi possível carregar a lista de autores!');
      }
    });
  }

  protected deleteAuthor(id: string): void {
    this.authorHttpService.delete(id).subscribe({
      next: () => {
        this.toast.success('Autor deletado com sucesso!');
        this.loadAuthor();
      },
      error: () => {
        this.toast.error('Não foi possível deletar o autor!');
      }
    });
  }
}
