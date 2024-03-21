import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrdonnanceIndexComponent} from "./ordonnance-index/ordonnance-index.component";
import {OrdonnanceCreateComponent} from "./ordonnance-create/ordonnance-create.component";
import {OrdonnanceEditeComponent} from "./ordonnance-edite/ordonnance-edite.component";
import {OrdonnanceShowComponent} from "./ordonnance-show/ordonnance-show.component";

const routes: Routes = [
  {path: '',component: OrdonnanceIndexComponent},
  {path: 'create',component: OrdonnanceCreateComponent},
  {path: 'edite/:id',component: OrdonnanceEditeComponent},
  {path: 'show/:id',component: OrdonnanceShowComponent},
  //{path: '',component: OrdonnanceIndexComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdonnanceRoutingModule { }
