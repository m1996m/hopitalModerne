import { Component } from '@angular/core';
import {HopitalService} from "../../shared/services/web-services/hopital/hopital.service";
import {FormBuilder} from "@angular/forms";
import {ServiceService} from "../../shared/services/web-services/service/service.service";
import {ExamenService} from "../../shared/services/web-services/examen/examen.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConnexionService} from "../../shared/services/authService/connextion/connexion.service";
import {PatientService} from "../../shared/services/web-services/patient/patient.service";
import {PersonnelService} from "../../shared/services/web-services/personnel/personnel.service";
import {OrdonnanceService} from "../../shared/services/web-services/ordonnance/ordonnance.service";

@Component({
  selector: 'app-ordonnance-show',
  templateUrl: './ordonnance-show.component.html',
  styleUrls: ['./ordonnance-show.component.css']
})
export class OrdonnanceShowComponent {
  onePersonnel:any;
  hopital:any;
  slugHopital='';
  rdvs:any;
  slugPersonnel:any;
  slugSelect:any;
  onePatient:any;
  patients:any;
  dateJour:any;
  id_slug:any;
  ordonnance: any;

  constructor(private hopitalServie:HopitalService, private fb: FormBuilder,private activiteService: ServiceService,
              private ordonnanceService: OrdonnanceService, private route: Router, private connexionService: ConnexionService,
              private patientService: PatientService, private activateRoute: ActivatedRoute, private personnelService: PersonnelService,
  ) {
  }

  ngOnInit():void{
    this.id_slug = this.activateRoute.snapshot.params['id'];
    this.chargeFonction();
  }

  chargeFonction(){
    this.getSlug();
    this.getOneExamen();
  }

  getSlug(){
    this.connexionService.getUser();
    if(this.connexionService?.userInfo?.hopital?.length>0 || this.connexionService?.userInfo?.personnel?.length>0){
      if(this.connexionService.userInfo.role=="USER_HOPITAL"){
        this.slugHopital =this.connexionService?.userInfo?.hopital[0].slug;
      }else{
        if(this.connexionService.userInfo.role=="USER_PERSONNEL"){
          this.slugHopital = this.connexionService.userInfo.personnel[0].hopital;
        }
      }
    }

    if(this.connexionService?.userInfo?.personnel?.length>0){
      if(this.connexionService.userInfo.role=="USER_HOPITAL"){
        this.slugPersonnel = this.connexionService?.userInfo?.personnel[0].slug;
      }else{
        if(this.connexionService.userInfo.role=="USER_PERSONNEL"){
          this.slugPersonnel = this.connexionService.userInfo.personnel[0].slug;
        }
      }
    }
    if (this.connexionService.userInfo.role=="USER_PERSONNEL"){
      this.slugSelect= this.slugPersonnel;
    }else if(this.connexionService.userInfo.role=="USER_PATIENT"){
      this.slugSelect = this.slugPersonnel = this.connexionService.userInfo.patient[0].slug;
    }
  }

  getOneExamen(){
    this.ordonnanceService.getOneordonnance(this.id_slug).subscribe((data:any)=>{
      this.ordonnance = data;
      console.log(data.patient_id)
      this.getOnePatient(data.patient_id);
      this.getOnePersonnel(data.personnel_id);
    })
  }

  printPage(): void {
    this.ordonnanceService.setPrintStatus(true);
    setTimeout(() => {
      window.print();
      this.ordonnanceService.setPrintStatus(false);
    }, 100); // Utilisez un délai (100ms) pour que la mise à jour de la variable ait lieu avant l'impression.
  }

  getOnePatient(data:any){
    this.patientService.getOnepatient(data).subscribe((data:any)=>{
      this.onePatient= data;
      console.log(data);
    });
  }

  getOnePersonnel(data:any){
    this.personnelService.getOnepersonnel(data).subscribe((data:any)=>{
      this.onePersonnel= data;
      this.getOneHopital(data?.hopital);
    });
  }

  getOneHopital(form:any){
    this.hopitalServie.getOneHopital(form).subscribe((data:any)=>{
      this.hopital= data;
    });
  }
}
