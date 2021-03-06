import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignupRequestPayload } from './singup-request.payload';

import { Router } from '@angular/router';
import { ToastController, PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/shared/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupRequestPayload: SignupRequestPayload;
  signupForm: FormGroup;

  constructor(private popoverController:PopoverController,private authService: AuthService, private router: Router, public toastController: ToastController) {
    this.signupRequestPayload = {
      username: '',
      email: '',
      password: ''
    };
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }
  ClosePopover(){
    this.popoverController.dismiss();
  }
  signup() {
    this.signupRequestPayload.email = this.signupForm.get('email').value;
    this.signupRequestPayload.username = this.signupForm.get('username').value;
    this.signupRequestPayload.password = this.signupForm.get('password').value;

    this.authService.signup(this.signupRequestPayload)
      .subscribe(data => {
        this.ClosePopover();
        this.router.navigate(['/login'],
          { queryParams: { registered: 'true' } });
      }, async error => {
        console.log(error);

        const toast = await this.toastController.create({
            message: 'Signup fai;ed! Please try again',
            duration: 2000
          });
        toast.present();
          this.ClosePopover();
      });
  }
}
