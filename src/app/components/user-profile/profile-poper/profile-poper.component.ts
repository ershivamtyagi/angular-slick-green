import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginComponent } from '../../auth/login/login.component';
import { SignupComponent } from '../../auth/signup/signup.component';

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

  async redirectToLoginPage(ev:any){
    console.log('inside m');
    this.ClosePopover();
    // this.router.navigate(['/login']);
    return await this.openLoginPopover(ev);
  }

  private async openLoginPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: LoginComponent,
      event: ev,
      translucent: true
    });
    const currentPopover = popover;
    return popover.present();
  }

  async redirectToSignupPage(ev:any){
    this.ClosePopover();
    // this.router.navigate(['/signup']);
    return await this.openSignUpPopover(ev);
  }
  private async openSignUpPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: SignupComponent,
      event: ev,
      translucent: true
    });
    const currentPopover = popover;
    return popover.present();
  }
}
