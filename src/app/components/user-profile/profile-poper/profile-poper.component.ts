import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-poper',
  templateUrl: './profile-poper.component.html',
  styleUrls: ['./profile-poper.component.scss'],
})
export class ProfilePoperComponent implements OnInit {

  constructor(private popoverController: PopoverController,private router: Router) { }

  ngOnInit() {}
  ClosePopover(){
    this.popoverController.dismiss();
  }

  redirectToLoginPage(){
    console.log('inside m');
    this.ClosePopover();
    this.router.navigate(['/login']);

  }

  redirectToSignupPage(){
    this.ClosePopover();
    this.router.navigate(['/signup']);
  }
}
