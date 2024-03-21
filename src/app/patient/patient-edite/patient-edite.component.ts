import { Component } from '@angular/core';
import {HopitalService} from "../../shared/services/web-services/hopital/hopital.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ServiceService} from "../../shared/services/web-services/service/service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../shared/services/web-services/user/user.service";
import {ProfileService} from "../../shared/services/web-services/profile/profile.service";
import {PersonnelService} from "../../shared/services/web-services/personnel/personnel.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {PatientService} from "../../shared/services/web-services/patient/patient.service";
import {ConnexionService} from "../../shared/services/authService/connextion/connexion.service";
import {PatientEntity} from "../../core/entities/patient.entity";
import {PersonnelResponseDto} from "../../shared/services/web-services/personnel/dto/personnel-response.dto";
import {HopitalReponseDto} from "../../shared/services/web-services/hopital/dto/hopital-reponse.dto";
import {UserEntity} from "../../core/entities/user.entity";
import {PersonnelEntity} from "../../core/entities/personnel.entity";

@Component({
  selector: 'app-patient-edite',
  templateUrl: './patient-edite.component.html',
  styleUrls: ['./patient-edite.component.css']
})
export class PatientEditeComponent {

  formulaire!: FormGroup;
  patient!: PatientEntity;
  onePatient!: PatientEntity;
  personnels: PersonnelResponseDto = [];
  hopitals: HopitalReponseDto = [];
  slug = '';
  user!: UserEntity;
  current = 0;
  index = 'First-content';
  pers: string = '';
  hospi: string = '';
  id: string = '';
  slugHopital = '';
  slugPersonnel='';
  isVisible = false;
  isIdentite = true;
  isProfessionnel = false;
  onePersonnel!: PersonnelEntity;
  role = 'USER_PERSONNEL';
  yourCustomStyles = {
    height: '500px', // Exemple : définir la hauteur
    padding: '20px' // Exemple : définir le padding
  };

  constructor(private hopitalServie:HopitalService, private fb: FormBuilder,private activiteService: ServiceService, private activateRoute:ActivatedRoute,private patientService: PatientService,
     private userService:UserService, private route: Router, private profileService:ProfileService,private personnelService:PersonnelService,private modal: NzModalService,public connexionService: ConnexionService
  ) {
  }

  ngOnInit(): void {
    this.getData();
    this.getHopital();
    this.initForm();
  }


  getData(){
    this.role = this.connexionService.userInfo.role;
    if(this.connexionService?.userInfo?.hopital?.length > 0 || this.connexionService?.userInfo?.personnel?.length>0){
      if(this.role == "USER_HOPITAL"){
        this.slugHopital = this.connexionService?.userInfo?.hopital[0].slug;
      }else{
        if(this.role == "USER_PERSONNEL"){
          this.slugHopital = this.connexionService.userInfo.personnel[0].hopital;
        }
      }
    }
    if(this.connexionService?.userInfo?.personnel?.length > 0){
      if(this.role == "USER_PERSONNEL"){
        this.slugPersonnel = this.connexionService.userInfo.personnel[0].slug;
      }
    }
  }

  showModal(patient: PatientEntity): void {
    this.onePatient = patient;
    this.initForm();
    this.isVisible = true;
    this.hopitalServie.notifyModalState(this.isVisible);
  }

  handleCancel(): void {
    this.isVisible = false;
    this.hopitalServie.notifyModalState(this.isVisible);
  }

  onChange(event:any,string:string){
    const selectElement = event.target as HTMLSelectElement;
    const selectedIndex = selectElement.selectedIndex;
    const selectedOptionText = selectElement.options[selectedIndex].text;
    if(string == 'personnel'){
      this.pers = selectedOptionText;
    }else{
      this.hospi = selectedOptionText;
    }
  }

  verificationIdentite(){
    this.isIdentite = false;
    if (
      this.formulaire.value['nom'].length > 2 && this.formulaire.value['prenom'].length>3 && this.formulaire.value['genre'].length>2 &&
      this.formulaire.value['date_naissance'].length > 7 && this.formulaire.value['tel'].length>5 &&
      this.formulaire.value['adresse'].length>5 && this.formulaire.value['nationnalite'].length>4
    ){
      this.isIdentite = true;
    }
  }

  verificationProfessionnel(){
    this.isProfessionnel = false;
    if (this.formulaire.value['profession'].length > 3 && this.formulaire.value['email'].length > 2 && this.formulaire.value['hopital'].length > 3 ){
      this.isProfessionnel = true;
    }
  }

  getHopital(){
    this.hopitalServie.recherche({"content":this.connexionService.userInfo.pays}).subscribe((data)=>{
      this.hopitals = data;
      this.getPersonnel();
    });
  }

  initForm(){
    this.formulaire = this.fb.group({
      tel: [this.onePatient?.tel],
      nom: [this.onePatient?.nom],
      prenom: [this.onePatient?.prenom],
      adresse: [this.onePatient?.adresse],
      profession: [this.onePatient?.profession],
      hopital: [this.onePatient?.hopital],
      date_naissance: [(this.onePatient?.date_naissance)?.toLocaleString().substring(0,10)],
      nationnalite: [this.onePatient?.nationnalite],
      email: [this.onePatient?.email],
      description: [this.onePatient?.description],
      genre: [this.onePatient?.genre],
    });
  }

  enregistrer(){
    this.patientService.updatepatient(this.formulaire.value,this.onePatient?.slug).subscribe((data: any)=>{
      this.handleCancel();
    });
  }

  //connfirmation modification
  showConfirm(): void {
    this.modal.confirm({
      nzTitle: '<i>Voulez-vous vraiment modifié cet hopital?</i>',
      nzOnOk: () =>{
        this.enregistrer;
      }
    });
  }

  getOnePatientu(){
    this.patientService.getEmailOneUser(this.formulaire.value['email']).subscribe((data)=>{
      this.formulaire.patchValue({
        user_id: data?.slug
      });
    });
  }


  getPersonnel(){
    this.personnelService.getAllpersonnel(this.slugHopital).subscribe((data)=>{
      this.personnels = data;
    });
  }

  //Fonctions etapes

  pre(): void {
    this.current -= 1;
    this.changeContent();
    this.verificationIdentite();
    this.verificationProfessionnel();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
    this.verificationIdentite();
    this.verificationProfessionnel();
  }


  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.index = 'third-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }
}
