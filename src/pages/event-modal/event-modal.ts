import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/User';


@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {
  pageTitle: string = 'Create Event';
  eventGroup: FormGroup;
  user: User;

  constructor(public userService: UserProvider, private formBuilder: FormBuilder, private viewCtrl: ViewController) {
    this.user = userService.getCurreUserData();
    this.eventGroup = this.formBuilder.group({
      title: [''],
      content: [''],
      eventTime: [''],
      eventLocation: ['']
    });
  }

  ngOnInit() {

  }

  goBack(){
    this.viewCtrl.dismiss(null);
  }

  confirm(){
    this.viewCtrl.dismiss(this.eventGroup.value);
  }

}
