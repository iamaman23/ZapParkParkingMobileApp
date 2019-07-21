import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
export interface parkingplaces{
  name:String,
  lat:String,
  lon:String
};
/*
  Generated class for the DataserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataserviceProvider {
  private parkingplacesCollection:AngularFirestoreCollection<parkingplaces>;
  parkingplaces:Observable<parkingplaces[]>;
  places;
  constructor(public http: HttpClient, public afs:AngularFirestore) {
    console.log('Hello DataserviceProvider Provider');
    this.parkingplacesCollection=afs.collection<parkingplaces>('parkingplaces');
    this.parkingplaces=this.parkingplacesCollection.valueChanges();
    this.parkingplaces.subscribe((data)=>{
      this.places=data;
    });
  }

}
