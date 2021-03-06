import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';

import { FormBuilder, FormGroup } from '@angular/forms';

import { Post } from '../../models/Post';
import { User } from '../../models/User';

import { DateProvider } from '../../providers/date/date';
import { PostsProvider } from '../../providers/posts/posts';
import { UserProvider } from '../../providers/user/user';

import { ProfileModalPage } from '../profile-modal/profile-modal';

@IonicPage()
@Component({
  selector: 'page-study',
  templateUrl: 'study.html',
})
export class StudyPage {
	pageTitle: string = 'Group Finder';
	currentSegment: string = 'look';
	posts: Post[];
	postGroup: FormGroup;
	user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams,
		private dateService: DateProvider,
		private modalCtrl: ModalController,
		private postsService: PostsProvider,
		private userService: UserProvider,
		private formBuilder: FormBuilder) {
			this.user = userService.getCurreUserData();
			this.postGroup = this.formBuilder.group({
				title: [''],
				content: ['']
				});
		}

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudyPage');
  }

	ionViewWillEnter(){
		this.postsService.getPosts().subscribe(posts => {
			this.posts = posts.map(a => {
				const data = a.payload.doc.data() as Post;
				const id = a.payload.doc.id;
				return { id, ...data };
			})
		});
	}

	respond(){
		console.log("Responding to post!")
	}

	messageChanged(event: any) {
    this.currentSegment = event.value;
    console.log('Segment changed', event.value);
  }

	addPost(){
		this.user = this.userService.getCurreUserData();
		console.log(this.user)
		if(this.postGroup.value.title && this.postGroup.value.content){
			let data = {
					imgLink: "https://app.secure.griffith.edu.au/griffithpay/default_image.gif",
					creatorName: this.user.name,
					id: this.user.sNumber.toString(),
					timestamp: (new Date).getTime().toString(),
					...this.postGroup.value
				}
				console.log(data.timestamp);
				this.postsService.insertPost(data);
		}
		this.clearData();
		this.currentSegment = 'look';
	}

	clearData(){
		this.postGroup = this.formBuilder.group({
			title: [''],
			content: ['']
			});
	}

	profileScreen(){
		const profModal = this.modalCtrl.create(ProfileModalPage)

		profModal.present()
	}

}
