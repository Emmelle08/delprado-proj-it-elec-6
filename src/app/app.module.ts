import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from './error-interceptor';
import { AuthGuard } from '../../backend/authentication/auth.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';  
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator';
import { logincomponent } from 'backend/authentication/login/login.component';
import { signupcomponent } from 'backend/authentication/signup/signup.component';
import { AuthInterceptor } from 'backend/authentication/auth-interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { BasketballPostsComponent } from './basketball-posts/basketball-posts.component';
import { PostRantComponent } from './posts/post-rant/post-rant.component';
import { BasketballRantComponent } from './basketball-rant/basketball-rant.component';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    logincomponent,
    signupcomponent,
    BasketballPostsComponent,
    PostRantComponent,
    BasketballRantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatExpansionModule,
    MatToolbarModule,
    MatCardModule,
    HttpClientModule,
    MatPaginatorModule,
    MatDialogModule,
  ],
  providers: [
    // Provide the AuthInterceptor first, then the ErrorInterceptor
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, 
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthGuard
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }