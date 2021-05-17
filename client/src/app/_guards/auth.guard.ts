import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
// this contract method CanActivate can return any of these Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private toastr: ToastrService){ }

  canActivate(): Observable<boolean>{
    return this.accountService.currentUser$.pipe(
      map(user => {
        if(user) {return true;}
        else
        this.toastr.error('You shall not pass !');
        return false;
      })
    )

  }

}
