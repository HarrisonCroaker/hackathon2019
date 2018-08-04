import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController, ViewController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the AutomateMessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-automate-message',
  templateUrl: 'automate-message.html',
})
export class AutomateMessagePage {
  messages: [{title:string,msg:string}];
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public alertCtrl: AlertController) {
    this.messages = [
      {
        title: "Welcome Message",
        msg: `Hi,

        I’m your mentor group leader. I am here to help you succeed at Uni.

        Between weeks 1 to 6, our mentor group will meet up at at time and location discussed to talk about the best ways to study for your first assignments, how to cram for your first exam, and all of the services and resources available to you as a Griffith student.

        These meetings will help you to get the most out of your university experience, so come along and say hi!

        If you have any questions during the semester, feel free to email me, or come to the mentor group meeting and we can talk about it as a team.

        Congrats for making it to university and I’ll see you at Orientation!

        PS- Have you already done some study here at Griffith? If you are already settled in at Griffith and don't feel like you need a mentor, please email me to let me know and we can take you off our email list. ​​​​​​​`
      },
      {
        title: "Initial Meeting Reminder",
        msg: `Hi there,

        It was great to meet some of you at Orientation! The Mentor Group will have our first meeting as we've discussed.

        I’ll be wearing a mentor lanyard/something specific, so feel free to come and give me a high five. We will be talking about the best way to start doing uni:

        Getting ready for assignments and exams
        Getting the most out of Learning@Griffith, Blackboard, and myGriffith
        Where to find the best/cheapest coffee and food
        Whatever else you are having trouble with or want to know
        Feel free to email me if you have any questions about uni life.

        See you at our first meeting!`
      },
      {
        title: "Lectures and Assignments",
        msg: `Hi,

        At this week’s meeting we will be talking about lectures.

        How do you access them online? Should you take notes? How should you use lectures to prepare for exams and assignments?

        Lectures can really help you to get good grades, so come along and discuss how to do lectures right!

        Remember, you can email me if you have any questions about uni life or check out the First Trimester at Griffith site.`
      },
      {
        title: "Exams and Study Tips",
        msg: `Hi there,

        Starting to think about those exams and assignments? This week’s meeting will be about study tips and university services that will help you to get the best grades possible.

        I hope to see you there!

        ​​​​​​​Also, if you are a "mature age student" there are social events with free coffee happening soon.`
      },
      {
        title: "Census Date",
        msg: `Hi there,

        Census date is coming, which means you need to think about your enrolment. Our Mentor Group meeting we will be talking about how to change your enrolment before census date. This could be really important throughout your time at university. Assessment is also coming! So come along and catch up with the Mentor Group and we'll give you some great tips on getting started with your assignments.`
      },
      {
        title: "General Tips",
        msg: `At this week’s Mentor Group Meeting we will help you stay on top of assessment with a few tech tips:

        Smarthinking
        Online referencing tool
        Changing your Griffith password
        Printing at Griffith
        Using turn-it-in
        These are really important skills for your uni success, so come along and say “hi”!`
      },
      {
        title: "Services",
        msg: `This week the Mentor Group will be discussing the services available to you.

        Would you like to talk to someone about personal or medical issues? Short on cash or having trouble finding somewhere to live? Griffith has services available to you might be able to help with these issues and more. We’ll see you there!`
      },
      {
        title: "Future Tips",
        msg: `This week we will be talking about the rest of your Trimester and degree. What do you want to achieve? How are you going to achieve it? We will offer you whatever tips we can about the future of your studies.

        Also, while you are studying this week be sure to check out the  Library study areas available to you, and this guide for preparing for exams.`
      }

    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AutomateMessagePage');
  }

  showPrompt(msg:string){
    const confirm = this.alertCtrl.create({
      title: 'Send This Message?',
      message: msg,
      buttons: [
        {
          text: 'No Thanks',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Send',
          handler: () => {
            let data = { 'msg': msg };
            this.viewCtrl.dismiss(data);
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present()
  }

  closeModal(){
    let data = { 'msg': null };
    this.viewCtrl.dismiss();
  }

}
