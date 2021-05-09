import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {HttpClientModule} from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';

// for drop down we created for options on NavBar
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


// import all custom components here
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Automatically created reference when "ng g c <nav>" command executed
import { NavComponent } from './nav/nav.component';

// For FormsModule
import {FormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

// decorator for Module is @NgModule
// This is the Root module
@NgModule({
  declarations: [
    AppComponent,

    // newly created component using ng g c <componentName>  --skip-tests (skipping to create test files).
    // This command automatically adds "Component" suffix with <componentName>
    NavComponent,
     HomeComponent,
     RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    //This module is imported from @angular/common/http
    HttpClientModule,
     NgbModule,
     BrowserAnimationsModule,

     // Newly added module from Angular Framework
     FormsModule,

     // import BsDropdownModule from angular framework (directive on top) and use here
     // forRoot means some services or components that it needs to initialize along with the root module
     BsDropdownModule.forRoot()
  ],

  //In previous versions of Angular the decorator was used to be registered in app.modules under providers: [],
  // While newer in versions it's declared in corresponding service as @Injectable({providedIn: 'root'})
  providers: [],

  // startup component is mentioned here
  bootstrap: [AppComponent]
})
export class AppModule { }
