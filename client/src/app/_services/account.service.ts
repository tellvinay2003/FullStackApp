import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// RxJS library for subscribing observables
import {map} from 'rxjs/operators';
import { User } from '../_models/user';

import {ReplaySubject} from 'rxjs';

// when on CLI we invoke command ng g s <account>. A new service named as AccountService gets created.
// the Decorator named "Injectable" .. this means this services can be injected into other components or services in our application

// NOTE:
// Angular services are Singleton. When we inject it into a component, and initialize it, it'll stay initialized until our app is disposed off.
// or the user closes the browser of app instance
// it the user stays in application, the angular service (AccountService in this case) initiated through the life time the application is around

@Injectable({
  // this decorator has metadata named "providedIn". In our appModule we have an array named "providers" which will contain it's reference
  // In previous versions of Angular the decorator was used to be registered in app.modules under providers: [],
  // While newer in versions it's declared here:
  providedIn: 'root'
})
// this service is created to make request to our API
export class AccountService {
baseUrl = "https://localhost:5001/api/" ;


// Create an observable to store our use in

// ReplaySubject: A variant of Subject that "replays" or emits old values to new subscribers.
// It buffers a set number of values and will emit those values immediately to any new subscribers in addition to emitting new values to existing subscribers
// ReplaySubject<User>(n) : means store n values ie; size of the buffer

 private currentUserSource =  new ReplaySubject<User>(1);

// just make it nullable by adding | operator with null in generic type
//// private currentUserSource = new ReplaySubject<User| null>(1);

// declare an observable - by convention the observable variable is suffixed with $ sign
currentUser$ = this.currentUserSource.asObservable();


 // inject http client in account service
  constructor(private http: HttpClient) { }

  // create a login method. this login method is gonna receive our credentials  from the login form.
  // for now we just call it model and give a type of 'any' for time being.
  // since it's a Post request. The post is expecting us to provide a body in request.
  // In our case we'll send our model (which will contain username and password)
  login(model:any){
    // return this.http.post(this.baseUrl + 'account/login', model);
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response:User) => {
        const user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      } )
    )
  }


  // inside this method we tried to map user as object and not provided as strong type as 'user: User'
  // that's why while working on that data we need to type cast it : user as User at line 72.
  // The correct way is map(user: User => {})...... as line 70

  // register(model:any){
  //   return this.http.post(this.baseUrl + 'account/register', model).pipe(
  //     map(user => {
  //       if(user){
  //         localStorage.setItem('user', JSON.stringify(user));
  //         this.currentUserSource.next(user as User);
  //       }
  //       return user;
  //     })
  //   )
  // }


  // The correct way is
  register(model:any){
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map((user:User) => {
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
    )
  }

  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    // this.currentUserSource.next();
  }

}

// So
// 1. Services are injectable
// 2. Services are Singleton. Service doesn't get destroyed until our app gets closed down
// Where as Components are different. They are destroyed if not in use.
