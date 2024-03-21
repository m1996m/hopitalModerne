import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HopitalIndexComponent} from "./hopital-index/hopital-index.component";
import {HopitalCreateComponent} from "./hopital-create/hopital-create.component";
import {HopitalEditComponent} from "./hopital-edit/hopital-edit.component";

const routes: Routes = [
  {path:'',component:HopitalIndexComponent},
  {path:'create',component:HopitalCreateComponent},
  {path:'edite/:id',component:HopitalEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HopitalRoutingModule { }
