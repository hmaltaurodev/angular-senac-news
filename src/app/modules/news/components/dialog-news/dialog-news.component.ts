import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { Author } from 'src/app/modules/shared/entities/author';
import { Category } from 'src/app/modules/shared/entities/category';
import { News } from 'src/app/modules/shared/entities/news';
import { ICommandResult } from 'src/app/modules/shared/interfaces/i-command-result';
import { AuthorHttpService } from 'src/app/modules/shared/services/author-http.service';
import { CategoryHttpService } from 'src/app/modules/shared/services/category-http.service';
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
    body: ['', Validators.required],
    categoryId: ['', Validators.required],
    authorId: ['', Validators.required]
  });

  protected actionBtn: string = 'Salvar';
  protected authors: Array<Author> = [];
  protected categories: Array<Category> = [];

  constructor(private toast: ToastrService,
              private newsHttpService: NewsHttpService,
              private categoryHttpService: CategoryHttpService,
              private authorHttpService: AuthorHttpService,
              private dialogRef: MatDialogRef<DialogNewsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: News) { }

  public ngOnInit(): void {

    const authorPromise = new Promise((resolve) => {
      this.authorHttpService.getAll().pipe(
        finalize(() => resolve(true))
      ).subscribe({
        next: (authors: Array<Author>) => {
          this.authors = authors;
        },
        error: () => {
          this.toast.error('Não foi possível carregar a lista de autores!');
        }
      });
    });

    const categoryPromise = new Promise((resolve) => {
      this.categoryHttpService.getAll().pipe(
        finalize(() => resolve(true))
      ).subscribe({
        next: (categories: Array<Category>) => {
          this.categories = categories;
        },
        error: () => {
          this.toast.error('Não foi possível carregar a lista de categorias');
        }
      })
    });

    Promise.all([authorPromise, categoryPromise]).then(() => {
      if (this.data) {
        this.actionBtn = 'Atualizar';
        this.newsForm.controls['title'].setValue(this.data.title);
        this.newsForm.controls['subTitle'].setValue(this.data.subTitle);
        this.newsForm.controls['imageUrl'].setValue(this.data.imageUrl);
        this.newsForm.controls['body'].setValue(this.data.body);
      }
    });
  }

  protected saveNews(): void {
    if (!this.newsForm.valid) {
      return;
    }

    if (this.data) {
      const json: string = JSON.stringify({
        id: this.data.id,
        title: this.newsForm.controls['title'].value,
        subTitle: this.newsForm.controls['subTitle'].value,
        imageUrl: this.newsForm.controls['imageUrl'].value,
        body: this.newsForm.controls['body'].value,
        categoryId: this.newsForm.controls['categoryId'].value,
        authorId: this.newsForm.controls['authorId'].value
      });

      this.newsHttpService.update(json).subscribe({
        next: (command: ICommandResult<News>) => {
          this.dialogRef.close('save');
        },
        error: (error: any) => {
          this.toast.error('Não foi possível atualizar a notícia!');
        }
      });
    }
    else {
      const json: string = JSON.stringify({
        title: this.newsForm.controls['title'].value,
        subTitle: this.newsForm.controls['subTitle'].value,
        imageUrl: this.newsForm.controls['imageUrl'].value,
        body: this.newsForm.controls['body'].value,
        categoryId: this.newsForm.controls['categoryId'].value,
        authorId: this.newsForm.controls['authorId'].value
      });

      this.newsHttpService.insert(json).subscribe({
        next: (command: ICommandResult<News>) => {
          this.dialogRef.close('save');
        },
        error: (error: any) => {
          this.toast.error('Não foi possível salvar a notícia!');
        }
      });
    }
  }
}
