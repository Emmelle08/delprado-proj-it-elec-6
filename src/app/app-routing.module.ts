import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { logincomponent } from 'backend/authentication/login/login.component';
import { signupcomponent } from 'backend/authentication/signup/signup.component';
import { AuthGuard } from 'backend/authentication/auth.guard';
import { BasketballPostsComponent } from './basketball-posts/basketball-posts.component';
import { PostRantComponent } from './posts/post-rant/post-rant.component';
import { BasketballRantComponent } from './basketball-rant/basketball-rant.component';

const routes: Routes = [
  { path: '', component: PostCreateComponent},
  { path: 'post-create', component: PostCreateComponent },
  { path: 'post-list', component: PostListComponent },
  { path: 'login', component: logincomponent },
  { path: 'signup', component: signupcomponent },
  { path: 'basketball-posts', component: BasketballPostsComponent},
  { path: 'post-rant', component: PostRantComponent},
  { path: 'basketball-rant', component: BasketballRantComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]  
})
export class AppRoutingModule { 
  
}