import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Firebase
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  private userDataDoc: AngularFirestoreDocument<User>;
  private userData: User = null;
  private userObservable: Observable<any>;

  constructor(public http: HttpClient,private afAuth: AngularFireAuth, private router: Router,private afs: AngularFirestore) {
    console.log('Hello UserProvider Provider');

  }

}
