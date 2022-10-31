import { ManagerPageComponent } from './modules/news/pages/manager-page/manager-page.component';
import { NewsPageComponent } from './modules/news/pages/news-page/news-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'news', pathMatch: 'full' },
  { path: 'news', component: NewsPageComponent },
  { path: 'manager', component: ManagerPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
