import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-book',
  templateUrl: 'book.html',
})
export class BookPage {
  name;
  mobile;
  carNo;
  phone;
  nd;
  timeStarts;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController,
              public http:HttpClient, public toastCtrl:ToastController, public loadingCtrl:LoadingController) {
    this.phone=navParams.get('res');
    console.log(this.phone);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookPage');
  }

  getFunc(){
    if(this.name==null || this.mobile==null || this.mobile.length!=10 || this.carNo==null || this.timeStarts==null){
      const alert = this.alertCtrl.create({
        title: 'Oops!',
        subTitle: 'Entered details are incorrect',
        buttons: ['OK']
      });
      alert.present();
    }
    else{
      const confirm = this.alertCtrl.create({
        title: 'Continue with Booking?',
        message: 'The booking is valid only for 15 minutes after the given time.',
        buttons: [
          {
            text: 'Disagree',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'Agree',
            handler: () => {
               this.http.get("http://api.msg91.com/api/sendhttp.php?country=91&sender=MSGIND&route=4&mobiles="
               +this.phone+"&authkey=236287A8spy6Hb5b927d23&message=Name: "+this.name+",  Mobile: "+this.mobile+
               ",  Car No. : "+this.carNo+",  Expected Time: "+this.timeStarts).subscribe((data)=>{
        console.log(data);
      }); 
        const loader = this.loadingCtrl.create({
          content: "Please wait...",
          duration: 4000
        });
        loader.present();
        this.navCtrl.setRoot(HomePage);
      }
            }
        ]
      });
      confirm.present();
    }
   }
}