import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {HttpClientModule} from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FormsModule } from '@angular/forms';
import { DataserviceProvider } from '../providers/dataservice/dataservice';
import { ParkingdetailsPage } from '../pages/parkingdetails/parkingdetails';
import { VendorhomePage } from '../pages/vendorhome/vendorhome';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { BookPage } from '../pages/book/book';
import { SearchPage } from '../pages/search/search';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
const config = {
  apiKey: "AIzaSyAjFfzjikco357qBw-m2OA5I2V6PLHeZaI",
  authDomain: "parkingapp-c7a32.firebaseapp.com",
  databaseURL: "https://parkingapp-c7a32.firebaseio.com",
  projectId: "parkingapp-c7a32",
  storageBucket: "parkingapp-c7a32.appspot.com",
  messagingSenderId: "204338912816"
};
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ParkingdetailsPage,
    VendorhomePage,
    LoginPage,
    RegisterPage,
    BookPage,
    SearchPage
  ],
  imports: [
    BrowserModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(config),
    IonicModule.forRoot(MyApp),
    FormsModule,
    HttpClientModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ParkingdetailsPage,
    VendorhomePage,
    LoginPage,
    RegisterPage,
    BookPage,
    SearchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataserviceProvider,
    LaunchNavigator
  ]
})
export class AppModule {}
