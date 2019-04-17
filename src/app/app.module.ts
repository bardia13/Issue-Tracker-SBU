/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NbAuthModule, NbPasswordAuthStrategy, NbAuthJWTToken, NbAuthSimpleToken } from '@nebular/auth';
// make sure the path is correct for your setup
import { NgxAuthComponent } from './auth/auth.component';
import { NgxLoginComponent } from './auth/login/login.component';
import { NgxRegisterComponent } from './auth/register/register.component';
import { NgxLogoutComponent } from './auth/logout/logout.component';
import { NgxRequestPasswordComponent } from './auth/request-password/request-password.component';
import { NgxResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    AppComponent,
    NgxAuthComponent,
    NgxLoginComponent,
    NgxRegisterComponent,
    NgxRequestPasswordComponent,
    NgxResetPasswordComponent,
    NgxLogoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    AppRoutingModule,
    

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),

    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup(
        {
          name: 'email',
          baseEndpoint : '',
          token: {
            class : NbAuthSimpleToken,
            key : 'token'
          },
          login: {
            endpoint: 'get_auth_token/',
            method: 'post',
            redirect : {
              success : '/pages',
              failure : '/auth/login/'
            }
          },
          register: {
            endpoint : 'authentication/register/',
            redirect : {
              success : '/auth/login/',
            }
          },
          logout: {
            endpoint: 'authentication/logout/',
          },
          // requestPass: {
          //   endpoint: '/auth/request-pass',
          // },
          // resetPass: {
          //   endpoint: '/auth/reset-pass',
          // },
        }
      ),
      ],
      forms: {},
    }), 

  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
})
export class AppModule {
}
