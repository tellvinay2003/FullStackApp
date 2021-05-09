import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Add a property to display and hide the register form in home component html
  registerMode = false

  // users : any;

  // constructor(private http:HttpClient ) { }
  constructor() { }

  ngOnInit(): void {
    // this.getUsers();
  }



  registerToggle(){
    this.registerMode = ! this.registerMode;
  }


  // getUsers(){
  //   this.http.get("https://localhost:5001/api/users").subscribe(users => {
  //     this.users = users;
  //   })
  // }

  cancelRegisterMode(event: boolean){
    // this event parameter will be provided by register component as 'false'
    this.registerMode = event;
  }

}
