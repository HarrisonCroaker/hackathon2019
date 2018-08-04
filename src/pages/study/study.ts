import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Post } from '../../models/Post';

import { DateProvider } from '../../providers/date/date';
import { PostsProvider } from '../../providers/posts/posts';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-study',
  templateUrl: 'study.html',
})
export class StudyPage {
	pageTitle: string = 'Group Finder';
	currentSegment: string = 'look';
	posts: Post[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
		private dateService: DateProvider,
		private postsService: PostsProvider,
		private userService: UserProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudyPage');
  }

	ionViewWillEnter(){
		this.postsService.getPosts().subscribe(posts => {
			this.posts = posts.map(a => {
				const data = a.payload.doc.data() as Post;
				data.timestamp = this.dateService.toDateTime(data.timestamp)
				const id = a.payload.doc.id;
				return { id, ...data };
			})
		});
	}

	respond(){

	}

	messageChanged(event: any) {
    this.currentSegment = event.value;
    console.log('Segment changed', event.value);
  }

}
