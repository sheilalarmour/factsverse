import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { Router } from '@angular/router';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';
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
  constructor(private newsService: NewsService, private router: Router,private admobFree: AdMobFree,private platform:Platform) {}

  ngOnInit() {
    this.newsService
      .getData()
      .subscribe(data => {
        console.log("Rakesh::"+data);
      this.data = data;
      this.showLoader = false;
      });

      const bannerConfig: AdMobFreeBannerConfig = {
        id: 'ca-app-pub-5182313385642905/6483459867',
        size: 'BANNER',
        overlap:false,
        isTesting: false,
        autoShow: true
       };
       this.admobFree.banner.config(bannerConfig);
  
       this.admobFree.banner.prepare()
         .then(() => {
           // banner Ad is ready
           // if we set autoShow to false, then we will need to call the show method here
           console.log("Rakesh prepare1");
          this.admobFree.banner.show();
         })
         .catch(e => console.log(e));
  }

  onGoToNewsSinglePage(article) {
    this.newsService.currentArticle = article;
    this.router.navigate(['/news-single']);
  }

}
