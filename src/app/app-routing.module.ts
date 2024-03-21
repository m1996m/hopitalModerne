import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserIndexComponent} from "./user/user-index/user-index.component";

const routes: Routes = [
  //{ path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'login', loadChildren: () => import('./connexion/connexion.module').then(m => m.ConnexionModule) },
  { path: 'hopital', loadChildren: () => import('./hopital/hopital.module').then(m => m.HopitalModule) },
  { path: 'service', loadChildren: () => import('./service/service.module').then(m => m.ServiceModule) },
  { path: 'specialite', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
  { path: 'personnel', loadChildren: () => import('./personnel/personnel.module').then(m => m.PersonnelModule) },
  { path: 'patient', loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule) },
  { path: 'rendv', loadChildren: () => import('./rendv/rendv.module').then(m => m.RendvModule) },
  { path: 'connexion', loadChildren: () => import('./connexion/connexion.module').then(m => m.ConnexionModule) },
  { path: 'consultation', loadChildren: () => import('./consultation/consultation.module').then(m => m.ConsultationModule) },
  { path: 'examen', loadChildren: () => import('./examen/examen.module').then(m => m.ExamenModule) },
  { path: 'ordonnance', loadChildren: () => import('./ordonnance/ordonnance.module').then(m => m.OrdonnanceModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
