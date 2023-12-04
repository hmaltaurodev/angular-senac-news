import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/modules/shared/entities/category';
import { CategoryHttpService } from 'src/app/modules/shared/services/category-http.service';
import { DialogCategoryComponent } from '../../components/dialog-category/dialog-category.component';

@Component({
  selector: 'app-category-manager-page',
  templateUrl: './category-manager-page.component.html',
  styleUrls: ['./category-manager-page.component.css']
})
export class CategoryManagerPageComponent implements OnInit {

  public displayedColumns: string[] = ['name', 'action'];
  public dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private toast: ToastrService,
              private dialog: MatDialog,
              private categoryHttpService: CategoryHttpService) { }

  public ngOnInit(): void {
    this.loadCategory();
  }

  protected openDialog(): void {
    this.dialog.open(DialogCategoryComponent).afterClosed().subscribe((val) => {
      if (val) {
        this.loadCategory();
        this.toast.success('Categoria salva com sucesso!');
      }
    });
  }

  protected openEditDialog(category: Category): void {
    this.dialog.open(DialogCategoryComponent, {
      data: category
    }).afterClosed().subscribe((val) => {
      if (val) {
        this.loadCategory();
        this.toast.success('Categoria atualizada com sucesso!');
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

  private loadCategory(): void {
    this.categoryHttpService.getAll().subscribe({
      next: (categories: Array<Category>) => {
        this.dataSource = new MatTableDataSource(categories);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.paginator._intl.itemsPerPageLabel = 'Categorias por página';
      },
      error: () => {
        this.toast.error('Não foi possível carregar a lista de categorias!');
      }
    });
  }

  protected deleteCategory(id: string): void {
    this.categoryHttpService.delete(id).subscribe({
      next: () => {
        this.toast.success('Categoria deletada com sucesso!');
        this.loadCategory();
      },
      error: () => {
        this.toast.error('Não foi possível deletar a categoria!');
      }
    });
  }
}
