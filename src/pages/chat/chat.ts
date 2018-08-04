import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Message } from "../../models/Message";
import { MessagesProvider } from '../../providers/messages/messages';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  id: any;
  messages: Message[];
  inputMessage: string;

  constructor(public navCtrl: NavController, public userService: UserProvider, private messagesService: MessagesProvider, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    this.id = this.navParams.get('id');
    this.messagesService.getMessages(this.id).subscribe(messages => {
      this.messages = messages;
    });
  }

  sendMessage() {
    console.log("Sending...");
    let message: Message = {
      timestamp: (new Date).getTime().toString(),
      type: "general",
      message: this.inputMessage,
      user: this.userService.getCurreUserData()
    };
    this.messagesService.sendMessage(this.id, message);
  }

  goBack() {

  }

}
