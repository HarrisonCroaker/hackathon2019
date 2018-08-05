import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/first';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

/*
  Generated class for the AnnouncementsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AnnouncementsProvider {
	mentor = "5084150";
	constructor(public http: HttpClient, private firestore: AngularFirestore) {
		console.log('Hello AnnouncementsProvider Provider');
	}

	getAnnouncements(sNumber: string){
		this.firestore.collection('Mappings', ref => ref.where(`mentees.${sNumber}`, '==', true)).valueChanges().first().subscribe((group) => {
			this.mentor = group[0]['mentor'];
    });
		return this.firestore.collection('Announcements', ref => ref.where('creatorId', '==', this.mentor).orderBy('timestamp', 'desc')).snapshotChanges();
  	}

	insertAnnouncement(newAnn){
		return this.firestore.collection('Announcements').add(newAnn);
	}

}
