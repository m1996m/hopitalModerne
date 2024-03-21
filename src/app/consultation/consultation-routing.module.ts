import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConsultationIndexComponent} from "./consultation-index/consultation-index.component";
import {ConsultationCreateComponent} from "./consultation-create/consultation-create.component";
import {ConsultationEditeComponent} from "./consultation-edite/consultation-edite.component";
import {ConsultationShowComponent} from "./consultation-show/consultation-show.component";

const routes: Routes = [
  {path: '', component: ConsultationIndexComponent},
  {path: 'create', component: ConsultationCreateComponent},
  {path: 'edite/:id', component: ConsultationEditeComponent},
  {path: 'detail/:id', component: ConsultationShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultationRoutingModule { }
