import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';

// Services
import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  pageTitle: string = 'Sign In';
  email:string;
  password:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthProvider, public userService: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    if(this.email && this.password){
      this.authService.loginWithPassword(this.email,this.password).then(res=>{
        if(res){
          this.authService.authInit()
          this.userService.initializeUser(res.user.uid)
          this.navCtrl.push(SignUpPage);
        }
      })
    }
  }

  gotToSignUp(){
    this.router.navigate(['/signUp']);
  }

}
