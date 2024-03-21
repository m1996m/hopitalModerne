import { Component } from '@angular/core';
import {PatientModel} from "../../core/models/patient.model";
import {HopitalService} from "../../shared/services/web-services/hopital/hopital.service";
import {FormBuilder} from "@angular/forms";
import {ServiceService} from "../../shared/services/web-services/service/service.service";
import {PatientService} from "../../shared/services/web-services/patient/patient.service";
import {UserService} from "../../shared/services/web-services/user/user.service";
import {Router} from "@angular/router";
import {ProfileService} from "../../shared/services/web-services/profile/profile.service";
import {PersonnelService} from "../../shared/services/web-services/personnel/personnel.service";
import {ConnexionService} from "../../shared/services/authService/connextion/connexion.service";

@Component({
  selector: 'app-proiler',
  templateUrl: './proiler.component.html',
  styleUrls: ['./proiler.component.css']
})
export class ProilerComponent {
  hopital:any;
  slug='';
  user:any;
  services:any;
  profiles:any;
  current = 0;
  index = 'First-content';
  data:any;
  pers:any;
  prof: any;
  hospi: any;
  personnels:any;
  slugHopital='';
  slugPersonnel='';
  onePatient:any;
  role= "";
  isInfo =false;
  iscontact=false;
  isProf=false;
  isDesc =false;

  constructor(private hopitalServie:HopitalService, private fb: FormBuilder,private activiteService: ServiceService, private patientService: PatientService,
    private userService:UserService, private route: Router, private profileService:ProfileService,private personnelService:PersonnelService,public connexionService: ConnexionService
  ) {
  }

  ngOnInit(): void {
    this.connexionService.getUser();
    this.role= this.connexionService.userInfo.role;
    if(this.role=="USER_PATIENT"){
      this.user = this.connexionService.userInfo.patient[0];
    }else if(this.role=="USER_PERSONNEL"){
      this.user = this.connexionService.userInfo.personnel[0];
    }
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
    this.getOneHopital();
  }

  getOneHopital(){
    this.hopitalServie.getOneHopital(this.slugHopital).subscribe((data:any)=>{
      this.hopital= data;
    });
  }

  info(){
    if (this.isInfo){
      this.isInfo = false;
    }else{
      this.isInfo = true;
    }
  }

  desc(){
    if (this.isDesc){
      this.isDesc = false;
    }else{
      this.isDesc = true;
    }
  }

  proff(){
    if (this.isProf){
      this.isProf = false;
    }else{
      this.isProf = true;
    }
  }
  contact(){
    if (this.iscontact){
      this.iscontact = false;
    }else{
      this.iscontact = true;
    }
  }
}
