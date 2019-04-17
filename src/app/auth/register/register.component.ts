/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS, NbAuthSocialLink } from '@nebular/auth/auth.options';
import { getDeepFromObject } from '@nebular/auth/helpers';

import { NbAuthService } from '@nebular/auth/services/auth.service';
import { NbAuthResult } from '@nebular/auth/services/auth-result';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NormalModalComponent } from '../../@theme/components';

@Component({
  selector: 'nb-register',
  styleUrls: ['../auth.component.scss'],
  templateUrl: './register.component.html'
})
export class NgxRegisterComponent {

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';
  usernameChange: boolean = false;
  emailChange: boolean = false;
  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {
    'username': '',
    'password': '',
    'email': '',
    'profile': {
      'fullName': '',
      'phoneNumber': ''
    }
  };
  socialLinks: NbAuthSocialLink[] = [];

  constructor(protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected router: Router,
    private registerSpinner: NgxSpinnerService,
    private modalService: NgbModal) {

    this.redirectDelay = this.getConfigValue('forms.register.redirectDelay');
    this.showMessages = this.getConfigValue('forms.register.showMessages');
    this.strategy = this.getConfigValue('forms.register.strategy');
    this.socialLinks = this.getConfigValue('forms.login.socialLinks');
  }



  register(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.register(this.strategy, this.user).subscribe((result: NbAuthResult) => {

      this.submitted = false;
      if (result.isSuccess()) {
        // console.log("Regsiter success. welcome  :");
        // console.log(this.user);
        this.registerSpinner.show();
        this.messages = result.getMessages();
      } else {
        console.log("regsiter ERROR : ");
        this.errors = result.getErrors();
        console.log(result['response']['status']);
        let response_status = result['response']['status'];


        // if username already exist : 
        if(response_status == 409){
          this.usernameChange = false;
          document.getElementById("input-username").classList.add("ng-invalid");
        }
        // if email already exist : 
        if(response_status == 500){
          this.emailChange = false;
          document.getElementById("input-email").classList.add("ng-invalid");
        }
      
      }


      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          this.registerSpinner.hide();
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
    });
  }

  usernameChange_event() {
    this.usernameChange = true;
  }

  emailChange_event() {
    this.emailChange = true;
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }


  /**
   * forgot password Modal :
   */
  showStaticModal() {
    const activeModal = this.modalService.open(NormalModalComponent, {
      size: 'sm',
      // backdrop: 'static',
      container: 'nb-layout',
    });
    activeModal.componentInstance.modalHeader = 'فراموشی رمز عبور';
    // activeModal.componentInstance.modalTitle1 = 'درگاه بانکی مستقیم';
    activeModal.componentInstance.modalContent1 = `
        در صورت فراموشی رمز عبور لطفا با واحد پشتیبانی تماس بگیرید.
    `;
    // activeModal.componentInstance.modalTitle2 = 'درگاه واسط رندینو';
    activeModal.componentInstance.modalContent2 = `
      info@rondino.ir
    `;
    activeModal.componentInstance.modalContent3 = `
      09210901985
    `;

    activeModal.componentInstance.content_font_weight = 500;
    activeModal.componentInstance.content_color = `#173eff`;

  }

}
