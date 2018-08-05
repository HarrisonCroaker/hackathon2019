import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnnouncementModalPage } from './announcement-modal';

@NgModule({
  declarations: [
    AnnouncementModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AnnouncementModalPage),
  ],
})
export class AnnouncementModalPageModule {}
