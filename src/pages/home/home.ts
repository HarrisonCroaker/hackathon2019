import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pageTitle: string = 'Sign In';
  email:string;
  password:string;
  constructor(public navCtrl: NavController) {

  }

}
