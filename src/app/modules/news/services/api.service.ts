import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  async postNews(news: any) {
    let newsList: Array<any> = JSON.parse(localStorage.getItem('newsList') || '[]');
    newsList.push(news);
    localStorage.setItem('newsList', JSON.stringify(newsList));
  }

  async getNews() {
    let newsList: Array<any> = JSON.parse(localStorage.getItem('newsList') || '[]');
    return newsList;
  }

  async putNews(index: number, news: any) {
    let newsList: Array<any> = JSON.parse(localStorage.getItem('newsList') || '[]');
    newsList[index] = news;
    localStorage.setItem('newsList', JSON.stringify(newsList));
  }

  async deleteNews(index: number) {
    let newsList: Array<any> = JSON.parse(localStorage.getItem('newsList') || '[]');
    newsList.splice(index, 1);
    localStorage.setItem('newsList', JSON.stringify(newsList));
  }
}
