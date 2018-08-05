import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EventProvider } from '../../providers/event/event';

/**
 * Generated class for the AttendancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-attendance',
  templateUrl: 'attendance.html',
})
export class AttendancePage {

	pageTitle: string = 'Attendees';
  event: any;
  attendance: any;
  constructor(private eventService: EventProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendancePage');
    this.event = this.navParams.get('event');
    this.eventService.getAttendance(this.event.id).subscribe(att => {
      this.attendance = att;
    });
    console.log(this.event);
  }

}
