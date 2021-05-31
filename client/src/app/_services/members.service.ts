import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../_models/member';
import { environment } from 'src/environments/environment';

// var dataItem = localStorage.getItem('user')
// const httpOptions = {
//   headers: new HttpHeaders({
//     Authorization: 'Bearer ' + JSON.parse(dataItem == null? "": dataItem ).token
//   })
// }

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  // baseUrl :  environment.apiUrl
  baseUrl = "https://localhost:5001/api/"

  constructor(private http: HttpClient) { }

  getMembers(){
    return this.http.get<Member[]>(this.baseUrl + 'users'); //, httpOptions);
  }

  getMember(username:string){
    return this.http.get<Member>(this.baseUrl+'users/' + username); //, httpOptions);
  }


}
