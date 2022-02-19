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
import { ExcersizeHistoryComponent } from './components/excersize-history/excersize-history.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ExcersizeListComponent } from './components/excersize-list/excersize-list.component';
import { UserProgramsComponent } from './components/user-programs/user-programs.component';
import { UserProgramDetailComponent } from './components/user-program-detail/user-program-detail.component';
import { AssignProgramToUserComponent } from './components/assign-program-to-user/assign-program-to-user.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from './components/auth/auth.guard';
import { UserSettingComponent } from './components/user-setting/user-setting.component';
import { ShowWorkoutComponent } from './components/show-workout/show-workout.component';
import { ShowWorkoutDetailsComponent } from './components/show-workout-details/show-workout-details.component';
import { CreateProgramComponent } from './components/create-program/create-program.component';
import { CreateWorkoutComponent } from './components/create-workout/create-workout.component';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  // { path: 'view-post/:id', component: ViewPostComponent },
  { path: 'user-profile/:name', component: UserSettingComponent, canActivate: [AuthGuard] },
  // { path: 'list-subreddits', component: ListSubredditsComponent },
  // { path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard] },
  // { path: 'create-subreddit', component: CreateSubredditComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  //  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'demo/:userId/:excersizeId', component: ExcersizeHistoryComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'showWorkout/:categoryId', component: ShowWorkoutComponent},
  {path: 'showWorkoutDetail/:id', component: ShowWorkoutDetailsComponent},
  {path: 'userPrograms', component: UserProgramsComponent},
  {path: 'userPrograms/:id', component: UserProgramDetailComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'excersizes', component: ExcersizeListComponent},
  {path: 'assignProgramToUser', component: AssignProgramToUserComponent},
  {path: 'createProgram', component: CreateProgramComponent},
  {path: 'createWorkout', component: CreateWorkoutComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
