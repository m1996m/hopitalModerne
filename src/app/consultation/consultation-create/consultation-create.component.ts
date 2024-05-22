import { Component } from '@angular/core';
import {HopitalService} from "../../shared/services/web-services/hopital/hopital.service";
import {FormBuilder} from "@angular/forms";
import {ServiceService} from "../../shared/services/web-services/service/service.service";
import {Router} from "@angular/router";
import {ConnexionService} from "../../shared/services/authService/connextion/connexion.service";
import {ConsultationService} from "../../shared/services/web-services/consultation/consultation.service";
import {ConsultationModel} from "../../core/models/consultation.model";
import {PatientService} from "../../shared/services/web-services/patient/patient.service";
import {RdvService} from "../../shared/services/web-services/rdv/rdv.service";
import {HopitalReponseDto} from "../../shared/services/web-services/hopital/dto/hopital-reponse.dto";
import {RdvResponseDto} from "../../shared/services/web-services/rdv/dto/rdv-response.dto";
import {PatientResponseDto} from "../../shared/services/web-services/patient/dto/patient-response.dto";

@Component({
  selector: 'app-consultation-create',
  templateUrl: './consultation-create.component.html',
  styleUrls: ['./consultation-create.component.css']
})
export class ConsultationCreateComponent {

  formulaire:any;
  consultation: ConsultationModel = new ConsultationModel('','','','','','','','','','','','','','','','','')
  hopitals: HopitalReponseDto = [];
  slugHopital='';
  rdvs: RdvResponseDto = [];
  slugPersonnel = '';
  slugSelect = '';
  current = 0;
  index = 'First-content';
  onePatient:any;
  patients: PatientResponseDto = [];
  dateJour = '';
  currentStartDate = new Date();
  plaintes = '';
  allergies = '';
  antecedent = '';
  autre = '';
  resultats = '';
  examens = '';
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
  yourCustomStyles = {
    height: '500px', // Exemple : définir la hauteur
    padding: '20px' // Exemple : définir le padding
  };
  isVisible = false;
  isConclusion = false;
  isHopital = false;
  isDiagnotic = false;
  isPatient = false;

  constructor(
    private hopitalServie:HopitalService,
    private fb: FormBuilder,
    private activiteService: ServiceService,
    private consultationService: ConsultationService,
    private route: Router,
    private connexionService: ConnexionService,
    private patientService: PatientService,
    private rdvService: RdvService
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

  showModal(): void {
    this.isVisible = true;
    this.consultationService.notifyModalState(this.isVisible);
  }

  handleCancel(): void {
    this.isVisible = false;
    this.consultationService.notifyModalState(this.isVisible);
  }

  initForm(){
    this.formulaire = this.fb.group({
      rdv_id: [this.consultation.rdv_id],
      patient_id: [this.consultation.patient_id],
      personnel_id: [this.slugPersonnel],
      plainte: [this.consultation.plainte],
      allergie: [this.consultation.allergie],
      precedent: [this.consultation.precedent],
      autre: [this.consultation.autre],
      resultat: [this.consultation.resultat],
      examens: [this.consultation.examens],
      slug: [this.consultation.slug],
      fumeur: [this.consultation.fumeur],
      buveur: [this.consultation.buveur],
      situation: [this.consultation.situation],
      cout: [this.consultation.cout],
      date_visite: [this.consultation.date_visite],
      taille: [this.consultation.taille],
      poids: [this.consultation.poids],
    });
  }

  getData(){
    this.dateJour = this.currentStartDate.toLocaleString().substring(6,10)+'-'+this.currentStartDate.toLocaleString().substring(3,5)+'-'+this.currentStartDate.toLocaleString().substring(0,2);
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
    if (data?.length>2){
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
      this.formulaire.get(data).reset();
    }
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
    this.autreT.splice(0,this.autreT?.length);
    this.allergiesT.splice(0,this.allergiesT?.length);
    this.antecedentT.splice(0,this.antecedentT?.length);
    this.resultatsT.splice(0,this.resultatsT?.length);
    this.examensT.splice(0,this.examensT?.length);
    this.plaintesT.splice(0,this.plaintesT?.length);
  }

  getPlainte(){
    for (let i = 0; i<this.plaintesT.length;i++){
      if( this.plaintes?.length == 0 ){
        this.plaintes = this.plaintesT[i].data;
      }else{
        if (this.plaintes?.length > 0 )
          this.plaintes = this.plaintes+','+this.plaintesT[i].data;
      }
    }
  }

  getAllergie(){
    for (let i = 0; i<this.allergiesT.length;i++){
      if( this.allergies?.length == 0 ){
        this.allergies = this.allergiesT[i].data;
      }else{
        if (this.allergies?.length > 0 )
          this.allergies = this.allergies+','+this.allergiesT[i].data;
      }
    }
  }

  getAntecedent(){
    for (let i = 0; i<this.antecedentT.length;i++){
      if( this.antecedent?.length  == 0 ){
        this.antecedent = this.antecedentT[i].data;;
      }else{
        if (this.antecedent?.length > 0 )
          this.antecedent = this.antecedent+','+this.antecedentT[i].data;
      }
    }
  }

  getAutre(){
    for (let i = 0; i<this.autreT.length;i++){
      if( this.autre?.length==0 ){
        this.autre = this.autreT[i].data;;
      }else{
        if (this.autre?.length > 0)
          this.autre = this.autre+','+this.autreT[i].data;
      }
    }
  }

  getResultat(){
    for (let i = 0; i<this.resultatsT.length;i++){
      if( this.resultats?.length==0 ){
        this.resultats = this.resultatsT[i].data;;
      }else{
        if (this.resultats?.length > 0)
          this.resultats = this.resultats+','+this.resultatsT[i].data;
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
    this.getData();
    this.getPatient();
  }

  enregistrer(){
    this.executeFoncitons();
    let date = new Date();
    let dateStrinb = date.toLocaleString()+''+date.toLocaleString();
    this.formulaire.patchValue({
      plainte: this.plaintes,
      allergie: this.allergies,
      precedent: this.antecedent,
      autre: this.autre,
      examens: this.examens,
      resultat: this.resultats,
      slug: btoa(dateStrinb),
      personnel_id: this.slugSelect,
    });
    this.plaintes = '';
    this.allergies = '';
    this.antecedent = '';
    this.autre = '';
    this.examens = '';
    this.resultats = '';
    this.consultationService.createconsultation(this.formulaire.value).subscribe((data:any)=>{
      this.handleCancel();
    });
  }

  getRdv(){
    this.rdvService.getAllrdv({'debut':this.formulaire.value['date_visite'], 'fin':this.formulaire.value['date_visite'], 'personnel_id': this.slugPersonnel}).subscribe((data)=>{
      this.rdvs = data;
    });
  }

  //Steps


  pre(): void {
    this.current -= 1;
    //this.changeContent();
  }

  next(): void {
    this.current += 1;
   // this.changeContent();
  }


}
