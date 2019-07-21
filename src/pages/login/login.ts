import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import * as firebase from 'firebase';
import {Observable} from 'rxjs';
import { VendorhomePage } from '../vendorhome/vendorhome';
export interface users{
  email:string,
  password:string
}

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private usersCollection:AngularFirestoreCollection<users>;
  users:Observable<users[]>;
  people;
  user = {} as User;
  constructor(public alertCtrl:AlertController, public navCtrl: NavController, public navParams: NavParams,private afauth:AngularFireAuth,public afs:AngularFirestore) {
    this.usersCollection=afs.collection<users>('users');
    this.users=this.usersCollection.valueChanges();
    this.users.subscribe((data)=>{
      this.people=data;
    });
    console.log(this.people)
  }

  login(){
    this.afauth.auth.signInWithEmailAndPassword(this.user.email,this.user.password).then(data => {
      this.navCtrl.setRoot(HomePage)
    })
    .catch(error => {
      const alert = this.alertCtrl.create({
        title: 'ERROR',
        subTitle: 'Invalid Email or Password',
        buttons: ['OK']
      });
      alert.present();
    });  
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  register(){
    this.navCtrl.setRoot(RegisterPage);
  }


  vendorLogin(){
    for(var i=0;i<this.people.length;i++){
      if(this.user.email==this.people[i].email &&  this.user.password==this.people[i].password){
        this.navCtrl.setRoot(VendorhomePage,{
          res:this.people[i]
        });
      }
    }
  } 
}
