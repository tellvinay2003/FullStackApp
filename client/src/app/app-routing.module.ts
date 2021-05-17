import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import {ListsComponent} from './lists/lists.component';
import {MessagesComponent} from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';


const routes: Routes = [
  // path:'' means default.. so if someone tries to hit app with localhost:4200... without specific component name.. it'll be directed to HomeComponent
  {path: '', component: HomeComponent},

  // Add route guard with member component. Specify 'CanActivate' property and pass array of AuthGuard objects
  {path: 'members', component: MemberListComponent, canActivate:[AuthGuard]},
  {path: 'members/:id', component: MemberDetailComponent, canActivate:[AuthGuard]},
  {path: 'lists', component: ListsComponent, canActivate:[AuthGuard]},
  {path: 'messages', component: MessagesComponent, canActivate:[AuthGuard]},

  // wildcard route: user types something which doesn't match with any of the component in application, we'll redirect to the HomeComponent
  // and we specify an extra attribute and we say 'pathMatch'
  {path: '**', component: HomeComponent, pathMatch:'full' }
];

// this decorator @NgModule on class AppRoutingModule is just like Attributes on class in C-Sharp
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
