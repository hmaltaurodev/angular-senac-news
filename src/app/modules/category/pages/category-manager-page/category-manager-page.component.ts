import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/modules/shared/entities/category';
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
              private dialog: MatDialog) { }

  public ngOnInit(): void {
    this.loadCategory();
  }

  protected openDialog(): void {
    this.dialog.open(DialogCategoryComponent).afterClosed().subscribe((val) => {
      if (val === 'save') {
        this.loadCategory();
        this.toast.success('Categoria salva com sucesso!');
      }
    });
  }

  protected openEditDialog(index: number, category: Category): void {
    this.dialog.open(DialogCategoryComponent, {
      data: {
        category: category,
        index: index
      }
    }).afterClosed().subscribe((val) => {
      if (val === 'save') {
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

  }

  protected deleteCategory(index: number): void {

  }
}
