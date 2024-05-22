import { Component } from '@angular/core';
import {RdvModel} from "../../core/models/rdv.model";
import {RdvService} from "../../shared/services/web-services/rdv/rdv.service";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PersonnelService} from "../../shared/services/web-services/personnel/personnel.service";
import {ConnexionService} from "../../shared/services/authService/connextion/connexion.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {ServiceService} from "../../shared/services/web-services/service/service.service";

@Component({
  selector: 'app-mes-rdv',
  templateUrl: './mes-rdv.component.html',
  styleUrls: ['./mes-rdv.component.css']
})
export class MesRdvComponent {
  rdvs: any;
  currentStartDate= new Date();
  slugHopital:any
  personnels:any;
  dateJour:any;
  dates = new Date();
  formulaire:any;
  rdv: RdvModel= new RdvModel('','','','');
  rend = Array<{personnel_id: any,date_jour: string, plage: string, slug: string}>();
  rdvPatient = Array<{personnel_id: any,rdv_id: string, statut: string, patient_id: string}>();
  days=Array <{ jour: any,date:any } >();
  weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  appointments: any;
  debut: any;
  fin: any;
  //Validé, Annulé,
  isVisible=false;
  services:any;
  slugPersonnel:any;
  styles = {
    height: '300px', // Exemple : définir la hauteur
    padding: '20px' // Exemple : définir le padding
  };
  slugSelect ='';
  slugPatient = '';

  constructor(private rdvService: RdvService, private fb: FormBuilder, private router:Router, private personnelService: PersonnelService,
              private connexionService:ConnexionService, private modal: NzModalService, private activiteService:ServiceService,
              private activateRoute: ActivatedRoute,
  ) {
  }

  ngOnInit():void{
    this.chargeDateFormate();
  }

  getService(){
    this.activiteService.getAllservice({"content":this.slugHopital}).subscribe((data:any)=>{
      this.services = data;
    });
  }

  getData(){
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
    if(this.connexionService.userInfo.role=="USER_PATIENT"){
      this.slugPatient = this.connexionService.userInfo?.patient[0]?.slug;
    }
  }

  recherchePersonnel(form: any){
    this.personnelService.recherche(form).subscribe((data:any)=>{
      this.personnels = data;
    });
  }

  chargeDateFormate(){
    this.getData();
    this.generateWeekDays();
    this.getPersonnel({'content':this.slugHopital});
    this.getService();
    this.getRendezvous(this.slugSelect);
    this.dateJour = this.currentStartDate.toLocaleString().substring(6,10)+'-'+this.currentStartDate.toLocaleString().substring(3,5)+'-'+this.currentStartDate.toLocaleString().substring(0,2);
    this.debut = this.days[0]?.date.toLocaleString().substring(6,10)+'-'+this.days[0]?.date.toLocaleString().substring(3,5)+'-'+this.days[0]?.date.toLocaleString().substring(0,2);
    this.fin = this.days[this.days.length-1]?.date.toLocaleString().substring(6,10)+'-'+this.days[this.days.length-1]?.date.toLocaleString().substring(3,5)+'-'+this.days[this.days.length-1]?.date.toLocaleString().substring(0,2);
  }

  engegister(form:any){
    this.getRendezvous(this.slugSelect);
  }

  showModal1(): void {
    this.isVisible = true;
  }
  handleCancel(): void {
    this.isVisible = false;
  }

  getPersonnel(form: any){
    this.personnelService.getAllpersonnel(form).subscribe((data:any)=>{
      this.personnels = data;
    });
  }
//Permet de verifier si le deuxième caractère d'une chaine est un nombre
  prependZeroIfNotNumber(str: string): string {
    // Vérifie si le premier caractère n'est pas un chiffre
    if (!str.charAt(1).match(/[0-9]/)) {
      return '0' + str;
    }
    return str;
  }

  getRendezvous(form: any){
    this.rdvService.rdvPatient(form).subscribe((data)=>{
      this.rdvs = data;
    });
  }

  delete(id:any){
    this.rdvService.deletePatientRdv(id).subscribe((data)=>{
      this.getRendezvous(this.slugSelect);
    });
  }

  updateRdvPatient(form: any,id:any){
    this.rdvService.updaterRvPateint(form,id).subscribe((data:any)=>{
      this.rdvs = data;
    });
  }

  selectionRdv(data:any){
    this.rdvPatient.push({personnel_id: data.personnel_id, rdv_id: data.slug,statut: "Valide", patient_id: this.slugPersonnel});
    this.rdvService.createRdvPatient(this.rdvPatient[0]).subscribe((data)=>{});
  }

  //Confirmation suppression
  showDeleteConfirm(id:any): void {
    this.modal.confirm({
      nzTitle: "Voulez-vous vraiment annulé ce rendez-vous?",
      nzOkText: 'Oui',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>{
        this.delete(id);
      } ,
      nzCancelText: 'Non',
      nzOnCancel: () => console.log('ok')
    });
  }

  generateWeekDays(): void {
    this.days = [];
    // Trouver le dernier lundi
    const date = new Date(this.currentStartDate);
    while (date.getDay() !== 1) {  // 1 correspond à Lundi
      date.setDate(date.getDate() - 1);
    }

    // Maintenant, nous sommes sur le dernier lundi.
    // Générer les jours à partir de ce lundi
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(date);
      currentDate.setDate(currentDate.getDate() + i);
      this.days.push({ date: currentDate, jour: this.weekDays[i] });
    }
  }

}
