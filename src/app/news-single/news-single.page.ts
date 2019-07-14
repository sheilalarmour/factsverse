import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { Platform } from '@ionic/angular';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';
@Component({
  selector: 'app-news-single',
  templateUrl: './news-single.page.html',
  styleUrls: ['./news-single.page.scss']
})
export class NewsSinglePage implements OnInit {
  article;
  constructor(private newsService: NewsService, private admobFree: AdMobFree,private platform:Platform) {}

  ngOnInit() {
    this.article = this.newsService.currentArticle;
    console.log(this.newsService.currentArticle);

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
         console.log("Rakesh prepare");
        this.admobFree.banner.show();
       })
       .catch(e => console.log(e));
  }
}
