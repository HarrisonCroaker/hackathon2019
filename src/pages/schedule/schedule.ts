import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Event } from '../../models/Event';

import { DateProvider } from '../../providers/date/date';
import { EventProvider } from '../../providers/event/event';
import { UserProvider } from '../../providers/user/user';

import { AttendancePage } from '../attendance/attendance';
/**
 * Generated class for the SchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {

	pageTitle: string = 'Schedule';
	events: any;
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
		private dateService: DateProvider,
		private eventService: EventProvider,
		private userService: UserProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
  }

	ionViewWillEnter(){
    this.user = this.userService.getCurreUserData();
		this.eventService.getEvents(this.user.sNumber.toString()).subscribe(events => {
			this.events = events.map(a => {
				const data = a.payload.doc.data() as Event;
				data.timestamp = this.dateService.toDateTime(data.timestamp)
				data.eventTime = this.dateService.toDateTime(data.eventTime)
				const id = a.payload.doc.id;
				return { id, ...data };
			})
		});
	}

	respondYes(event){
    console.log(event.id + this.user.sNumber.toString() + true);
    this.eventService.postEvent(event.id, this.user.sNumber.toString(), true);
	}

	respondNo(event){
    console.log(event.id + this.user.sNumber.toString() + true);
    this.eventService.postEvent(event.id, this.user.sNumber.toString(), false);
	}

  addMeeting() {

  }

  viewattendance(event) {
    console.log(event);
    this.navCtrl.push(AttendancePage, {'event': event});
  }

}
