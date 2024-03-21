import { Component } from '@angular/core';
import {HopitalService} from "../../shared/services/web-services/hopital/hopital.service";
import {FormBuilder} from "@angular/forms";
import {ServiceService} from "../../shared/services/web-services/service/service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../shared/services/web-services/user/user.service";
import {ProfileService} from "../../shared/services/web-services/profile/profile.service";
import {PersonnelService} from "../../shared/services/web-services/personnel/personnel.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {PatientService} from "../../shared/services/web-services/patient/patient.service";
import {ConnexionService} from "../../shared/services/authService/connextion/connexion.service";
import {PatientEntity} from "../../core/entities/patient.entity";
import {UserEntity} from "../../core/entities/user.entity";
import {PersonnelEntity} from "../../core/entities/personnel.entity";
import {HopitalEntity} from "../../core/entities/hopital.entity";

@Component({
  selector: 'app-patient-show',
  templateUrl: './patient-show.component.html',
  styleUrls: ['./patient-show.component.css']
})
export class PatientShowComponent {
  patient!: PatientEntity;
  slug = '';
  user!: UserEntity;
  current = 0;
  index = 'First-content';
  id: string = '';
  isInfo = false;
  iscontact = false;
  isProf = false;
  isDesc = false;
  personnel!: PersonnelEntity;
  hopitals!: HopitalEntity;
  slugHopital='';
  slugPersonnel='';

  constructor(private hopitalServie:HopitalService, private fb: FormBuilder,private activiteService: ServiceService, private activateRoute:ActivatedRoute,private patientService: PatientService,
    private userService:UserService, private route: Router, private profileService:ProfileService,private personnelService:PersonnelService,private modal: NzModalService,public connexionService: ConnexionService
  ) {
  }

  ngOnInit(): void {
    if(this.connexionService?.userInfo?.hopital?.length>0){
      if(this.connexionService.userInfo.role=="USER_HOPITAL"){
        this.slugHopital =this.connexionService?.userInfo?.hopital[0].slug;
      }else{
        if(this.connexionService.userInfo.role=="USER_PERSONNEL"){
          this.slugHopital = this.connexionService.userInfo.personnel[0].hopital;
        }
      }
    }

    if(this.connexionService?.userInfo?.personnel?.length>0){
      if(this.connexionService.userInfo.role == "USER_HOPITAL"){
        this.slugPersonnel = this.connexionService?.userInfo?.personnel[0].slug;
      }else{
        if(this.connexionService.userInfo.role == "USER_PERSONNEL"){
          this.slugPersonnel = this.connexionService.userInfo.personnel[0].slug;
        }
      }
    }
    this.id = this.activateRoute.snapshot.params['id'];
    this.getOnePatient(this.id);
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

  getHopital(){
    this.hopitalServie.getOneHopital(this.personnel?.hopital).subscribe((data)=>{
      this.hopitals = data;
    });
  }

  delete(){
    this.patientService.delete(this.id).subscribe((data:any)=>{
      this.route.navigate(['/patient']);
    });
  }

  //connfirmation modification
  showConfirm(): void {
    this.modal.confirm({
      nzTitle: '<i>Voulez-vous vraiment modifié ce patient?</i>',
      nzOnOk: () =>{
        this.delete();
      }
    });
  }

  getOnePersonnel(id:any){
    this.personnelService.getOnepersonnel(id).subscribe((data)=>{
      this.personnel = data;
      this.getHopital();
    });
  }

  getOnePatient(id:any){
    this.patientService.getOnepatient(id).subscribe((data)=>{
      this.patient = data;
      this.getOnePersonnel(this.patient?.personnel);
    });
  }
}
