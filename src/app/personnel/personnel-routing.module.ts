import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PersonnelCreateComponent} from "./personnel-create/personnel-create.component";
import {PersonnelIndexComponent} from "./personnel-index/personnel-index.component";
import {PersonnelEditeComponent} from "./personnel-edite/personnel-edite.component";
import {PersonnelShowComponent} from "./personnel-show/personnel-show.component";

const routes: Routes = [
  {path:'create',component:PersonnelCreateComponent},
  {path:'',component:PersonnelIndexComponent},
  {path:'edite/:id',component:PersonnelEditeComponent},
  {path:'detail/:id',component:PersonnelShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonnelRoutingModule { }
