import { Component } from '@angular/core';
import {RdvModel} from "../../core/models/rdv.model";
import {RdvService} from "../../shared/services/web-services/rdv/rdv.service";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PersonnelService} from "../../shared/services/web-services/personnel/personnel.service";
import {ConnexionService} from "../../shared/services/authService/connextion/connexion.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {ServiceService} from "../../shared/services/web-services/service/service.service";
import {PatientService} from "../../shared/services/web-services/patient/patient.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

  rdvs: any;
  currentStartDate= new Date();
  slugHopital:any
  patient:any;
  dateJour:any;
  dates = new Date();
  formulaire:any;
  rdv: RdvModel= new RdvModel('','','','');
  rend = Array<{personnel_id: any,date_jour: string, plage: string, slug: string}>();
  rdvPatient = Array<{personnel_id: any,rdv_id: string, statut: string, patient_id: string}>();
  days=Array <{ jour: any,date:any } >();
  weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  appointments:any;
  debut: any;
  fin:any
  //Valide, Annulé,
  slug_personnel='';
  isVisible=false;
  services:any;
  slugPersonnel:any;
  slugSelect ='';
  id_slug ='';

  constructor(private rdvService: RdvService, private fb: FormBuilder, private router:Router, private patientervice: PatientService,
              public connexionService:ConnexionService, private modal: NzModalService, private activiteService:ServiceService,
              private activateRoute: ActivatedRoute,
  ) {
  }

  ngOnInit():void{
    this.id_slug = this.activateRoute.snapshot.params['id'];
    this.chargeDateFormate();
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
      this.slugSelect = this.connexionService.userInfo.patient[0].slug;
    }
  }

  chargeDateFormate(){
    this.getSlug();
    this.getOneRdv(this.id_slug);
  }

  getOnePatient(slug: any){
    this.patientervice.getOnepatient(slug).subscribe((data:any)=>{
      this.patient = data;
    });
  }

  getOneRdv(slug: any){
    this.rdvService.getOnerdv(slug).subscribe((data:any)=>{
      this.rdvs = data;
      this.getOnePatient(data?.patient_id);
    });
  }

  delete(slug:any){
    this.rdvService.delete(slug).subscribe((data:any)=>{});
  }

  annnulerRdv(form: any,id:any){
    this.rdvService.updaterRvPateint(form,id).subscribe((data:any)=>{
      this.rdvs = data;
    });
  }

  deplacerRdv(form: any,id:any){
    this.rdvService.updaterRvPateint(form,id).subscribe((data:any)=>{
      this.rdvs = data;
      this.router.navigate(['/rendv/priseRdv']);
    });
  }

  //Confirmation suppression
  showDeleteConfirm(slug:any): void {
    this.modal.confirm({
      nzTitle: "Voulez-vous vraiment supprimer ce rendez-vous?",
      nzOkText: 'Oui',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>{
        this.delete(slug);
      } ,
      nzCancelText: 'Non',
      nzOnCancel: () => console.log('ok')
    });
  }

  deplacer(data:any,id:any): void {
    this.modal.confirm({
      nzTitle: "Deplaçant ce rendez-vous vers une autre date, ce rendez-vous sera annulé. Voulez-vous vraiment annulé ce rendez-vous?",
      nzOkText: 'Oui',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>{
        this.deplacerRdv(data,id);
      } ,
      nzCancelText: 'Non',
      nzOnCancel: () => console.log('ok')
    });
  }


}
