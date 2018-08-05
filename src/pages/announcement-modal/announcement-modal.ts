import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the AnnouncementModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-announcement-modal',
  templateUrl: 'announcement-modal.html',
})
export class AnnouncementModalPage {
	pageTitle: string = 'Add New';
    	announceGroup: FormGroup;

    	constructor(private formBuilder: FormBuilder, private viewCtrl: ViewController) {
    		this.announceGroup = this.formBuilder.group({
    			title: [''],
    			content: [''],
			important: [false]
    		});
    	}

    	ngOnInit() {

    	}

    	goBack(){
    		this.viewCtrl.dismiss(null);
    	}

    	confirm(){
    		this.viewCtrl.dismiss(this.announceGroup.value);
    	}
}
