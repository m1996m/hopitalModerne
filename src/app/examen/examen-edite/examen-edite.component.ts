import { Component } from '@angular/core';
import {ExamenModel} from "../../core/models/examen.model";
import {HopitalService} from "../../shared/services/web-services/hopital/hopital.service";
import {FormBuilder} from "@angular/forms";
import {ConsultationService} from "../../shared/services/web-services/consultation/consultation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConnexionService} from "../../shared/services/authService/connextion/connexion.service";
import {ExamenService} from "../../shared/services/web-services/examen/examen.service";
import {PatientService} from "../../shared/services/web-services/patient/patient.service";
import {PatientEntity} from "../../core/entities/patient.entity";
import {ConsultationEntity} from "../../core/entities/consultation.entity";
import {UserEntity} from "../../core/entities/user.entity";
import {UserService} from "../../shared/services/web-services/user/user.service";
import {ExamenEntity} from "../../core/entities/examen.entity";
import {RdvResponseDto} from "../../shared/services/web-services/rdv/dto/rdv-response.dto";
import {ConsultationDto} from "../../shared/services/web-services/consultation/dto/consultation.dto";

@Component({
  selector: 'app-examen-edite',
  templateUrl: './examen-edite.component.html',
  styleUrls: ['./examen-edite.component.css']
})
export class ExamenEditeComponent {

  formulaire: any;
  examen!: ExamenEntity;
  slugHopital='';
  rdvs: RdvResponseDto = [];
  slugPersonnel = '';
  slugSelect = '';
  consultations: ConsultationDto = [];
  dateJour = '';
  currentStartDate = new Date();
  resultats='';
  resultatsT = Array<{data: any}>();
  donnees: any;
  inputValue = "";
  isResultat = false;
  onePatient!: PatientEntity;
  oneConsultation!: any ;
  yourCustomStyles = {
    height: '500px', // Exemple : définir la hauteur
    padding: '20px' // Exemple : définir le padding
  };
  isVisible = false;
  oneUser!: UserEntity;
  id_slug = '';
  patient: any;

  constructor(
    private hopitalServie:HopitalService,
    private fb: FormBuilder,
    private consultationService: ConsultationService,
    private route: Router,
    private connexionService: ConnexionService,
    private examenService: ExamenService,
    private patientService: PatientService,
    private activateRoute: ActivatedRoute,
    private userService: UserService,
  ) {
  }

  ngOnInit():void{
    this.chargeFonction();
  }

  initForm(){
    this.formulaire = this.fb.group({
      resultat: [''],
      patient_id: [this.oneUser?.username],
      date_jour: [this.examen?.date_jour.toLocaleString().substring(0,10)],
      type: [this.examen?.type],
      autre: [this.examen?.autre],
      cout: [this.examen?.cout],
      image: [this.examen?.image],
      consultation_id: [this.examen?.consultation_id],
      date_consultation: ['']
    });
  }

  validateChampsFormulaire(): boolean {
    return this.formulaire.get('patient_id').value &&
      this.formulaire.get('date_jour')?.value &&
      this.formulaire.get('type')?.value &&
      this.formulaire.get('cout')?.value &&
      this.formulaire.get('consultation_id')?.value;
  }

  showModal(examen: ExamenEntity): void {
    this.isVisible = true;
    this.examen = examen;
    this.getOnePatient();
    let tab = examen?.resultat.split(',');
    for(let i =0; i<tab?.length; i++){
      this.resultatsT.push({data: tab[i]});
    }
    this.consultationService.notifyModalState(this.isVisible);
  }

  handleCancel(): void {
    this.isVisible = false;
    this.consultationService.notifyModalState(this.isVisible);
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


  getOneUserByEmail(){
    this.userService.getOneUser(this.onePatient?.user_id).subscribe((data)=>{
      this.oneUser = data;
      this.initForm();
    });
  }

  searchOneConsultation(){
    this.oneConsultation = this.onePatient.consultation.find(
      consultation => consultation.date_visite.toLocaleString().substring(0,10) === this.formulaire.value['date_consultation']
    );
    console.log(this.formulaire.value['date_consultation']);
  }
  getOnePatient(){
    this.patientService.getOnepatient(this.examen?.patient_id).subscribe((data)=>{
      this.onePatient = data;
      this.getOneUserByEmail()
      console.log('Patient ',data);
      this.searchOneConsultation();
    });
  }

  chargeFonction(){
    this.getData();
  }

  enregistrer(){
    this.executeFoncitons();
    this.formulaire.patchValue({
      resultat: this.resultats,
      date_jour: this.examen?.date_jour.toString().substring(0,10),
      patient_id: this.onePatient?.slug,
      consultation_id: this.oneConsultation?.slug
    });
    this.resultats = '';
    this.examenService.update(this.formulaire.value, this.examen?.slug).subscribe((data)=>{
      this.handleCancel();
    });
  }
}
