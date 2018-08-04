import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MessagesProvider } from '../providers/messages/messages';
import { AuthProvider } from '../providers/auth/auth';
import { AnnouncementsProvider } from '../providers/announcements/announcements';
import { DateProvider } from '../providers/date/date';
import { PostsProvider } from '../providers/posts/posts';
import { UserProvider } from '../providers/user/user';
import { ScheduleProvider } from '../providers/schedule/schedule';
import { EventProvider } from '../providers/event/event';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MessagesProvider,
    AuthProvider,
    AnnouncementsProvider,
    DateProvider,
    PostsProvider,
    UserProvider,
    ScheduleProvider,
    EventProvider
  ]
})
export class AppModule {}
