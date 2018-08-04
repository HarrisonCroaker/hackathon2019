import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Message } from "../../models/Message";
import { MessagesProvider } from '../../providers/messages/messages';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  id: any;
  messages: Message[];
  inputMessage: string;

  constructor(public navCtrl: NavController, private messagesService: MessagesProvider, public navParams: NavParams) {
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
      user: {'name': "Carl Humphries", 'sNumber': 5084150, 'email': "adkjsghadsk", 'id': "ksjdghkjdsh"}
    };
    this.messagesService.sendMessage(this.id, message);
  }

  goBack() {

  }

}
