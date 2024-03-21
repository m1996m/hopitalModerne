import { Component } from '@angular/core';
import {ExamenModel} from "../../core/models/examen.model";
import {HopitalService} from "../../shared/services/web-services/hopital/hopital.service";
import {FormBuilder} from "@angular/forms";
import {ConsultationService} from "../../shared/services/web-services/consultation/consultation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConnexionService} from "../../shared/services/authService/connextion/connexion.service";
import {ExamenService} from "../../shared/services/web-services/examen/examen.service";
import {PatientService} from "../../shared/services/web-services/patient/patient.service";

@Component({
  selector: 'app-examen-edite',
  templateUrl: './examen-edite.component.html',
  styleUrls: ['./examen-edite.component.css']
})
export class ExamenEditeComponent {

  formulaire: any;
  examen: any;
  slugHopital='';
  rdvs: any;
  slugPersonnel: any;
  slugSelect: any;
  consultations: any;
  dateJour: any;
  currentStartDate = new Date();
  resultats='';
  resultatsT = Array<{data: any}>();
  donnees: any;
  inputValue = "";
  isResultat = false;
  onePatient: any;
  oneConsultation: any;
  id_slug = '';
  patient:any;

  constructor(private hopitalServie:HopitalService, private fb: FormBuilder, private consultationService: ConsultationService,
              private route: Router, private connexionService: ConnexionService, private examenService: ExamenService,
              private patientService: PatientService, private activateRoute: ActivatedRoute,

  ) {
  }

  ngOnInit():void{
    this.id_slug = this.activateRoute.snapshot.params['id'];
    this.chargeFonction();
    this.initForm();
  }

  initForm(){
    this.formulaire = this.fb.group({
      resultat: [''],
      patient_id: [this.patient?.email],
      date_jour: [this.examen?.date_jour.substring(0,10)],
      type: [this.examen?.type],
      autre: [this.examen?.autre],
      cout: [this.examen?.cout],
      image: [this.examen?.image],
      consultation_id: [this.examen?.consultation_id],
    });
  }

  getOneExamen(){
    this.examenService.getOneexamen(this.id_slug).subscribe((data:any)=>{
      this.examen = data;
      let tab = data?.resultat.split(',');

      for(let i =0; i<tab?.length; i++){
        this.resultatsT.push({data: tab[i]});
      }
      console.log(data)
      this.getPatient();
      this.initForm();
    });
  }

  getSlug(){
    this.dateJour = this.currentStartDate.toLocaleString().substring(6,10)+'-'+this.currentStartDate.toLocaleString().substring(3,5)+'-'+this.currentStartDate.toLocaleString().substring(0,2);
    console.log(this.dateJour);
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
    if (data?.length>2){
      if(data == "resultat"){
        this.resultatsT.push({data: this.formulaire.value['resultat']}) ;
      }
      this.formulaire.get(data).reset();
    }
  }

  verificationValeur(data: string){
    this.inputValue = data;
      this.donnees = this.resultatsT;
      this.isResultat = true;
  }

  cancel(){
    this.isResultat = false;
  }

  deleteTable(data: string,id:any){
    if(data == "resultat"){
      this.resultatsT.splice(id,1) ;
    }
    this.donnees?.splice(id,1);
  }

  executeFoncitons(){
    this.getResultat();
    this.resultatsT.splice(0,this.resultatsT?.length);
  }

  getResultat(){
    for (let i = 0; i<this.resultatsT.length;i++){
      if( this.resultats?.length==0 ){
        this.resultats = this.resultatsT[i].data;
      }else{
        if (this.resultats?.length > 0)
          this.resultats = this.resultats+','+this.resultatsT[i].data;
      }
    }
  }

  getOneConsultation(patient_id: any){
    this.consultationService.rechercheConsultationExamenNone({'patient_id': patient_id}).subscribe((data:any)=>{
      this.oneConsultation = data;
    })
  }

  getPatient(){
    this.patientService.getOnepatient(this.examen?.patient_id).subscribe((data:any)=>{
      this.patient = data;
      this.getOneConsultation(data?.patient_id);
    });
  }

  getOnePatient(){
    this.patientService.getOnepatient(this.formulaire.value['patient_id']).subscribe((data:any)=>{
      this.onePatient = data;
      this.getOneConsultation(data.patient_id);
    });
  }

  chargeFonction(){
    this.getSlug();
    this.getOneExamen();
  }

  enregistrer(){
    this.executeFoncitons();
    let date = new Date();
    let dateStrinb = date.toLocaleString()+''+date.toLocaleString();
    this.formulaire.patchValue({
      resultat: this.resultats,
      date_jour: this.examen?.dateJour,
      patient_id: this.onePatient?.patient_id,
      consultation_id: this.oneConsultation?.slug
    });
    this.resultats = '';
    this.examenService.update(this.formulaire.value,this.id_slug).subscribe((data:any)=>{
      this.route.navigate(['/examen']);
    });
  }
}
