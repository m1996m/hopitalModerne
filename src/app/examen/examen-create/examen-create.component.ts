import { Component } from '@angular/core';
import {HopitalService} from "../../shared/services/web-services/hopital/hopital.service";
import {FormBuilder} from "@angular/forms";
import {ConsultationService} from "../../shared/services/web-services/consultation/consultation.service";
import {Router} from "@angular/router";
import {ConnexionService} from "../../shared/services/authService/connextion/connexion.service";
import {ExamenModel} from "../../core/models/examen.model";
import {ExamenService} from "../../shared/services/web-services/examen/examen.service";
import {PatientService} from "../../shared/services/web-services/patient/patient.service";

@Component({
  selector: 'app-examen-create',
  templateUrl: './examen-create.component.html',
  styleUrls: ['./examen-create.component.css']
})
export class ExamenCreateComponent {

  formulaire: any;
  examen: ExamenModel = new ExamenModel('','','','','','','','','','','')
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

  constructor(private hopitalServie:HopitalService, private fb: FormBuilder, private consultationService: ConsultationService,
              private route: Router, private connexionService: ConnexionService, private examenService: ExamenService,
              private patientService: PatientService,

  ) {
  }

  ngOnInit():void{
    this.chargeFonction();
    this.initForm();
  }

  initForm(){
    this.formulaire = this.fb.group({
      resultat: [this.examen.resultat],
      patient_id: [this.examen.patient_id],
      personnel_id: [this.examen.personnel_id],
      date_jour: [this.examen.date_jour],
      type: [this.examen.type],
      autre: [this.examen.autre],
      cout: [this.examen.cout],
      image: [this.examen.image],
      slug: [this.examen.slug],
      consultation_id: [this.examen.consultation_id],
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
    if(data == "resultat"){
      this.donnees = this.resultatsT;
      this.isResultat = true;
    }
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
        this.resultats = this.resultatsT[i].data;;
      }else{
        if (this.resultats?.length > 0)
          this.resultats = this.resultats+','+this.resultatsT[i].data;
      }
    }
  }

  getOneConsultation(patient_id: any){
    this.consultationService.rechercheConsultationExamenNone({'patient_id': patient_id}).subscribe((data:any)=>{
      this.oneConsultation = data;
      console.log(data)
    })
  }

  getPatient(data:any){
    this.formulaire.patchValue({
      patient_id: data.patient_id
    });
  }

  getOnePatient(){
    this.patientService.getOnepatient(this.formulaire.value['patient_id']).subscribe((data:any)=>{
      this.onePatient = data;
      this.getOneConsultation(data?.patient_id);
    });
  }

  chargeFonction(){
    this.getSlug();
  }

  enregistrer(){
    this.executeFoncitons();
    let date = new Date();
    let dateStrinb = date.toLocaleString()+''+date.toLocaleString();
    this.formulaire.patchValue({
      resultat: this.resultats,
      date_jour: this.formulaire.value['date_jour']+'T00:00:00.000Z',
      slug: btoa(dateStrinb),
      personnel_id: this.slugSelect,
      patient_id: this.onePatient?.slug,
    });
    this.resultats = '';
    this.examenService.createexamen(this.formulaire.value).subscribe((data:any)=>{
      this.route.navigate(['/examen']);
    });
  }

}
