import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RendvCreateComponent} from "./rendv-create/rendv-create.component";
import {RendvIndexComponent} from "./rendv-index/rendv-index.component";
import {PriseRdvComponent} from "./prise-rdv/prise-rdv.component";
import {MesRdvComponent} from "./mes-rdv/mes-rdv.component";
import {RendvShowComponent} from "./rendv-show/rendv-show.component";
import {DetailComponent} from "./detail/detail.component";

const routes: Routes = [
  {path:'create',component:RendvCreateComponent},
  {path:'',component:RendvIndexComponent},
  {path:'priseRdv',component:PriseRdvComponent},
  {path:'mesRdv',component:MesRdvComponent},
  {path:'show/:id',component:RendvShowComponent},
  {path:'detail/:id',component:DetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RendvRoutingModule { }
