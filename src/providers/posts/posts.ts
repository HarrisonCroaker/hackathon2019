import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
/*
  Generated class for the PostsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostsProvider {

  constructor(public http: HttpClient, private firestore: AngularFirestore) {
    console.log('Hello PostsProvider Provider');
  }

	getPosts(){
		return this.firestore.collection('Posts', ref => ref.orderBy('timestamp', 'desc')).snapshotChanges();
  }

	insertPost(newPost: any){
		this.firestore.collection('Posts').add(newPost)
	}

}
