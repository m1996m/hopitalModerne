import { Component } from '@angular/core';
import {HopitalService} from "../../shared/services/web-services/hopital/hopital.service";
import {FormBuilder} from "@angular/forms";
import {ConsultationService} from "../../shared/services/web-services/consultation/consultation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConnexionService} from "../../shared/services/authService/connextion/connexion.service";
import {OrdonnanceService} from "../../shared/services/web-services/ordonnance/ordonnance.service";
import {PatientService} from "../../shared/services/web-services/patient/patient.service";

@Component({
  selector: 'app-ordonnance-edite',
  templateUrl: './ordonnance-edite.component.html',
  styleUrls: ['./ordonnance-edite.component.css']
})
export class OrdonnanceEditeComponent {
  formulaire: any;
  ordonnance: any;
  slugHopital='';
  rdvs: any;
  slugPersonnel: any;
  slugSelect: any;
  consultations: any;
  currentStartDate = new Date();
  produit='';
  produitT = Array<{data: any, quantite: any, id: any}>();
  donnees: any;
  inputValue = "";
  isResultat = false;
  onePatient: any;
  oneConsultation: any;
  id_slug = '';

  constructor(private hopitalServie:HopitalService, private fb: FormBuilder, private consultationService: ConsultationService,
              private route: Router, private connexionService: ConnexionService, private ordonnanceService: OrdonnanceService,
              private patientService: PatientService, private activateRoute: ActivatedRoute

  ) {
  }

  ngOnInit():void{
    this.initForm();
    this.chargeFonction();
  }

  initForm(){
    this.formulaire = this.fb.group({
      produit: [''],
      patient_id: [this.ordonnance?.patient_id],
      quantite: [''],
      description: [this.ordonnance?.description],
      motif: [this.ordonnance?.motif],
      consultation_id: [this.ordonnance?.consultation_id],
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

  chargeTable(data: string, quantite: string,id: any){
    if (this.formulaire.value[data]?.length>2 && this.formulaire.value[quantite]?.length>0){
      if(data == "produit"){
        this.produitT.push({data: this.formulaire.value['produit'], quantite: this.formulaire.value['quantite'],id :id});
      }
      this.formulaire.get(data).reset();
      this.formulaire.get(quantite).reset();
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
    this.consultationService.rechercheConsultationExamenNone({content: patient_id}).subscribe((data:any)=>{
      this.oneConsultation = data;
    })
  }

  getOneOrdonnance(){
    this.ordonnanceService.getOneordonnance(this.id_slug).subscribe((data: any)=>{
      this.ordonnance = data;
      for (let i = 0; i<data.length; i++){
        this.produitT.push({data: data[i]?.produit?.produit, quantite: data[i]?.produit?.quantite, id: data[i]?.produit?.id});
      }
      this.initForm();
    });
  }

  getPatient(data:any){
    this.formulaire.patchValue({
      patient_id: data.patient_id
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
    this.getOneOrdonnance();
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
    this.ordonnanceService.update(this.formulaire.value, this.id_slug).subscribe((data:any)=>{
      for (let i = 0; i<this.produitT?.length; i++){
        this.ordonnanceService.updateProduit({'produit': this.produitT[i].data, 'quantite': this.produitT[i].quantite, 'ordonnance_id': this.formulaire.value['slug']},this.produitT[i].id);
      }
      this.route.navigate(['/ordonnance']);
    });
  }

}
