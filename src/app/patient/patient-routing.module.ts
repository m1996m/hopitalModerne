import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PatientIndexComponent} from "./patient-index/patient-index.component";
import {PatientCreateComponent} from "./patient-create/patient-create.component";
import {PatientShowComponent} from "./patient-show/patient-show.component";
import {PatientEditeComponent} from "./patient-edite/patient-edite.component";

const routes: Routes = [
  {path:'',component:PatientIndexComponent},
  {path:'create',component:PatientCreateComponent},
  {path:'detail/:id',component:PatientShowComponent},
  {path:'edite/:id',component:PatientEditeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
