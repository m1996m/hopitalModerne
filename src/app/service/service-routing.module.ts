import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ServiceIndexComponent} from "./service-index/service-index.component";

const routes: Routes = [
  {path:'',component:ServiceIndexComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }
