import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Author } from 'src/app/modules/shared/entities/author';
import { ICommandResult } from 'src/app/modules/shared/interfaces/i-command-result';
import { IEditAuthor } from 'src/app/modules/shared/interfaces/i-edit-author';
import { AuthorHttpService } from 'src/app/modules/shared/services/author-http.service';

@Component({
  selector: 'app-dialog-author',
  templateUrl: './dialog-author.component.html',
  styleUrls: ['./dialog-author.component.css']
})
export class DialogAuthorComponent implements OnInit {

  protected authorForm: FormGroup = new FormBuilder().group({
    name: ['', Validators.required],
    email: ['', Validators.required]
  });

  protected actionBtn: string = 'Salvar';

  constructor(private toast: ToastrService,
              private authorHttpService: AuthorHttpService,
              private dialogRef: MatDialogRef<DialogAuthorComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IEditAuthor) { }

  public ngOnInit(): void {
    if (this.data?.author) {
      this.actionBtn = 'Atualizar';
      this.authorForm.controls['name'].setValue(this.data.author.name);
      this.authorForm.controls['email'].setValue(this.data.author.email);
    }
  }

  protected saveAuthor(): void {
    if (this.authorForm.valid) {
      return;
    }

    if (this.data?.author) {
      const json: string = JSON.stringify({
        id: this.data.author.id,
        name: this.authorForm.controls['name'].value,
        email: this.authorForm.controls['email'].value
      });

      this.authorHttpService.update(json).subscribe({
        next: (command: ICommandResult<Author>) => {
          this.dialogRef.close('save');
        },
        error: (error: any) => {
          this.toast.error('Não foi possível atualizar o autor. Por favor tente novamente ou entre em contato com um administrador!');
        }
      });
    }
    else {
      const json: string = JSON.stringify({
        name: this.authorForm.controls['name'].value,
        email: this.authorForm.controls['email'].value
      });

      this.authorHttpService.insert(json).subscribe({
        next: (command: ICommandResult<Author>) => {
          this.dialogRef.close('save');
        },
        error: (error: any) => {
          this.toast.error('Não foi possível salvar o autor. Por favor tente novamente ou entre em contato com um administrador!');
        }
      });
    }
  }
}
