import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
/*
  Generated class for the EventProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventProvider {

  constructor(public http: HttpClient, private firestore: AngularFirestore) {
    console.log('Hello EventProvider Provider');
  }

	getEvents(){
		return this.firestore.collection('Events', ref => ref.orderBy('respondedTo', 'desc').orderBy('timestamp', 'desc')).snapshotChanges();
  }

}
