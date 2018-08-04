import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Firebase
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from '../../models/User';

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

  constructor(public http: HttpClient,private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    console.log('Hello UserProvider Provider');
    afs.firestore.settings({ timestampsInSnapshots: true });
  }

  initializeUser(uid:string){
    this.afs.doc(`Users/${uid}`).valueChanges().subscribe((userData:User)=>{
      console.log(userData)
      this.userData = userData
    })
    return this.afs.doc(`Users/${uid}`).valueChanges()
  }

  setUserData(user: User){
    this.userData = user
  }

  getCurreUserData(){
    return this.userData
  }

  addUser(user: User){
    return this.afs.collection('Users').doc(user.id).set(user);
  }

  clearUser(){
    this.userData = null;
  }

  retrieveUser(uid: string){
    var usersCollection = this.afs.collection("Users");
    return(
      usersCollection.doc(uid).ref.get().then(function(doc) {
          if (doc.exists) {
              console.log("Document data:", doc.data());
              return doc.data()
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      })
    );
  }

}
