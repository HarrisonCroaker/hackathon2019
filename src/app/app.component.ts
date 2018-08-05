import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Subject } from 'rxjs/Rx';
import { ToastController } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

// Services
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
import { MessagesProvider } from '../providers/messages/messages';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  private unSub: Subject<any> = new Subject();
  private unSub2: Subject<any> = new Subject();
  private activated: boolean = false;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public authService: AuthProvider, public userService: UserProvider, public messagesService: MessagesProvider,private toastCtrl: ToastController,private nativeAudio: NativeAudio) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      statusBar.styleDefault();
      splashScreen.hide();

      this.nativeAudio.preloadSimple('bing', './assets/bing.mp3')
      this.authService.authInit().takeUntil(this.unSub).subscribe(auth=>{

        if(auth){
          this.userService.initializeUser(auth.uid).takeUntil(this.unSub2).subscribe(user=>{
            this.messagesService.getMessages('YQNee4tTfc3JrO7R4g4X').subscribe(messages => {
              if(this.activated && messages[messages.length-1].user.id != auth.uid){
                this.nativeAudio.play('bing');
                this.presentToast(messages[messages.length-1]);
                this.nativeAudio.stop('bing');
              }
              else{
                this.activated=true;
              }

            });
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
    });
  }

  presentToast(message) {
    console.log(message)
    let toast = this.toastCtrl.create({
      message: 'New Message from ' + message.user.name,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
