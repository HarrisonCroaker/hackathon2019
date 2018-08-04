import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Firebase
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  private user: Observable<firebase.User>;
  private initialized: boolean = false;
  private userInfo: firebase.UserInfo = null;
  public uid: string;
  
  constructor(public http: HttpClient,private afAuth: AngularFireAuth,private afs: AngularFirestore) {
    console.log('Hello AuthProvider Provider');
    afs.firestore.settings({ timestampsInSnapshots: true });
  }

  authInit(){
    this.user = this.afAuth.authState;
    if(this.initialized==false){
      this.initialized = true;
      this.user.subscribe((user)=>{
        if (user){
          this.userInfo = user;
          console.log(this.userInfo);
        }
        else{
          this.userInfo = null;
        }
      })
      return this.user
    }
    return this.user
  }

  setUID(uid:string){
    this.uid = uid;
  }

  isAuthenticated(): boolean {
    if(this.user){
      return true
    }
    else{
      return false
    }
  }

  loginWithPassword(email: string, password: string){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
  }

  signUpWithPassword(email,password){
    console.log("Signing Up 3")
    return(
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error)
        // ...
      })
    );
  }

  logout(){
    this.afAuth.auth.signOut().then(function(){
      this.router.navigate(["/signIn"]);
    })
  }

}
