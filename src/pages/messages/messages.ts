import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MessagesProvider } from '../../providers/messages/messages';
import { User } from '../../models/User'
import { Group } from '../../models/Group';

import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

  pageTitle: string = 'Messages';

  currentSegment: String = "group";
  groupCollection: Observable<Group[]>;
  dmCollection: Array<Group>;

  constructor(private messagesService: MessagesProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.messagesService.getGroups('5084150').subscribe(groups => {
      this.groupCollection = groups.map(a => {
          const data = a.payload.doc.data() as Group;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
    });
    this.messagesService.getDirectMessages('5084150').subscribe(groups => {
      this.dmCollection = groups.map(a => {
          const data = a.payload.doc.data() as Group;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
    });
  }

  messageChanged(event: any) {
    this.currentSegment = event.value;
    console.log('Segment changed = > ', event.value);
  }

}
