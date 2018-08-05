import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { AutomateMessagePage } from '../automate-message/automate-message';
import { GroupListPage } from '../group-list/group-list';

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
  group:any;

  constructor(public navCtrl: NavController, public userService: UserProvider, private messagesService: MessagesProvider, public navParams: NavParams,public modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
    this.content.scrollToBottom();
    this.currentUser = this.userService.getCurreUserData();
    console.log('ionViewDidLoad ChatPage');
    this.id = this.navParams.get('id');
    this.group = this.navParams.data;
    console.log(this.group)
    this.messagesService.getMessages(this.id).subscribe(messages => {
      this.messages = messages;
      this.content.resize();
      this.scrollToBottom();
      console.log(this.messages)
    });
  }

  sendMessage() {
    console.log("Sending...");
    if(this.inputMessage){
      let message: Message = {
        timestamp: (new Date).getTime().toString(),
        type: "general",
        message: this.inputMessage,
        user: this.currentUser
      };
      this.messagesService.sendMessage(this.id, message);
      this.inputMessage = '';
    }

  }

  scrollToBottom() {
      setTimeout(() => {
        if (this.content.scrollToBottom) {
          try{
            this.content.scrollToBottom();
          }catch(e){
            console.log(e)
          }

        }
      }, 200)
  }

  openAutoModal(){
    const modal = this.modalCtrl.create(AutomateMessagePage);
    modal.onDidDismiss(data => {
      if(data!=null){
        this.inputMessage = data.msg
        this.sendMessage()
        console.log(data);
      }
    });
    modal.present();
  }

  openGroup(){
    this.navCtrl.push(GroupListPage,this.group);
  }

  goBack() {

  }

}
