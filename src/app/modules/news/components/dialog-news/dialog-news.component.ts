import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { News } from 'src/app/modules/shared/entities/news';
import { ICommandResult } from 'src/app/modules/shared/interfaces/i-command-result';
import { IEditNews } from 'src/app/modules/shared/interfaces/i-edit-news';
import { NewsHttpService } from 'src/app/modules/shared/services/news-http.service';

@Component({
  selector: 'app-dialog-news',
  templateUrl: './dialog-news.component.html',
  styleUrls: ['./dialog-news.component.css']
})
export class DialogNewsComponent implements OnInit {

  protected newsForm: FormGroup = new FormBuilder().group({
    title: ['', Validators.required],
    subTitle: ['', Validators.required],
    imageUrl: ['', Validators.required],
    body: ['', Validators.required]
  });

  protected actionBtn: string = 'Salvar';

  constructor(private toast: ToastrService,
              private newsHttpService: NewsHttpService,
              private dialogRef: MatDialogRef<DialogNewsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IEditNews) { }

  public ngOnInit(): void {
    if (this.data?.news) {
      this.actionBtn = 'Atualizar';
      this.newsForm.controls['title'].setValue(this.data.news.title);
      this.newsForm.controls['subTitle'].setValue(this.data.news.subTitle);
      this.newsForm.controls['imageUrl'].setValue(this.data.news.imageUrl);
      this.newsForm.controls['body'].setValue(this.data.news.body);
    }
  }

  protected saveNews(): void {
    if (this.newsForm.valid) {
      return;
    }

    if (this.data?.news) {
      const json: string = JSON.stringify({
        id: this.data.news.id,
        title: this.newsForm.controls['title'].value,
        subTitle: this.newsForm.controls['subTitle'].value,
        imageUrl: this.newsForm.controls['imageUrl'].value,
        body: this.newsForm.controls['body'].value,
        categoryId: '102ae4a9-9ab5-4788-79bb-08dbefa7a4c4',
        authorId: 'd33c948b-4b3d-4aee-9db0-08dbefa6be5d'
      });

      this.newsHttpService.update(json).subscribe({
        next: (command: ICommandResult<News>) => {
          this.dialogRef.close('save');
        },
        error: (error: any) => {
          this.toast.error('Não foi possível atualizar a notícia. Por favor tente novamente ou entre em contato com um administrador!');
        }
      });
    }
    else {
      const json: string = JSON.stringify({
        title: this.newsForm.controls['title'].value,
        subTitle: this.newsForm.controls['subTitle'].value,
        imageUrl: this.newsForm.controls['imageUrl'].value,
        body: this.newsForm.controls['body'].value,
        categoryId: '102ae4a9-9ab5-4788-79bb-08dbefa7a4c4',
        authorId: 'd33c948b-4b3d-4aee-9db0-08dbefa6be5d'
      });

      this.newsHttpService.insert(json).subscribe({
        next: (command: ICommandResult<News>) => {
          this.dialogRef.close('save');
        },
        error: (error: any) => {
          this.toast.error('Não foi possível salvar a notícia. Por favor tente novamente ou entre em contato com um administrador!');
        }
      });
    }
  }
}
