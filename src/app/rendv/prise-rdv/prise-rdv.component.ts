import { Component } from '@angular/core';
import {RdvService} from "../../shared/services/web-services/rdv/rdv.service";
import {FormBuilder, NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {PersonnelService} from "../../shared/services/web-services/personnel/personnel.service";
import {ConnexionService} from "../../shared/services/authService/connextion/connexion.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {RdvModel} from "../../core/models/rdv.model";
import {ServiceService} from "../../shared/services/web-services/service/service.service";
import {HopitalService} from "../../shared/services/web-services/hopital/hopital.service";
import {HopitalReponseDto} from "../../shared/services/web-services/hopital/dto/hopital-reponse.dto";

@Component({
  selector: 'app-prise-rdv',
  templateUrl: './prise-rdv.component.html',
  styleUrls: ['./prise-rdv.component.css']
})
export class PriseRdvComponent {
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
  appointments:any;
  debut: any;
  fin:any
  //Valide, Annulé,
  slug_personnel='';
  isVisible=false;
  services:any;
  slugPersonnel:any;
  styles = {
    height: '300px', // Exemple : définir la hauteur
    padding: '20px' // Exemple : définir le padding
  };
  slugPatient: any;
  hopitals: HopitalReponseDto = [];

  constructor(
    private rdvService: RdvService,
    private fb: FormBuilder,
    private router: Router,
    private personnelService: PersonnelService,
    private connexionService: ConnexionService,
    private modal: NzModalService,
    private activiteService: ServiceService,
    private hopitalServie: HopitalService
  ) {
  }

  ngOnInit():void{
    this.getData();
    this.initForm();
    this.generateWeekDays();
    this.dateJour = this.currentStartDate.toLocaleString().substring(6,10)+'-'+this.currentStartDate.toLocaleString().substring(3,5)+'-02';
    this.debut = this.days[0]?.date.toLocaleString().substring(6,10)+'-'+this.days[0]?.date.toLocaleString().substring(3,5)+'-'+this.days[0]?.date.toLocaleString().substring(0,2);
    this.fin = this.days[this.days.length-1]?.date.toLocaleString().substring(6,10)+'-'+this.days[this.days.length-1]?.date.toLocaleString().substring(3,5)+'-'+this.days[this.days.length-1]?.date.toLocaleString().substring(0,2);
    this.getPersonnel({'content':this.slugHopital});
    this.getRendezvous({'debut':this.debut,'fin':this.fin, 'personnel_id': this.slugPersonnel});
    this.getHopital();
    this.getService();
  }

  initForm(){
    this.formulaire = this.fb.group({
      personnel: [''],
      service: [''],
      hopital: [''],
    });
  }

  getHopital(){
    this.hopitalServie.recherche({"content":this.connexionService.userInfo?.pays}).subscribe((data)=>{
      this.hopitals =data;
    });
  }

  getData(){
    if(this.connexionService?.userInfo?.hopital?.length>0 || this.connexionService?.userInfo?.personnel?.length>0){
      if(this.connexionService.userInfo.role=="USER_HOPITAL"){
        this.slugHopital =this.connexionService?.userInfo?.hopital[0]?.slug;
      }else{
        if(this.connexionService.userInfo.role=="USER_PERSONNEL"){
          this.slugHopital = this.connexionService.userInfo?.personnel[0]?.hopital;
        }
      }
    }

    if(this.connexionService?.userInfo?.personnel?.length>0){
      if(this.connexionService.userInfo.role=="USER_HOPITAL"){
        this.slugPersonnel = this.connexionService?.userInfo?.personnel[0]?.slug;
      }else{
        if(this.connexionService.userInfo.role=="USER_PERSONNEL"){
          this.slugPersonnel = this.connexionService.userInfo?.personnel[0]?.slug;
        }
      }
    }
    if(this.connexionService.userInfo.role=="USER_PATIENT"){
      this.slugPatient = this.connexionService.userInfo?.patient[0]?.slug;
    }
  }

  getService(){
    this.activiteService.getAllservice({"content": this.formulaire.value['hopital']}).subscribe((data)=>{
      this.services = data;
    });
  }

  recherchePersonnel(){
    this.personnelService.findAllByService(this.formulaire.value['service']).subscribe((data:any)=>{
      this.personnels = data;
    });
  }

  engegister(){
    this.getRendezvous({'debut':this.debut, 'fin':this.fin, 'personnel_id': this.formulaire.value['personnel']});
  }

  showModal1(): void {
    this.isVisible = true;
  }
  handleCancel(): void {
    this.isVisible = false;
  }

  verificationValue(){
    if (this.formulaire.value['hopital'].length > 3 && this.formulaire.value['personnel'].length > 3 && this.formulaire.value['service'].length > 3){
      this.isVisible = false;
    }
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
    this.rdvService.getAllrdv(form).subscribe((data:any)=>{
      this.rdvs = data;
    });
  }

  updateRdvPatient(form: any,id:any){
    this.rdvService.updaterRvPateint(form,id).subscribe((data:any)=>{
      this.rdvs = data;
    });
  }

  selectionRdv(data:any){
    this.rdvPatient.push({personnel_id: data.personnel_id, rdv_id: data.slug, statut:"Validé", patient_id: this.slugPatient});
    this.rdvService.createRdvPatient(this.rdvPatient[0]).subscribe((data)=>{
      this.router.navigate(['/rendv/mesRdv']);
    });
  }
  //Confirmation suppression
  showDeleteConfirm(data:any): void {
    this.modal.confirm({
      nzTitle: "Voulez-vous vraiment prendre ce rendez-vous?",
      nzOkText: 'Oui',
      nzOkType: 'primary',
      nzOkDanger: false,
      nzOnOk: () =>{
        this.selectionRdv(data);
      } ,
      nzCancelText: 'Non',
      nzOnCancel: () => console.log('ok')
    });
  }
//Generation des remplissages par colonne
  getRendezvousForDay(date: Date, data: any[]): any[] {
    return data?.filter((rdv: any) =>
      this.isSameDay(new Date(rdv.date_jour), date))
      .sort((a: any, b: any) => {
        // Convertir chaque heure en minutes pour faciliter la comparaison
        const minutesA = this.convertHourToMinutes(a.plage);
        const minutesB = this.convertHourToMinutes(b.plage);
        return minutesA - minutesB;  // Tri par ordre croissant
      });
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();
  }

  convertHourToMinutes(heure: string): number {
    const parts = heure.split('h');
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
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

  nextWeek(): void {
    this.currentStartDate.setDate(this.currentStartDate.getDate() + 7);
    this.generateWeekDays();
    this.debut = this.days[0]?.date.toLocaleString().substring(6,10)+'-'+this.days[0]?.date.toLocaleString().substring(3,5)+'-'+this.days[0]?.date.toLocaleString().substring(0,2);
    this.fin = this.days[this.days.length-1]?.date.toLocaleString().substring(6,10)+'-'+this.days[this.days.length-1]?.date.toLocaleString().substring(3,5)+'-'+this.days[this.days.length-1]?.date.toLocaleString().substring(0,2);
    this.getRendezvous({'debut':this.debut,'fin':this.fin, 'personnel_id': this.formulaire.value['personnel']});
  }

  previousWeek(): void {
    this.currentStartDate.setDate(this.currentStartDate.getDate() - 7);
    this.generateWeekDays();
    this.debut = this.days[0]?.date.toLocaleString().substring(6,10)+'-'+this.days[0]?.date.toLocaleString().substring(3,5)+'-'+this.days[0]?.date.toLocaleString().substring(0,2);
    this.fin = this.days[this.days.length-1]?.date.toLocaleString().substring(6,10)+'-'+this.days[this.days.length-1]?.date.toLocaleString().substring(3,5)+'-'+this.days[this.days.length-1]?.date.toLocaleString().substring(0,2);
    this.getRendezvous({'debut':this.debut,'fin':this.fin, 'personnel_id': this.formulaire.value['personnel']});
  }
}
