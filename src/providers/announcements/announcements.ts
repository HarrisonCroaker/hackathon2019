import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

/*
  Generated class for the AnnouncementsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AnnouncementsProvider {

	constructor(public http: HttpClient, private firestore: AngularFirestore) {
		console.log('Hello AnnouncementsProvider Provider');
	}

	getAnnouncements(){
		return this.firestore.collection('Announcements', ref => ref.orderBy('timestamp', 'desc')).snapshotChanges();
  	}

}
