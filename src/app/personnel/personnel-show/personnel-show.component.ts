import { Component } from '@angular/core';
import {HopitalService} from "../../shared/services/web-services/hopital/hopital.service";
import {FormBuilder} from "@angular/forms";
import {ServiceService} from "../../shared/services/web-services/service/service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../shared/services/web-services/user/user.service";
import {ProfileService} from "../../shared/services/web-services/profile/profile.service";
import {PersonnelService} from "../../shared/services/web-services/personnel/personnel.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {ConnexionService} from "../../shared/services/authService/connextion/connexion.service";
import {PersonnelEntity} from "../../core/entities/personnel.entity";
import {HopitalEntity} from "../../core/entities/hopital.entity";
import {UserEntity} from "../../core/entities/user.entity";
import {data} from "jquery";

@Component({
  selector: 'app-personnel-show',
  templateUrl: './personnel-show.component.html',
  styleUrls: ['./personnel-show.component.css']
})
export class PersonnelShowComponent {

  personnel!: PersonnelEntity;
  hopitals!: HopitalEntity;
  slug = '';
  user!: UserEntity;
  current = 0;
  index = 'First-content';
  id: string = '';
  isInfo = false;
  iscontact = false;
  isProf = false;
  isDesc = false;
  slugHopital = '';
  oneService: any;
  oneProfile: any;

  constructor(
     private hopitalServie:HopitalService,
     private fb: FormBuilder,
     private activateRoute:ActivatedRoute,
     private userService:UserService,
     private route: Router,
     private profileService:ProfileService,
     private personnelService:PersonnelService,
     private modal: NzModalService,
     public connexionService:ConnexionService,
     private serviceService: ServiceService
  ) {
  }

  ngOnInit(): void {
    this.getData();
    this.id= this.activateRoute.snapshot.params['id'];
    this.getOnePersonnel(this.id);
  }

  getData(){
    if(this.connexionService?.userInfo?.hopital?.length>0){
      if(this.connexionService.userInfo.role=="USER_HOPITAL"){
        this.slugHopital =this.connexionService?.userInfo?.hopital[0].slug;
      }else{
        if(this.connexionService.userInfo.role=="USER_PERSONNEL"){
          this.slugHopital = this.connexionService.userInfo.personnel[0].hopital;
        }
      }
    }
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
      this.hopitals =data;
    });
  }

  delete(){
    this.personnelService.delete(this.id).subscribe((data)=>{
      this.route.navigate(['/personnel']);
    });
  }

  //connfirmation modification
  showConfirm(): void {
    this.modal.confirm({
      nzTitle: '<i>Voulez-vous vraiment modifié cet hopital?</i>',
      nzOnOk: () =>{
        this.delete();
      }
    });
  }

  getOnePersonnel(id:any){
    this.personnelService.getOnepersonnel(id).subscribe((data)=>{
      this.personnel = data;
      this.getHopital();
      this.getOneService(data?.service);
      this.getOneProfile(data?.profile);
    });
  }

  getOneService(id: string){
    this.serviceService.getOneservice(id).subscribe((data)=>{
      this.oneService = data;
    })
  }

  getOneProfile(id: string){
    this.profileService.getOneprofile(id).subscribe((data)=>{
      this.oneProfile = data;
    })
  }

}
