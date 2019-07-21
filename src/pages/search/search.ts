import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { ParkingdetailsPage } from '../parkingdetails/parkingdetails';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  places;
  constructor(public navCtrl: NavController, public navParams: NavParams, public ds:DataserviceProvider) {
    this.initializeItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
  initializeItems(){
    this.places=this.ds.places;
    console.log(this.places);
  }

  getParking(ev:any){
    this.initializeItems();
    const val=ev.target.value;
    if(val && val.trim()!=''){
      this.places=this.places.filter((item)=>{
        return (item.name.toLowerCase().indexOf(val.toLowerCase())>-1)
      });
    }
  }
  move(i){
    console.log(i); 
    this.navCtrl.push(ParkingdetailsPage,{
      response:i
    });
  }

}
