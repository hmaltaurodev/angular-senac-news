import { NewsManagerPageComponent } from './modules/news/pages/news-manager-page/news-manager-page.component';
import { NewsPageComponent } from './modules/news/pages/news-page/news-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'news', pathMatch: 'full' },
  { path: 'news', component: NewsPageComponent },
  { path: 'manager', component: NewsManagerPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
