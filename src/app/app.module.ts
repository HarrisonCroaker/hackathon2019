import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NavController } from 'ionic-angular';

// Pages
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MessagesPage } from '../pages/messages/messages';
import { ChatPage } from '../pages/chat/chat';
import { LoginPage } from '../pages/login/login';
import { StudyPage } from '../pages/study/study';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { SchedulePage } from '../pages/schedule/schedule';
import { AttendancePage } from '../pages/attendance/attendance';
import { AnnouncementModalPage } from '../pages/announcement-modal/announcement-modal';
import { ProfileModalPage } from '../pages/profile-modal/profile-modal';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Services
import { MessagesProvider } from '../providers/messages/messages';
import { AuthProvider } from '../providers/auth/auth';
import { AnnouncementsProvider } from '../providers/announcements/announcements';
import { DateProvider } from '../providers/date/date';
import { PostsProvider } from '../providers/posts/posts';
import { UserProvider } from '../providers/user/user';
import { EventProvider } from '../providers/event/event';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { ReactiveFormsModule} from '@angular/forms';

export const firebaseConfig = {
  apiKey: "AIzaSyC9x_GJ3kJG2Kp-Fo3rlnK0gcQZLN2DzQI",
  authDomain: "hackathon2018-ba671.firebaseapp.com",
  databaseURL: "https://hackathon2018-ba671.firebaseio.com",
  projectId: "hackathon2018-ba671",
  storageBucket: "hackathon2018-ba671.appspot.com",
  messagingSenderId: "1022766297163"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    MessagesPage,
    ChatPage,
    LoginPage,
    StudyPage,
    SignUpPage,
    SchedulePage,
    AttendancePage,
    AnnouncementModalPage,
		ProfileModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    MessagesPage,
    ChatPage,
    LoginPage,
    StudyPage,
    SignUpPage,
    SchedulePage,
    AnnouncementModalPage,
		ProfileModalPage,
    AttendancePage
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
    EventProvider
  ]
})
export class AppModule {}
