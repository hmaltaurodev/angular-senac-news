import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-dialog-news',
  templateUrl: './dialog-news.component.html',
  styleUrls: ['./dialog-news.component.css']
})
export class DialogNewsComponent implements OnInit {

  constructor(private readonly adapter: DateAdapter<Date>) {
    this.adapter.setLocale("pt-br");
  }

  ngOnInit(): void { }
}
