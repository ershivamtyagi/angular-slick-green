import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginRequestPayload } from './login-request.payload';

import { Router, ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { ToastController, PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  registerSuccessMessage: string;
  isError: boolean;

  constructor(private popoverController: PopoverController,private authService: AuthService, private activatedRoute: ActivatedRoute,
              private router: Router, private toastController: ToastController) {
    this.loginRequestPayload = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params.registered !== undefined && params.registered === 'true') {
          this.presentToast();
          this.registerSuccessMessage = 'Please Check your inbox for activation email '
            + 'activate your account before you Login!';
        }
      });
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Signup Successful.',
      duration: 2000
    });
    toast.present();
  }

  async presentSuccessLoginToast() {
    const toast = await this.toastController.create({
      message: 'Login Successful.',
      duration: 2000
    });
    toast.present();
  }
  ClosePopover(){
    this.popoverController.dismiss();
  }
  login() {
    console.log('inside login()');
    this.loginRequestPayload.username = this.loginForm.get('username').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;

    this.authService.login(this.loginRequestPayload).subscribe(data => {
      this.isError = false;
      this.router.navigateByUrl('');
      this.presentSuccessLoginToast();
      this.ClosePopover();
    }, error => {
      this.isError = true;
      throwError(error);
    });
  }

}
