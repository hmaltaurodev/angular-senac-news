import { DialogNewsComponent } from './../../components/dialog-news/dialog-news.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.css']
})
export class ManagerPageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }

  openDialog() {
    this.dialog.open(DialogNewsComponent, {
      width: '50%'
    });
  }
}
