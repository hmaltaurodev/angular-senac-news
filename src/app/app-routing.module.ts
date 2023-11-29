import { AuthorManagerPageComponent } from './modules/author/pages/author-manager-page/author-manager-page.component';
import { CategoryManagerPageComponent } from './modules/category/pages/category-manager-page/category-manager-page.component';
import { NewsManagerPageComponent } from './modules/news/pages/news-manager-page/news-manager-page.component';
import { NewsPageComponent } from './modules/news/pages/news-page/news-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'news', pathMatch: 'full' },
  { path: 'news', component: NewsPageComponent },
  { path: 'news/manager', component: NewsManagerPageComponent },
  { path: 'category/manager', component: CategoryManagerPageComponent },
  { path: 'author/manager', component: AuthorManagerPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
