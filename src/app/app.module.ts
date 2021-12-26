import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { SearchComponent } from './components/search/search.component';
import { ExcersizeHistoryComponent } from './components/excersize-history/excersize-history.component';
import { ExcersizeListComponent } from './components/excersize-list/excersize-list.component';
import { UserProgramsComponent } from './components/user-programs/user-programs.component';
import { TokenInterceptor } from './token-interceptor';
import { UserProgramDetailComponent } from './components/user-program-detail/user-program-detail.component';
import { AssignProgramToUserComponent } from './components/assign-program-to-user/assign-program-to-user.component';
import { WebIntent } from '@ionic-native/web-intent/ngx';
import { UserSettingComponent } from './components/user-setting/user-setting.component';
@NgModule({
  declarations: [AppComponent, ProductCategoryMenuComponent, UserProfileComponent, LoginComponent, SignupComponent,ProductListComponent,
  ProductDetailsComponent, CartStatusComponent,SearchComponent , ExcersizeHistoryComponent, ExcersizeListComponent, UserProgramsComponent,
  UserProgramDetailComponent,AssignProgramToUserComponent,UserSettingComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, NgxWebstorageModule.forRoot(), ReactiveFormsModule,
    ],
  providers: [
    StatusBar,
    SplashScreen,
    WebIntent,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
