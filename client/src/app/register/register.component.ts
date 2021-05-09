import { AccountService } from './../_services/account.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // access data from it's parent component which is home component
  // for this we add @Input decorator
  // @Input() usersFromHomeComponent : any;


  // now providing data to it's parent component which is home component
  // we add @output decorator and we use EventEmitter
  // This output property/ decorator value is used in cancel() method here
  @Output() cancelRegister = new EventEmitter();

  model: any = {};

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }


  register(){
    // console.log(this.model);
    return this.accountService.register(this.model).subscribe(response => {
      console.log(response);
      this.cancel();
    }, error => {
      console.log(error);
    } )
  }

  cancel(){
    // console.log('Cancelled');
    this.cancelRegister.emit(false);
  }

}
