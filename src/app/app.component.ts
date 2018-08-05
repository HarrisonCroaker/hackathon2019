import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Subject } from 'rxjs/Rx';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

// Services
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  private unSub: Subject<any> = new Subject();
  private unSub2: Subject<any> = new Subject();


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public authService: AuthProvider, public userService: UserProvider) {
    splashScreen.show();
    this.authService.authInit().takeUntil(this.unSub).subscribe(auth=>{

      if(auth){
        this.userService.initializeUser(auth.uid).takeUntil(this.unSub2).subscribe(user=>{
          this.rootPage = TabsPage
          this.unSub2.next();
          this.unSub2.complete();
        })
      }
      else{
        this.rootPage = LoginPage
        this.unSub.next()
        this.unSub.complete()
      }
    })
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
