import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ThemeService } from './services/theme.service';
import { AuthService } from './services/auth/shared/auth.service';
import { Router, Data, ActivatedRoute } from '@angular/router';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  
  
  isLoggedIn: boolean;
  username: string;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private themeService: ThemeService,
    private authService: AuthService, private router: Router,private productService:ProductService
  ,private route: ActivatedRoute) {
    this.initializeApp();
    this.isLoggedIn = this.authService.isLoggedIn();
    
   this.authService.loggedIn.subscribe(
       data => this.isLoggedIn = data
       );
    this.username = this.authService.getUserName();
  }

 
  goToUserProfile() {
    console.log('goToUserProfile');
    this.router.navigateByUrl('/user-profile/' + this.username);
  }
  logout() {
    console.log('logging out');
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }
  
currentCategoryId: number;



  changeTheme(eevnt){
    console.log("===>"+eevnt.detail.checked);
    if(eevnt.detail.checked) {
    this.themeService.enableDarkMode();
    // document.body.setAttribute('color-theme','dark');
    }
    else {
      // document.body.setAttribute('color-theme','light');
    this.themeService.enableLightMode();
    }
  }
  // enableLight(){
   
  // }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
