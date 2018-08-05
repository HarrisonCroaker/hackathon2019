import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import 'rxjs/add/operator/first';
/*
  Generated class for the EventProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventProvider {
  mentor: any = "5084150";
  constructor(public http: HttpClient, private firestore: AngularFirestore) {
    console.log('Hello EventProvider Provider');
  }

	getEvents(id: string){
    this.firestore.collection('Mappings', ref => ref.where(`mentees.${id}`, '==', true)).valueChanges().first().subscribe((group) => {
      this.mentor = group[0]['mentor'];
    });
		return this.firestore.collection('Events', ref => ref.where(`authorId`, '==', this.mentor)).snapshotChanges();
  }

  postEvent(eventId:string, sNumber:string, resp:boolean, name:string) {
    this.firestore.collection('Events').doc(eventId).collection('Attendance', ref => ref.where(`id`, '==', sNumber)).snapshotChanges().first()
      .subscribe(data => {
        console.log(data);
        if (data.length) {
          console.log(data[0].payload.doc.data().response + "  " + resp); //.update({'response': resp});
          if (data[0].payload.doc.data().response != resp) {
            this.firestore.collection('Events').doc(eventId).collection('Attendance').doc(data[0].payload.doc.id).set({'name': name, 'id': sNumber, 'response': resp});
          }
        } else {
          this.firestore.collection('Events').doc(eventId).collection('Attendance').add({'name': name, 'id': sNumber, 'response': resp});
        }
      });
  }

  getAttendance(eventId:string) {
    return this.firestore.collection('Events').doc(eventId).collection('Attendance').valueChanges();
  }

  newEvent(event: any) {
    console.log("WTF =>" + event)
    this.firestore.collection('Events').add(event);
  }

}
