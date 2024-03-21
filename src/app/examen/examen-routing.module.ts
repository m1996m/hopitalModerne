import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExamenIndexComponent} from "./examen-index/examen-index.component";
import {MesExamenComponent} from "./mes-examen/mes-examen.component";
import {ExamenEditeComponent} from "./examen-edite/examen-edite.component";
import {ExamenShowComponent} from "./examen-show/examen-show.component";
import {ExamenCreateComponent} from "./examen-create/examen-create.component";

const routes: Routes = [
  {path:'', component:ExamenIndexComponent},
  {path:'create', component:ExamenCreateComponent},
  {path:'detail/:id', component:ExamenShowComponent},
  {path:'edite/:id', component:ExamenEditeComponent},
  {path:'mesexamen', component:MesExamenComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamenRoutingModule { }
