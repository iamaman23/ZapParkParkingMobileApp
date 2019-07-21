import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { map } from 'rxjs/operators';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import {HttpClientModule} from '@angular/common/http';
import { ParkingdetailsPage } from '../parkingdetails/parkingdetails';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  places;
  constructor(public navCtrl: NavController,public ds:DataserviceProvider)
  {
    this.places=ds.places;
    console.log(this.places);
  }

  
    itemSelected(item){
      for(var i=0;i<this.places.length;i++){
        if(item.name==this.places[i].name){
          this.navCtrl.push(ParkingdetailsPage,{
            res: this.places[i]
          });
        }
      }
    }
    ionViewDidLoad(){
      this.ds.parkingplaces.subscribe((data)=>{
        this.places=data;
      })
        console.log("HomePgae")
        console.log(this.places);
    }
    
}
