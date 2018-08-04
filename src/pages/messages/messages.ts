import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';
import { MessagesProvider } from '../../providers/messages/messages';
import { User } from '../../models/User'
import { Group } from '../../models/Group';
import { Observable } from 'rxjs';

import { ChatPage } from '../chat/chat';


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
  user: User;
  constructor(public navCtrl: NavController, private messagesService: MessagesProvider, public userService: UserProvider, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.user = this.userService.getCurreUserData();
    this.messagesService.getGroups(this.user.sNumber.toString()).subscribe(groups => {
      this.groupCollection = groups.map(a => {
          const data = a.payload.doc.data() as Group;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
    });
    this.messagesService.getDirectMessages(this.user.sNumber.toString()).subscribe(groups => {
      this.dmCollection = groups.map(a => {
          const data = a.payload.doc.data() as Group;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
    });
  }

	messageChanged(event: any) {
    this.currentSegment = event.value;
    console.log('Segment changed', event.value);
  }

  messageClick(messageObject: any) {
    this.navCtrl.push(ChatPage, messageObject);
  }

}
