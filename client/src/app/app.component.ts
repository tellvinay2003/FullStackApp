import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


// @component are decorators in angular and Attributes in C# ie; DataAnnotations. These are the actors which bind components with html
@Component({

  // This selector defines where to load your html
  selector: 'app-root',

  // This component is bind with app.component.html. templateUrl binds the component with declared html
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

// we use export before class if we want it to be exported and mentioned/ grouped in Module
// export class AppComponent {
//   title = 'The FullStackApp';

//   constructor(private http: HttpClient) {

//   }
// }

export class AppComponent implements OnInit {
  title = 'The FullStackApp';

  // to deactivate Type safety
  users: any;

 constructor(private http: HttpClient){}

 // OnInit called after Constructor. We have removed default "void" return type here
  ngOnInit() {
    // to access any class property, we have to use this keyword
    this.getUsers();
  }


  getUsers(){
    // to access any class property, we have to use this keyword
    this.http.get('https://localhost:5001/api/users')
    .subscribe(response => {
                  this.users = response;
                            },
                error => {
                  console.log(error);
            })
  }
  }


