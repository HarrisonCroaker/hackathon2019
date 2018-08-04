import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subject } from 'rxjs/Rx';

import { TabsPage } from '../tabs/tabs';

// Services
import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';

// Models
import { User } from '../../models/User';
/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
	pageTitle = 'Sign Up';

  newUser:User;
  name:string;
  sNumber:number;
  email:string;
  password:string;
  private unSub: Subject<any> = new Subject();
  private unSub2: Subject<any> = new Subject();


  loading: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthProvider, public userService: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  signUp(){
    if(this.name && this.sNumber && this.email && this.password){
      this.loading = true;

      // Sign up
      this.authService.signUpWithPassword(this.email,this.password).then(auth=>{
        if(auth){
          console.log(auth)

          let newUser:User = {
            email: this.email,
            id: auth.user.uid,
            sNumber: this.sNumber
          }
          console.log(newUser)

          this.authService.authInit().takeUntil(this.unSub).subscribe(auth=>{
            if(auth){
              // Add the user to the database, Initialize the user data module, Navigate to tabs
              this.userService.addUser(newUser).then(()=>{
                this.userService.initializeUser(auth.uid).takeUntil(this.unSub2).subscribe(user=>{
                  this.navCtrl.push(TabsPage)
                  this.unSub2.next();
                  this.unSub2.complete();
                })
              }).catch(err=>{
                this.loading = false;
                console.log(err)
              })

            }
            else{
              this.unSub.next()
              this.unSub.complete()
            }
          })


        }
      }).catch(err=>{
        this.loading = false;
        console.log(err)
      });

    }
    else{
      this.loading = false;
      console.log("Err")
    }
  }

	goBack() {
		this.navCtrl.pop()
  }

}
