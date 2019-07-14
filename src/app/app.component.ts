import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Platform, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})



export class AppComponent {

  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.platform.backButton.subscribe(() => {
        if (this.routerOutlet && this.routerOutlet.canGoBack()) {
          this.routerOutlet.pop();
        } else if (this.router.url === '/tabs/(news:news)') {
          // or if that doesn't work, try
          navigator['app'].exitApp();
        } else {
          
        }
      });

    });
  }
}
