import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NbAuthService } from '@nebular/auth/services/auth.service';
import { Injectable } from '@angular/core';
import { NbAuthSimpleToken } from '@nebular/auth';


import { Observable, of as observableOf, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';


export interface ShopResponse {
  shopId?: number;
  shopName?: string;
  stage?: number;
  rondinoId?: string;
  badgeId?: string;
  verificationCode?: string;
  message?: string;
  error?: string;
}
@Injectable({
  providedIn: 'root'
})

export class OperationsService {

  constructor(private http: HttpClient, private authService: NbAuthService) { }





}