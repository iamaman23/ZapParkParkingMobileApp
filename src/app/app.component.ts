import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Searchbar } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { VendorhomePage } from '../pages/vendorhome/vendorhome';
import { LoginPage } from '../pages/login/login';
import { SearchPage } from '../pages/search/search';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      {title:'Search',component:SearchPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    

     /* var notificationOpenedCallback = function(jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };

    window["plugins"].OneSignal
      .startInit("954b3385-ede6-430f-b536-632c64e23de4", "166416218188")
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit() ;*/ 
  }
  /* sendTag() {
    window["plugins"].OneSignal.sendTags({key: "Akshit"});
    console.log("tags sent");
  } */
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title!="Home")
    this.nav.push(page.component);
    else{
      this.nav.setRoot(page.component);
    }
  }
}
