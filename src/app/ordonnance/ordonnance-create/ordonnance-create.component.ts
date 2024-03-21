import { Component } from '@angular/core';
import {ExamenModel} from "../../core/models/examen.model";
import {HopitalService} from "../../shared/services/web-services/hopital/hopital.service";
import {FormBuilder} from "@angular/forms";
import {ConsultationService} from "../../shared/services/web-services/consultation/consultation.service";
import {Router} from "@angular/router";
import {ConnexionService} from "../../shared/services/authService/connextion/connexion.service";
import {ExamenService} from "../../shared/services/web-services/examen/examen.service";
import {PatientService} from "../../shared/services/web-services/patient/patient.service";
import {OrdonnanceModel} from "../../core/models/ordonnance.model";
import {OrdonnanceService} from "../../shared/services/web-services/ordonnance/ordonnance.service";

@Component({
  selector: 'app-ordonnance-create',
  templateUrl: './ordonnance-create.component.html',
  styleUrls: ['./ordonnance-create.component.css']
})
export class OrdonnanceCreateComponent {
  formulaire: any;
  ordonnance: OrdonnanceModel = new OrdonnanceModel('','','','','','','','')
  slugHopital='';
  rdvs: any;
  slugPersonnel: any;
  slugSelect: any;
  consultations: any;
  currentStartDate = new Date();
  produit='';
  produitT = Array<{data: any, quantite: any}>();
  donnees: any;
  inputValue = "";
  isResultat = false;
  onePatient: any;
  oneConsultation: any;

  constructor(private hopitalServie:HopitalService, private fb: FormBuilder, private consultationService: ConsultationService,
              private route: Router, private connexionService: ConnexionService, private ordonnanceService: OrdonnanceService,
              private patientService: PatientService

  ) {
  }

  ngOnInit():void{
    this.chargeFonction();
    this.initForm();
  }

  initForm(){
    this.formulaire = this.fb.group({
      produit: [this.ordonnance.produit],
      patient_id: [this.ordonnance.patient_id],
      personnel_id: [this.ordonnance.personnel_id],
      quantite: [this.ordonnance.quantite],
      slug: [this.ordonnance.slug],
      description: [this.ordonnance.description],
      motif: [this.ordonnance.motif],
      consultation_id: [this.ordonnance.consultation_id],
      type: ['']
    });
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
      this.slugSelect = this.slugPersonnel = this.connexionService.userInfo.patient[0].slug;
    }
  }

  chargeTable(data: string, quantite: string){
    if (this.formulaire.value[data]?.length>2 && this.formulaire.value[quantite]?.length>0){
      if(data == "produit"){
        this.produitT.push({data: this.formulaire.value['produit'], quantite: this.formulaire.value['quantite']});
      }
      this.formulaire.get(data).reset();
      this.formulaire.get(quantite).reset();
      this.formulaire.get('type').reset();
    }
  }

  verificationValeur(){
      this.donnees = this.produitT;
      this.isResultat = true;
  }

  cancel(){
    this.isResultat = false;
  }

  deleteTable(data: string,id:any){
    this.produitT.splice(id,1) ;
    this.donnees?.splice(id,1);
  }

  executeFoncitons(){
    this.produitT.splice(0,this.produitT?.length);
  }


  getOneConsultation(patient_id: any){
    this.consultationService.rechercheConsultationExamenNone({'patient_id': patient_id}).subscribe((data:any)=>{
      this.oneConsultation = data;
      console.log("data")
    });
  }

  getPatient(data:any){
    this.patientService.getOnepatient(data.slug).subscribe((data:any)=>{
      this.onePatient = data;
    },
      (error)=>{
        console.log(error);
      },
    );
  }

  getOnePatient(){
    this.patientService.getOnepatient(this.formulaire.value['patient_id']).subscribe((data:any)=>{
      console.log(data);
      this.getOneConsultation(data?.slug);
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
      slug: btoa(dateStrinb),
      personnel_id: this.slugSelect,
      patient_id: this.onePatient?.slug,
    });
    this.ordonnanceService.createordonnance(this.formulaire.value).subscribe((data:any)=>{
      for (let i = 0; i<this.produitT?.length; i++){
        this.ordonnanceService.createProduit({'produit': this.produitT[i].data, 'quantite': this.produitT[i].quantite, 'ordonnance_id': this.formulaire.value['slug']}).subscribe((data:any)=>{
          },
          error => {
            console.log(error);
          }
        );
      }
      this.route.navigate(['/ordonnance']);
    });
  }
}
