import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Components
import { DialogNewsComponent } from './components/dialog-news/dialog-news.component';

//Pages
import { NewsPageComponent } from './pages/news-page/news-page.component';
import { ManagerPageComponent } from './pages/manager-page/manager-page.component';

//Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'

@NgModule({
  declarations: [
    NewsPageComponent,
    ManagerPageComponent,
    DialogNewsComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class NewsModule { }
