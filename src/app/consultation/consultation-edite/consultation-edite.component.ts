import { Component } from '@angular/core';
import {HopitalService} from "../../shared/services/web-services/hopital/hopital.service";
import {FormBuilder} from "@angular/forms";
import {ServiceService} from "../../shared/services/web-services/service/service.service";
import {ConsultationService} from "../../shared/services/web-services/consultation/consultation.service";
import {Router} from "@angular/router";
import {ConnexionService} from "../../shared/services/authService/connextion/connexion.service";
import {PatientService} from "../../shared/services/web-services/patient/patient.service";
import {RdvService} from "../../shared/services/web-services/rdv/rdv.service";
import {ConsultationEntity} from "../../core/entities/consultation.entity";
import {RdvResponseDto} from "../../shared/services/web-services/rdv/dto/rdv-response.dto";
import {HopitalReponseDto} from "../../shared/services/web-services/hopital/dto/hopital-reponse.dto";
import {PatientResponseDto} from "../../shared/services/web-services/patient/dto/patient-response.dto";
import {PatientEntity} from "../../core/entities/patient.entity";

@Component({
  selector: 'app-consultation-edite',
  templateUrl: './consultation-edite.component.html',
  styleUrls: ['./consultation-edite.component.css']
})
export class ConsultationEditeComponent {
  formulaire:any;
  consultation: any;
  hopitals: HopitalReponseDto = [];
  slugHopital = '';
  rdvs: RdvResponseDto = [];
  slugPersonnel = '';
  slugSelect = '';
  current = 0;
  index = 'First-content';
  onePatient!: PatientEntity;
  patients: PatientResponseDto = [];
  dateJour = '';
  currentStartDate = new Date();
  plaintes='';
  allergies='';
  antecedent='';
  autre='';
  resultats='';
  examens='';
  plaintesT = Array<{data: any}>();
  allergiesT = Array<{data: any}>();
  antecedentT = Array<{data: any}>();
  autreT = Array<{data: any}>();
  resultatsT = Array<{data: any}>();
  examensT = Array<{data: any}>();
  donnees:any;
  isInput = false;
  inputValue = "";
  isResultat = false;
  id_slug = '';
  yourCustomStyles = {
    height: '500px', // Exemple : définir la hauteur
    padding: '20px' // Exemple : définir le padding
  };
  isVisible = false;
  isConclusion = true;
  isDiagnotic = true;
  isPatient = true;

  constructor(
    private hopitalServie:HopitalService,
    private fb: FormBuilder,
    private activiteService: ServiceService,
    private consultationService: ConsultationService,
    private route: Router,
    private connexionService: ConnexionService,
    private patientService: PatientService,
    private rdvService: RdvService,
  ) {
  }

  ngOnInit():void{
    this.chargeFonction();
    this.initForm();
  }

  verificationPatient(){
    this.isPatient = false;
    if (this.formulaire.value['patient_id'].length>2 && this.formulaire.value['date_visite'].length>3 &&
      this.formulaire.value['taille'].length>2 &&
      this.formulaire.value['poids'].length>0 && this.formulaire.value['rdv_id'].length>1 &&
      this.formulaire.value['situation'].length>3){
      this.isPatient = true;
    }
  }


  showModal(consultation: ConsultationEntity): void {
    this.isVisible = true;
    this.consultation = consultation;
    this.initForm();
    this.initTabListe(this.consultation);
    this.getRdv();
    this.consultationService.notifyModalState(this.isVisible);
  }

  handleCancel(): void {
    this.isVisible = false;
    this.consultationService.notifyModalState(this.isVisible);
  }

  verificationDiagnotic(){
    this.isDiagnotic = false;
    if (
      this.formulaire.value['fumeur'].length>2 && this.formulaire.value['buveur'].length>2 &&
      this.formulaire.value['cout'].length > 0
    ){
      this.isDiagnotic = true;
    }
  }

  verificationConclusion(){
    this.isConclusion = false;
    setTimeout(()=>{
      if (this.resultatsT.length > 0){
        this.isConclusion = true;
      }
    },2000)

  }

  initTabListe(data:any){
    let tab = [];
    tab = data.plainte.split(',');
    for (let i = 0; i<tab.length; i++){
      this.plaintesT.push({data: tab[i]});
    }

    tab = data.allergie.split(',');
    for (let i = 0; i<tab.length; i++){
      this.allergiesT.push({data: tab[i]});
    }

    tab = data.autre.split(',');
    for (let i = 0; i<tab.length; i++){
      this.autreT.push({data: tab[i]});
    }

    tab = data.precedent.split(',');
    for (let i = 0; i<tab.length; i++){
      this.antecedentT.push({data: tab[i]});
    }

    tab = data.resultat.split(',');
    for (let i = 0; i<tab.length; i++){
      this.resultatsT.push({data: tab[i]});
    }

    tab = data.examens.split(',');
    for (let i = 0; i<tab.length; i++){
      this.examensT.push({data: tab[i]});
    }
  }

  initForm(){
    this.formulaire = this.fb.group({
      plainte: [''],
      allergie: [''],
      precedent: [''],
      autre: [''],
      resultat: [''],
      examens: [''],
      fumeur: [this.consultation?.fumeur],
      buveur: [this.consultation?.buveur],
      situation: [this.consultation?.situation],
      cout: [this.consultation?.cout],
      date_visite: [this.consultation?.date_visite.substring(0,10)],
      taille: [this.consultation?.taille],
      poids: [this.consultation?.poids],
      rdv_id: [this.consultation?.rdv_id],
      patient_id: [this.consultation?.patient_id],
    });
  }

  getSlug(){
    this.dateJour = this.currentStartDate.toLocaleString().substring(6,10)+'-'+this.currentStartDate.toLocaleString().substring(3,5)+'-'+this.currentStartDate.toLocaleString().substring(0,2);
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

  chargeTable(data: string){
    if(data.length>2){
      if(data == "plainte"){
        this.plaintesT.push({data: this.formulaire.value['plainte']}) ;
      }else if(data == "allergie"){
        this.allergiesT.push({data: this.formulaire.value['allergie']}) ;
      }else if(data == "precedent"){
        this.antecedentT.push({data: this.formulaire.value['precedent']}) ;
      }else if(data == "autre"){
        this.autreT.push({data: this.formulaire.value['autre']}) ;
      }else if(data == "examens"){
        this.examensT.push({data: this.formulaire.value['examens']}) ;
      }else if(data == "resultat"){
        this.resultatsT.push({data: this.formulaire.value['resultat']}) ;
      }
    }
    this.formulaire.get(data).reset();
  }

  verificationValeur(data: string){
    this.inputValue = data;
    if(data == "plainte"){
      this.donnees = this.plaintesT;
      this.isInput = true;
    }else if(data == "allergie"){
      this.donnees = this.allergiesT ;
      this.isInput = true;
    }else if(data == "precedent"){
      this.donnees = this.antecedentT ;
      this.isInput = true;
    }else if(data == "autre"){
      this.donnees = this.autreT;
      this.isInput = true;
    }else if(data == "examens"){
      this.donnees = this.examensT ;
      this.isResultat = true;
    }else if(data == "resultat"){
      this.donnees = this.resultatsT;
      this.isResultat = true;
    }
  }

  cancel(){
    this.isInput = false;
    this.isResultat = false;
  }

  deleteTable(data: string,id:any){
    if(data == "plainte"){
      this.plaintesT.splice(id,1) ;
    }else if(data == "allergie"){
      this.allergiesT.splice(id,1) ;
    }else if(data == "precedent"){
      this.antecedentT.splice(id,1) ;
    }else if(data == "autre"){
      this.autreT.splice(id,1) ;
    }else if(data == "examens"){
      this.examensT.splice(id,1) ;
    }else if(data == "resultat"){
      this.resultatsT.splice(id,1) ;
    }
    this.donnees?.splice(id,1);
  }

  executeFoncitons(){
    this.getResultat();
    this.getAutre();
    this.getPlainte();
    this.getExamen();
    this.getAntecedent();
    this.getAllergie();
  }

  getPlainte(){
    for (let i = 0; i<this.plaintesT.length;i++){
      if( this.plaintes?.length == 0 ){
        this.plaintes = this.plaintesT[i].data;
      }else{
        if (this.plaintes?.length > 0 )
          this.plaintes = this.plaintes+', '+this.plaintesT[i].data;
      }
    }
  }

  getAllergie(){
    for (let i = 0; i<this.allergiesT.length;i++){
      if( this.allergies?.length == 0 ){
        this.allergies = this.allergiesT[i].data;
      }else{
        if (this.allergies?.length > 0 )
          this.allergies = this.allergies+', '+this.allergiesT[i].data;
      }
    }
  }

  getAntecedent(){
    for (let i = 0; i<this.antecedentT.length;i++){
      if( this.antecedent?.length  == 0 ){
        this.antecedent = this.antecedentT[i].data;
      }else{
        if (this.antecedent?.length > 0 )
          this.antecedent = this.antecedent+', '+this.antecedentT[i].data;
      }
    }
  }

  getAutre(){
    for (let i = 0; i<this.autreT.length;i++){
      if( this.autre?.length==0 ){
        this.autre = this.autreT[i].data;
      }else{
        if (this.autre?.length > 0)
          this.autre = this.autre+', '+this.autreT[i].data;
      }
    }
  }

  getResultat(){
    for (let i = 0; i<this.resultatsT.length;i++){
      if( this.resultats?.length==0 ){
        this.resultats = this.resultatsT[i].data;
      }else{
        if (this.resultats?.length > 0)
          this.resultats = this.resultats+', '+this.resultatsT[i].data;
      }
    }
  }

  getExamen(){
    for (let i = 0; i<this.examensT.length;i++){
      if( this.examens?.length==0 ){
        this.examens = this.examensT[i].data;
      }else{
        if (this.examens?.length > 0)
          this.examens = this.examens+','+this.examensT[i].data;
      }
    }
  }

  getPatient(){
    this.patientService.getAllpatient({'content': this.slugPersonnel}).subscribe((data:any)=>{
      this.patients = data;
    })
  }

  getOnePatient(data:any){
    let date = new Date();
    let dateStrinb = date.toLocaleString()+''+date.toLocaleString();
    this.patientService.getOnepatient(data).subscribe((data:any)=>{
      this.onePatient= data;
      this.formulaire.patchValue({
        slug: btoa(dateStrinb),
        personnel_id: this.connexionService.userInfo.slug,
        patient: data.slug
      });
    });
  }

  chargeFonction(){
    this.getSlug();
    this.getPatient();
    this.getRdv();
  }

  enregistrer(){
    this.executeFoncitons();
    this.formulaire.patchValue({
      plainte: this.plaintes,
      allergie: this.allergies,
      precedent: this.antecedent,
      autre: this.autre,
      examens: this.examens,
      resultat: this.resultats,
      date_visite: this.consultation?.date_visite,
      personnel_id: this.slugSelect,
    });
    this.consultationService.update(this.formulaire.value,this.consultation.slug).subscribe((data)=>{
      this.handleCancel();
    });
  }

  getRdv(){
    let date = this.consultation.date_visite.toLocaleString().substring(0,10);
    this.rdvService.getAllrdv({'debut': date, 'fin': date,
      'personnel_id': this.consultation.personnel_id}).subscribe((data:any)=>{
      this.rdvs = data;
    });
  }

  //Steps

  pre(): void {
    this.current -= 1;
    this.verificationPatient()
  }

  next(): void {
    this.current += 1;
    this.verificationPatient()
  }

}
