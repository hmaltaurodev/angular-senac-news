import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/modules/shared/entities/category';
import { ICommandResult } from 'src/app/modules/shared/interfaces/i-command-result';
import { IEditCategory } from 'src/app/modules/shared/interfaces/i-edit-category';
import { CategoryHttpService } from 'src/app/modules/shared/services/category-http.service';

@Component({
  selector: 'app-dialog-category',
  templateUrl: './dialog-category.component.html',
  styleUrls: ['./dialog-category.component.css']
})
export class DialogCategoryComponent implements OnInit {

  protected categoryForm: FormGroup = new FormBuilder().group({
    name: ['', Validators.required]
  });

  protected actionBtn: string = 'Salvar';

  constructor(private toast: ToastrService,
              private categoryHttpService: CategoryHttpService,
              private dialogRef: MatDialogRef<DialogCategoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IEditCategory) { }

  public ngOnInit(): void {
    if (this.data?.category) {
      this.actionBtn = 'Atualizar';
      this.categoryForm.controls['name'].setValue(this.data.category.name);
    }
  }

  protected saveCategory(): void {
    if (this.categoryForm.valid) {
      return;
    }

    if (this.data?.category) {
      const json: string = JSON.stringify({
        id: this.data.category.id,
        name: this.categoryForm.controls['name'].value
      });

      this.categoryHttpService.update(json).subscribe({
        next: (command: ICommandResult<Category>) => {
          this.toast.success('Categoria atualizada com sucesso!');
          this.dialogRef.close('save');
        },
        error: (error: any) => {
          this.toast.error('Não foi possível atualizar a categoria. Por favor tente novamente ou entre em contato com um administrador!');
        }
      });
    }
    else {
      const json: string = JSON.stringify({
        name: this.categoryForm.controls['name'].value
      });

      this.categoryHttpService.insert(json).subscribe({
        next: (command: ICommandResult<Category>) => {
          this.toast.success('Categoria salva com sucesso!');
          this.dialogRef.close('save');
        },
        error: (error: any) => {
          this.toast.error('Não foi possível salvar a categoria. Por favor tente novamente ou entre em contato com um administrador!');
        }
      });
    }
  }
}
