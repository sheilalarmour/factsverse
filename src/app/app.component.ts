import { Component } from '@angular/core';
//import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { ViewChild } from '@angular/core';
import { Platform, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router';
import { OneSignal } from '@ionic-native/onesignal/ngx';
//import { FirebaseMessaging } from '@ionic-native/firebase-messaging/ngx';
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
    private router: Router,
    private oneSignal: OneSignal
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //this.pushSetup();

      this.platform.backButton.subscribe(() => {
        if (this.routerOutlet && this.routerOutlet.canGoBack()) {
          this.routerOutlet.pop();
        } else if (this.router.url === '/tabs/(news:news)') {
          // or if that doesn't work, try
          navigator['app'].exitApp();
        } else {

        }
      });

      this.oneSignal.startInit('d3792d33-23cc-40a2-88fd-d01045dbad23', '859687403906');

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

      this.oneSignal.handleNotificationReceived().subscribe(() => {
        console.log("Rakesh Subsciribed")
      });

      this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
      });

      this.oneSignal.endInit();

    });
  }

  // pushSetup() {
  //   const options: PushOptions = {
  //     android: {
  //       senderID: '859687403906',
  //       sound: 'true',
  //       vibrate: 'true'
  //     },
  //     ios: {
  //         alert: 'true',
  //         badge: true,
  //         sound: 'false'
  //     },
  //     browser: {
  //         pushServiceURL: 'http://push.api.phonegap.com/v1/push'
  //     }
  //  }

  //  const pushObject: PushObject = this.push.init(options);
  //  pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
  //  pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
  //  pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  // }

  // pushSetup() {
  //   this.firebaseMessaging.onBackgroundMessage();
  // }
}
