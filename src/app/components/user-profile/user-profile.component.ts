import { Component, OnInit } from '@angular/core';
import { PopoverController, AlertController } from '@ionic/angular';
import { ProfilePoperComponent } from './profile-poper/profile-poper.component';
import { AuthService } from 'src/app/services/auth/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss','./user-profile.componentstyle.css'],
})
export class UserProfileComponent implements OnInit {
  isLoggedIn: boolean;
  username: string;
  constructor(private popoverController: PopoverController,private alertCtrl: AlertController,
    private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // this.onDeleteRecipe();
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
    console.log(this.isLoggedIn+"isLoggedIn")
  }

  goToUserProfile() {
    console.log("s");
    this.router.navigateByUrl('/user-profile/' + this.username);
  }
  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }
  // onDeleteRecipe(){
  //   this.alertCtrl.create({header: 'Are you sure?',message:'Do you really want to delete the recipe?',buttons:[{
  //     text:'Cancel',
  //     role:'cancel'
  //   },
  //   {
  //     text:'Delete',
  //     handler: ()=>{
       
  //     }
  //   }
  // ]}).then(alertEl=>{
  //   alertEl.present();
  // });

  // }
  
  async handleButtonClick(ev:any) {
  const popover = await this.popoverController.create({
      component: ProfilePoperComponent,
      event: ev,
      translucent: true
    });
  const currentPopover = popover;
  return popover.present();
  }

  
// function dismissPopover() {
//       if (currentPopover) {
//         currentPopover.dismiss().then(() => { currentPopover = null; });
//       }
//     }
}
