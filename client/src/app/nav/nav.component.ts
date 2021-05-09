import { Component, OnInit } from '@angular/core';

// reference of Account service from _services automatically when we inject the service inside CTor
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { Observable } from 'rxjs/internal/Observable';

// for routing specific pages
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  // we'll inject router and as per the option clicked, the request will be redirected to corresponding page
  // for eg after successful login it should be redirected to member page so '/members' will be set as route

  // we'll inject Toast service into this component
  constructor(public  accountService : AccountService, private router : Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    // Get the current user from account service
   this.currentUser$ =  this.accountService.currentUser$
  }

  login(){
    // console.log(this.model);

    // Access injected account service's login method here. Since login method here returns Observable<Object>,
    // we need to simplify it by using subscribe as
    // after successful login, it should be routed to members page
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl('/members');
    },
    // Error handling
    error =>{
      console.log(error);
      this.toastr.error(error.error);
    });
  }


  logout(){
    this.accountService.logout();

    // after successful logout we should redirect to home page
    this.router.navigateByUrl('/')
  }

}


// RxJS- not part of Angular but plugins which work with observables
