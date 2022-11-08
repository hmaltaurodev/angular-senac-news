import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dialog-news',
  templateUrl: './dialog-news.component.html',
  styleUrls: ['./dialog-news.component.css']
})
export class DialogNewsComponent implements OnInit {

  public newsForm!: FormGroup;

  constructor(private readonly adapter: DateAdapter<Date>,
              private formBuilder: FormBuilder,
              private api: ApiService,
              private dialogRef: MatDialogRef<DialogNewsComponent>) {
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
  }

  saveNews() {
    if (this.newsForm.valid) {
      this.api.postNews(this.newsForm.value).then(() => {
        this.dialogRef.close('save');
      });
    }
  }
}
