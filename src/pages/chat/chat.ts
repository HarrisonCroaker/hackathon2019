import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/User';

import { Message } from "../../models/Message";
import { MessagesProvider } from '../../providers/messages/messages';
import { UserProvider } from '../../providers/user/user';
import { Content } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  @ViewChild(Content) content: Content;
  id: any;
  messages: Message[];
  inputMessage: string;

  currentUser: User;

  constructor(public navCtrl: NavController, public userService: UserProvider, private messagesService: MessagesProvider, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.content.scrollToBottom();
    this.currentUser = this.userService.getCurreUserData();
    console.log('ionViewDidLoad ChatPage');
    this.id = this.navParams.get('id');
    this.messagesService.getMessages(this.id).subscribe(messages => {
      this.messages = messages;
      this.content.resize();
      this.scrollToBottom();
      console.log(this.messages)
    });
  }

  sendMessage() {
    console.log("Sending...");
    let message: Message = {
      timestamp: (new Date).getTime().toString(),
      type: "general",
      message: this.inputMessage,
      user: this.currentUser
    };
    this.messagesService.sendMessage(this.id, message);
    this.inputMessage = '';
  }

  scrollToBottom() {
      setTimeout(() => {
        if (this.content.scrollToBottom) {
          this.content.scrollToBottom();
        }
      }, 200)
  }

  goBack() {

  }

}
