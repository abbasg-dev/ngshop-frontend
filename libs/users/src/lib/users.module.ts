import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './pages/login/login.component';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {
  SocialLoginModule,
  SocialAuthServiceConfig
} from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import { environment } from '@env/environment';

export const usersRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(usersRoutes),
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    SocialLoginModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(environment.FACEBOOK_APP_ID),
          },
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.GOOGLE_OAUTH_CLIENT_ID),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  declarations: [LoginComponent]
})
export class UsersModule {}
