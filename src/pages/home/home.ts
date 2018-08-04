import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Announcement } from '../../models/Announcement';

import { DateProvider } from '../../providers/date/date';
import { AnnouncementsProvider } from '../../providers/announcements/announcements';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['home.scss']
})
export class HomePage {
	announcements: Announcement[]
	pageTitle: string = 'Announcements';
	constructor(private navCtrl: NavController,
			private dateService: DateProvider,
			private announceService: AnnouncementsProvider,
			private userService: UserProvider) {}

	ionViewWillEnter(){
		this.announceService.getAnnouncements().subscribe(anns => {
			this.announcements = anns.map(a => {
				const data = a.payload.doc.data() as Announcement;
				data.timestamp = this.dateService.toDateTime(data.timestamp)
				const id = a.payload.doc.id;
				return { id, ...data };
			})
		});
	}

}
