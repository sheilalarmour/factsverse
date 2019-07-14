import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import {enableProdMode} from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss']
})
export class NewsPage implements OnInit {
  data: any;
  showLoader = true;
  constructor(private newsService: NewsService, private router: Router,private platform:Platform) {}

  ngOnInit() {
    this.newsService
      .getData()
      .subscribe(data => {
        console.log("Rakesh::"+data);
      this.data = data;
      this.showLoader = false;
      });
  }

  onGoToNewsSinglePage(article) {
    this.newsService.currentArticle = article;
    this.router.navigate(['/news-single']);
  }

}
