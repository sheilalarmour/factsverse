import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-news-single',
  templateUrl: './news-single.page.html',
  styleUrls: ['./news-single.page.scss']
})
export class NewsSinglePage implements OnInit {
  article;
  constructor(private newsService: NewsService, private platform:Platform) {}

  ngOnInit() {
    this.article = this.newsService.currentArticle;
    console.log(this.newsService.currentArticle);
  }
}
