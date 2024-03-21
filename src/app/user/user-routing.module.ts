import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserIndexComponent} from "./user-index/user-index.component";
import {UserCreateComponent} from "./user-create/user-create.component";
import {ProilerComponent} from "./proiler/proiler.component";
import {UploaderComponent} from "./uploader/uploader.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {AuthGuard} from "../shared/services/authService/guards/auth.guard";

const routes: Routes = [
  { path: '',
    canActivate: [AuthGuard],
    component: UserIndexComponent
  },
  { path: 'create', component: UserCreateComponent},
  { path: 'profile/:id', component: ProilerComponent},
  { path: 'upload/:id', component: UploaderComponent},
  { path: 'change/mdp/:id', component: ChangePasswordComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
