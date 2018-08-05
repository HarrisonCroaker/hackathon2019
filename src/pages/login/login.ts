import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';
import { TabsPage } from '../tabs/tabs';
import { Subject } from 'rxjs/Rx';

// Services
import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  pageTitle: string = 'Sign In';
  email:string;
  password:string;

  private unSub: Subject<any> = new Subject();
  private unSub2: Subject<any> = new Subject();

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthProvider, public userService: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    if(this.email && this.password){
      this.authService.loginWithPassword(this.email,this.password).then(res=>{
        if(res){
          this.authService.authInit().takeUntil(this.unSub).subscribe(auth=>{

            if(auth){
              this.userService.initializeUser(auth.uid).takeUntil(this.unSub2).subscribe(user=>{

                this.navCtrl.setRoot(TabsPage);

                this.unSub2.next();
                this.unSub2.complete();

                this.unSub.next()
                this.unSub.complete()
              })
            }
            else{
              this.unSub.next()
              this.unSub.complete()
            }
          })
        }
      })
    }
  }

  gotToSignUp(){
    this.navCtrl.push(SignUpPage);
  }

}
