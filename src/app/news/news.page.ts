import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { Router } from '@angular/router';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';
//import { AdMobPro, AdMobProBannerConfig} from '@ionic-native/admob-pro/ngx';
//import { AdMobOriginal } from "@ionic-native/admob-plus";
import { Platform, NavController } from '@ionic/angular';
import {enableProdMode} from '@angular/core';


@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss']
})
export class NewsPage implements OnInit {
  data: any;
  showLoader = true;
  constructor(private newsService: NewsService, private router: Router,private admobFree: AdMobFree,private platform:Platform, public navCtrl: NavController) {}

  ngOnInit() {
    // this.newsService
    //   .getData()
    //   .subscribe(data => {
    //     console.log("Rakesh::"+data);
    //   this.data = data;
    //   this.showLoader = false;
    //   });
    this.fetchData();
      const bannerConfig: AdMobFreeBannerConfig = {
        id: 'ca-app-pub-3940256099942544/6300978111',
        size: 'BANNER',
        overlap:false,
        isTesting: true,
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

      // this.admob.banner.show({
      //   id: {
      //     // replace with your ad unit IDs
      //     android: 'ca-app-pub-5182313385642905/6483459867',
      //     ios: 'test'
      //   }
      // });
  }

  onGoToNewsSinglePage(article) {
    this.newsService.currentArticle = article;
    this.router.navigate(['/news-single']);
  }

  onRefresh(){
    console.log("Rakesh refresh clicked");
    this.showLoader = true;
    this.fetchData();
  }

  fetchData(){
    this.newsService
    .getData()
    .subscribe(data => {
      console.log("Rakesh::"+data);
    this.data = data;
    this.showLoader = false;
    });
  }

}
