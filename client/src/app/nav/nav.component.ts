import { Component, OnInit } from '@angular/core';

// reference of Account service from _services automatically when we inject the service inside CTor
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  // create a class property to store what user enters in the form
  // We'll not worry of type script, we'll give it any and initialize it

  model: any = {}
 currentUser$ = new Observable<User>();


  // we'll inject our Account service inside this component through CTor
  constructor(public  accountService : AccountService) { }

  ngOnInit(): void {
    // Get the current user from account service
   this.currentUser$ =  this.accountService.currentUser$
  }

  login(){
    // console.log(this.model);

    // Access injected account service's login method here. Since login method here returns Observable<Object>,
    // we need to simplify it by using subscribe as
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
    },
    // Error handling
    error =>{
      console.log(error);
    });
  }


  logout(){
    this.accountService.logout();
  }

}


// RxJS- not part of Angular but plugins which work with observables
