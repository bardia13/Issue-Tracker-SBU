import { OnInit } from '@angular/core';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS, NbAuthSocialLink } from '@nebular/auth/auth.options';
import { getDeepFromObject } from '@nebular/auth/helpers';
import { Subscription } from 'rxjs/Subscription';

import { NbAuthService } from '@nebular/auth/services/auth.service';
import { NbAuthResult } from '@nebular/auth/services/auth-result';
import { NbAuthSimpleToken } from '@nebular/auth/services';
import { OperationsService } from '../../@core/data/operations.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NormalModalComponent } from './../../@theme/components/normal-modal/normal-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'nb-login',
  styleUrls: ['../auth.component.scss', './login.component.scss'],
  templateUrl: './login.component.html'
})
export class NgxLoginComponent implements OnDestroy {

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {
    username: '',
    password: ''
  };
  submitted: boolean = false;
  socialLinks: NbAuthSocialLink[] = [];
  subscriptionUser: Subscription;
  subscriptionShop: Subscription;
  constructor(protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected router: Router,
    private operationsService: OperationsService,
    private authService: NbAuthService,
    private loginSpinner: NgxSpinnerService,
    private modalService: NgbModal, ) {
    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.strategy = this.getConfigValue('forms.login.strategy');
    this.socialLinks = this.getConfigValue('forms.login.socialLinks');
  }

  login(): void {
    this.loginSpinner.show();
    this.errors = this.messages = [];
    this.submitted = true;
    this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      // console.log(result)
      this.submitted = false;
      if (result.isSuccess()) {
        this.messages = result.getMessages();
        this.authService.onTokenChange().subscribe(
          (token: NbAuthSimpleToken) => {
            // this.operationsService.setHttpHeader(token);
          }
        )
        // this.subscriptionUser = this.operationsService.userInfoGet().subscribe()
         

      } else {
        this.loginSpinner.hide();
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
      setTimeout(() => {
        this.loginSpinner.hide();
      }, this.redirectDelay + 600);
    });
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


  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
