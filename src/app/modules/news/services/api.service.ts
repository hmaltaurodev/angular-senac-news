import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  postNews(news: any) {
    let newsList: Array<any> = JSON.parse(localStorage.getItem('newsList') || '[]');
    newsList.push(news);
    localStorage.setItem('newsList', JSON.stringify(newsList));
  }

  getNews() {
    let newsList: Array<any> = JSON.parse(localStorage.getItem('newsList') || '[]');
    return newsList;
  }

  putNews(index: number, news: any) {
    let newsList: Array<any> = JSON.parse(localStorage.getItem('newsList') || '[]');
    newsList[index] = news;
    localStorage.setItem('newsList', JSON.stringify(newsList));
  }

  deleteNews(index: number) {
    let newsList: Array<any> = JSON.parse(localStorage.getItem('newsList') || '[]');
    newsList.splice(index, 1);
    localStorage.setItem('newsList', JSON.stringify(newsList));
  }
}
