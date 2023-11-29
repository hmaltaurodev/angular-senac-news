import { NewsModule } from './modules/news/news.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CategoryModule } from './modules/category/category.module';
import { AuthorModule } from './modules/author/author.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NewsModule,
    HttpClientModule,
    CategoryModule,
    AuthorModule,
    ToastrModule.forRoot({
      autoDismiss: true,
      progressBar: true,
      tapToDismiss: true,
      closeButton: false
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
