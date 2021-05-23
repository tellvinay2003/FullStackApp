// this module is custom and created to seggregate angular and html modules separately. the command used to create this module is
// "ng g m <modulename> --flat"  . --flat is used so that it wil not create a separate folder structure for it.

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [],
  imports: [
    // every module referenced CommonModule automatically... that's why wen we created this module, it automatically have CommonModule by default
    CommonModule,
    // import BsDropdownModule from angular framework (directive on top) and use here
     // forRoot means some services or components that it needs to initialize along with the root module
     BsDropdownModule.forRoot(),

     // Show toastr message in bottom right of the screen
     ToastrModule.forRoot({

      // positionClass:'toast-bottom-right'
       positionClass:'toast-top-right'
     })
  ],

  // exports necessary to expose these modules and to be accessed in app.modules.ts
  exports:[
    BsDropdownModule,
    ToastrModule
  ]
})
export class SharedModule { }
