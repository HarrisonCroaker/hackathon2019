import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Message } from '../../models/Message';


@Injectable()
export class MessagesProvider {

  constructor(public firestore: AngularFirestore, public http: HttpClient) {
    console.log('Hello MessagesProvider Provider');
  }

  getGroups(id: string): any {
    return this.firestore.collection('Groups', ref => ref.where(`members.${id}`, '==', true).where('type', '==', 'group')).snapshotChanges();
  }

  getDirectMessages(id: string): any {
    return this.firestore.collection('Groups', ref => ref.where(`members.${id}`, '==', true).where('type', '==', 'dm')).snapshotChanges();
  }

  getMessages(groupId: string): any {
    return this.firestore.collection('Groups').doc(groupId).collection('Messages',ref => ref.orderBy('timestamp','asc')).valueChanges();
  }

  sendMessage(groupId: string, message: Message) {
    this.firestore.collection('Groups').doc(groupId).collection('Messages').add(message);
  }

}
