import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/User';

import { Camera, CameraOptions } from '@ionic-native/camera';

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
	options: CameraOptions = {

	}
	pageTitle: string = 'Profile';
	user: User;
	constructor(private viewCtrl: ViewController,
	  		public navParams: NavParams,
			private userService: UserProvider,
			private camera: Camera) {
			this.user = userService.getCurreUserData()
			}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ProfileModalPage');
	}

	goBack(){
		this.viewCtrl.dismiss();
	}

	addPicture(file):any{
		this.camera.getPicture({quality: 100,
    	  					destinationType: this.camera.DestinationType.FILE_URI,
    	  					encodingType: this.camera.EncodingType.JPEG,
    	  					mediaType: this.camera.MediaType.PICTURE})
		.then((imageData) => {
	 		// imageData is either a base64 encoded string or a file URI
	 		// If it's base64 (DATA_URL):
			let base64Image = 'data:image/jpeg;base64,' + imageData;

			var id = Array(24).fill(0).map(x => Math.random().toString(36).charAt(2)).join('')
			const filePath = 'profilePictures/' + this.user.sNumber;
			this.userService.uploadImg(filePath, base64Image)
		}, (err) => {
			// Handle error
		});
  	}


}
