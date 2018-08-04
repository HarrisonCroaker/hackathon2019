import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';

import { Announcement } from '../../models/Announcement';

import { DateProvider } from '../../providers/date/date';
import { AnnouncementsProvider } from '../../providers/announcements/announcements';
import { UserProvider } from '../../providers/user/user';

import { AnnouncementModalPage } from '../announcement-modal/announcement-modal';

import { User } from '../../models/User';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	announcements: Announcement[]
	pageTitle: string = 'Announcements';
	user: User;
	constructor(private navCtrl: NavController,
			private modalCtrl: ModalController,
			private dateService: DateProvider,
			private announceService: AnnouncementsProvider,
			private userService: UserProvider) {
				this.user = userService.getCurreUserData()
			}

	ionViewWillEnter(){
		this.announceService.getAnnouncements(this.user.sNumber.toString()).subscribe(anns => {
			this.announcements = anns.map(a => {
				const data = a.payload.doc.data() as Announcement;
				data.timestamp = this.dateService.toDateTime(data.timestamp)
				const id = a.payload.doc.id;
				return { id, ...data };
			})
		});
	}

	addAnnouncement(){
		const annModal = this.modalCtrl.create(AnnouncementModalPage)
		annModal.onDidDismiss(data => {
			console.log(data)
			if(!data) {
				return;
			}
			data = {
				imgLink: "https://i.kym-cdn.com/photos/images/original/001/316/888/f81.jpeg",
				creatorName: this.user.name,
				creatorId: this.user.sNumber.toString(),
				timestamp: (new Date()).getTime(),
				...data
			}
			console.log(data.timestamp)
			this.announceService.insertAnnouncement(data)
		})
		annModal.present()
	}

}
