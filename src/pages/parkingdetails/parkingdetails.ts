import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { BookPage } from '../book/book';
import { map } from 'rxjs/operators';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
declare var google:any;

/**
 * Generated class for the ParkingdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-parkingdetails',
  templateUrl: 'parkingdetails.html',
})
export class ParkingdetailsPage {
  @ViewChild('map') mapRef:ElementRef;
  places;  
  options;
  map:any;

  details;
  constructor(public navCtrl: NavController, public navParams: NavParams,public afs:AngularFirestore,
     public alertCtrl:AlertController, public ds:DataserviceProvider, public launchNavigator:LaunchNavigator) 
    {
      if(navParams.get('res'))
      this.details=navParams.get('res');
      else{
        this.details=navParams.get('response');
      }
    }
    displayMap(){
        var lat=26.9033;
       var lon=75.8369;
       const location = new google.maps.LatLng(lat,lon);
        this.options = {
        center:location,
        zoom:10,
        streetViewControl:false,
        mapTypeId:'roadmap'
        };
      this.map=new google.maps.Map(this.mapRef.nativeElement,this.options);
         var latitude=this.details.lat;
         var longitude=this.details.lon;
         console.log(latitude+" "+longitude);
         var location1=new google.maps.LatLng(latitude,longitude);
         var title=this.details.name;
         this.addMarker(location1,this.map,title);
       }
      addMarker(position,map,title){
        return new google.maps.Marker({
          position,
          map,
          title
        });
      }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParkingdetailsPage');
    this.displayMap();
  }
  move(){
    if(this.details.spots==0){
      const alert = this.alertCtrl.create({
        title: 'SORRY',
        subTitle: 'Parking Spot Not Available',
        buttons: ['OK']
      });
      alert.present();
    }
    else{
    this.navCtrl.push(BookPage,{
      res:this.details.mobile
    });
  } 
}
  navigate(){
    var name=this.details.name;
    this.launchNavigator.navigate(name+' ,Jaipur');
  }
}
