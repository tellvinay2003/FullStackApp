import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {HttpClientModule} from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';

// import all custom components here
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// decorator for Module is @NgModule
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    //This module is imported from @angular/common/http
    HttpClientModule,
     NgbModule,
     BrowserAnimationsModule
  ],
  providers: [],

  // startup component is mentioned here
  bootstrap: [AppComponent]
})
export class AppModule { }
