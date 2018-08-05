import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { Event } from '../../models/Event';

import { DateProvider } from '../../providers/date/date';
import { EventProvider } from '../../providers/event/event';
import { UserProvider } from '../../providers/user/user';

import { AttendancePage } from '../attendance/attendance';

import { EventModalPage } from '../event-modal/event-modal';


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
		private userService: UserProvider,
    private modalCtrl: ModalController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
  }

	ionViewWillEnter(){
    this.user = this.userService.getCurreUserData();
		this.eventService.getEvents(this.user.sNumber.toString()).subscribe(events => {
			this.events = events.map(a => {
				const data = a.payload.doc.data() as Event;
				const id = a.payload.doc.id;
				return { id, ...data };
			})
		});

	}

	respondYes(event){
    console.log(event.id + this.user.sNumber.toString() + true);
    this.eventService.postEvent(event.id, this.user.sNumber.toString(), true, this.user.name);
	}

	respondNo(event){
    console.log(event.id + this.user.sNumber.toString() + true);
    this.eventService.postEvent(event.id, this.user.sNumber.toString(), false, this.user.name);
	}

  addMeeting() {
    const evModal = this.modalCtrl.create(EventModalPage)
		evModal.onDidDismiss(data => {
			console.log(data);
			if(!data) {
				return;
			}
			data = {
				imgLink: "https://app.secure.griffith.edu.au/griffithpay/default_image.gif",
				creatorName: this.user.sNumber.toString(),
				authorId: this.user.sNumber.toString(),
				timestamp: (new Date).getTime().toString(),
				...data
			}
			console.log(data);
      this.eventService.newEvent(data);
		})
		evModal.present()
  }

  viewattendance(event) {
    console.log(event);
    this.navCtrl.push(AttendancePage, {'event': event});
  }

}
