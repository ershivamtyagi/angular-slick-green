// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
// // import { SignupComponent } from './auth/signup/signup.component';
// // import { LoginComponent } from './auth/login/login.component';
// // import { HomeComponent } from './home/home.component';
// // import { CreatePostComponent } from './post/create-post/create-post.component';
// // import { CreateSubredditComponent } from './subreddit/create-subreddit/create-subreddit.component';
// import { ListSubredditsComponent } from './subreddit/list-subreddits/list-subreddits.component';
// import { ViewPostComponent } from './post/view-post/view-post.component';
// import { AuthGuard } from './auth/auth.guard';
//  import { CartDetailsComponent } from './components/cart-details/cart-details.component';
// // import { ProductDetailsComponent } from './components/product-details/product-details.component';
// import { ProductListComponent } from './components/product-list/product-list.component';

import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { NgModule } from '@angular/core';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  // { path: 'view-post/:id', component: ViewPostComponent },
 // { path: 'user-profile/:name', component: UserProfileComponent, canActivate: [AuthGuard] },
  // { path: 'list-subreddits', component: ListSubredditsComponent },
  // { path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard] },
  // { path: 'create-subreddit', component: CreateSubredditComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  //  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
