import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'page-vendorhome',
  templateUrl: 'vendorhome.html',
})
export class VendorhomePage {

  details;
  places;
  placeDetails=[];
  pla;
  constructor(public alertCtrl:AlertController, private afauth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams,public ds:DataserviceProvider,public afs:AngularFirestore) 
  {
    this.details=navParams.get('res');
    this.ds.parkingplaces.subscribe((data)=>{
      this.places=data;
      this.checkDetails();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorhomePage');
  }

  checkDetails(){
    for(var i=0;i<this.places.length;i++){
      if(this.details.name==this.places[i].name){
        this.placeDetails=this.places[i];
        this.pla=this.places[i];
        break;
      }
    }
    console.log(this.placeDetails);
  }

  carIn(){
    var parkingSpots=this.pla.spots;
    if(parkingSpots<=this.pla.totalSpaces && parkingSpots>0){
      this.afs.collection('parkingplaces').doc(this.details.name).update({
        spots:parkingSpots-1
      });
      parkingSpots--;
    }
    else if(parkingSpots<=0){
      const alert = this.alertCtrl.create({
        title: 'Oops!',
        subTitle: 'Parking Cannot Go Below 0',
        buttons: ['OK']
      });
      alert.present();
    }
    if(parkingSpots==0){
      this.afs.collection('parkingplaces').doc(this.details.name).update({
        status:"Not Available"
      });
    }
    
  }

  carOut(){
    var parkingSpots=this.pla.spots;
    if(parkingSpots<this.pla.totalSpaces){
      this.afs.collection('parkingplaces').doc(this.details.name).update({
        spots:parkingSpots+1
      });
      parkingSpots++;
    }
    else{
      const alert = this.alertCtrl.create({
        title: 'Oops!',
        subTitle: 'Parking Cannot Exceed the Maximum Limit',
        buttons: ['OK']
      });
      alert.present(); 
    }
    if(parkingSpots!=0){
      this.afs.collection('parkingplaces').doc(this.details.name).update({
        status:"Available"
      });
    }
  }
}
