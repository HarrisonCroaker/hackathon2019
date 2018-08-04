import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfileModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-modal',
  templateUrl: 'profile-modal.html',
})
export class ProfileModalPage {
	pageTitle: string = 'Profile';

  constructor(public navCtrl: NavController, public navParams: NavParams,
		private formBuilder: FormBuilder) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileModalPage');
  }

}
