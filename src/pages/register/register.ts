import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { LoginPage } from '../login/login';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;
  @ViewChild('email') EmailValidator;
  @ViewChild('password') Password;
  constructor(private afauth:AngularFireAuth ,public navCtrl: NavController, public navParams: NavParams) {
  }
  async register(user : User){
    try{
      const result = this.afauth.auth.createUserWithEmailAndPassword(user.email,user.password).then(res=>{
      var aut=firebase.auth().currentUser;
      this.navCtrl.setRoot(LoginPage);
      });
    }
    catch(e){
      console.log(e);
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  login(){
    this.navCtrl.setRoot(LoginPage);
  }
}
