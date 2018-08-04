import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { MessagesPage } from '../messages/messages';
import { SchedulePage } from '../schedule/schedule';
import { StudyPage } from '../study/study';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MessagesPage;
  tab3Root = SchedulePage;
  tab4Root = StudyPage;

  constructor() {

  }
}
