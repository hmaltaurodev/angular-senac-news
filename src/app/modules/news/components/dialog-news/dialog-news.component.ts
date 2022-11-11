import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dialog-news',
  templateUrl: './dialog-news.component.html',
  styleUrls: ['./dialog-news.component.css']
})
export class DialogNewsComponent implements OnInit {

  public newsForm!: FormGroup;
  public actionBtn: string = 'Salvar';

  constructor(private readonly adapter: DateAdapter<Date>,
              private formBuilder: FormBuilder,
              private api: ApiService,
              private dialogRef: MatDialogRef<DialogNewsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.adapter.setLocale("pt-br");
  }

  ngOnInit(): void {
    this.newsForm = this.formBuilder.group({
      title: ['', Validators.required],
      caption: ['', Validators.required],
      body: ['', Validators.required],
      author: ['', Validators.required],
      publishDate: ['', Validators.required]
    });

    if (this.data?.editNews) {
      this.actionBtn = 'Atualizar';
      this.newsForm.controls['title'].setValue(this.data.editNews.title);
      this.newsForm.controls['caption'].setValue(this.data.editNews.caption);
      this.newsForm.controls['body'].setValue(this.data.editNews.body);
      this.newsForm.controls['author'].setValue(this.data.editNews.author);
      this.newsForm.controls['publishDate'].setValue(this.data.editNews.publishDate);
    }
  }

  saveNews() {
    if (this.newsForm.valid) {
      if (this.data?.editNews) {
        this.updateNews();
      }
      else {
        this.addNews();
      }
    }
  }

  addNews() {
    this.api.postNews(this.newsForm.value).then(() => {
      this.dialogRef.close('save');
    });
  }

  updateNews() {
    this.api.putNews(this.data.index, this.newsForm.value).then(() => {
      this.dialogRef.close('save');
    });
  }
}
