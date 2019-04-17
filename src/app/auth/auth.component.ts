import { Subscription } from 'rxjs/Subscription';
import { OperationsService } from './../@core/data/operations.service';
import { OnInit } from '@angular/core';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

import { NbAuthService } from '@nebular/auth/services/auth.service';
import { takeWhile } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'nb-auth',
  styleUrls: ['./auth.component.scss'],
  templateUrl: './auth.component.html'
})
export class NgxAuthComponent implements OnDestroy {

  private alive = true;

  subscription: Subscription;

  authenticated: boolean = false;
  loadingPage: boolean = false;
  // showcase of how to use the onAuthenticationChange method
  constructor(protected auth: NbAuthService, protected location: Location, protected router: Router) {

    this.subscription = auth.onAuthenticationChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe((authenticated: boolean) => {
        console.log("auth component set : " + authenticated);
        this.authenticated = authenticated;
        if (authenticated) {
          this.router.navigate(['pages']);
        } else {
          this.loadingPage = true;
        }
      });
  }


  ngOnDestroy(): void {
    this.alive = false;
    this.subscription.unsubscribe();
  }
}
