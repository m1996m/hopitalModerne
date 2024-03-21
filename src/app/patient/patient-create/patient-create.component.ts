import { Component } from '@angular/core';
import {HopitalService} from "../../shared/services/web-services/hopital/hopital.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ServiceService} from "../../shared/services/web-services/service/service.service";
import {UserService} from "../../shared/services/web-services/user/user.service";
import {Router} from "@angular/router";
import {ProfileService} from "../../shared/services/web-services/profile/profile.service";
import {PersonnelService} from "../../shared/services/web-services/personnel/personnel.service";
import {PatientModel} from "../../core/models/patient.model";
import {PatientService} from "../../shared/services/web-services/patient/patient.service";
import {ConnexionService} from "../../shared/services/authService/connextion/connexion.service";
import {HopitalReponseDto} from "../../shared/services/web-services/hopital/dto/hopital-reponse.dto";
import {UserEntity} from "../../core/entities/user.entity";
import {PersonnelResponseDto} from "../../shared/services/web-services/personnel/dto/personnel-response.dto";
import {HopitalEntity} from "../../core/entities/hopital.entity";
import {PersonnelEntity} from "../../core/entities/personnel.entity";

@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.css']
})
export class PatientCreateComponent {
  formulaire!: FormGroup;
  personnel: PatientModel = new PatientModel('','','','','','','','','','','','','','')
  hopitals: HopitalReponseDto = [];
  oneHopital!: HopitalEntity;
  slug = '';
  user!: UserEntity;
  current = 0;
  index = 'First-content';
  pers: string = '';
  hospi: string = '';
  personnels: PersonnelResponseDto = [];
  slugHopital = '';
  slugPersonnel = '';
  oneUser!: UserEntity;
  isVisible = false;
  role = 'USER_PERSONNEL';
  yourCustomStyles = {
    height: '500px', // Exemple : définir la hauteur
    padding: '20px' // Exemple : définir le padding
  };
  isIdentite = false;
  isProfessionnel = false;
  onePersonnel!: PersonnelEntity;

  constructor(
    private hopitalServie: HopitalService,
    private fb: FormBuilder,
    private activiteService: ServiceService,
    private patientService: PatientService,
    private userService: UserService,
    private route: Router,
    private profileService: ProfileService,
    private personnelService:PersonnelService,
    public connexionService: ConnexionService
  ) {
  }

  ngOnInit(): void {
    this.getData();
    this.initForm();
    this.getChargerFonction();
  }

  verificationIdentite(){
    this.isIdentite = false;
    if (
      this.formulaire.value['nom'].length>2 && this.formulaire.value['prenom'].length>3 && this.formulaire.value['genre'].length>2 &&
      this.formulaire.value['date_naissance'].length>7 && this.formulaire.value['tel'].length>5 &&
      this.formulaire.value['adresse'].length>5 && this.formulaire.value['nationnalite'].length>4
    ){
      this.isIdentite = true;
    }
  }

  verificationProfessionnel(){
    this.isProfessionnel = false;
    if (this.formulaire.value['personnel'].length>2 && this.formulaire.value['profession'].length>3 &&
      this.formulaire.value['email'].length>2 && this.formulaire.value['hopital'].length>3 ){
      this.isProfessionnel = true;
    }
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

  showModal(): void {
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

  initForm(){
    this.formulaire = this.fb.group({
      profession: [this.personnel.profession],
      tel: [this.personnel.tel],
      nom: [this.personnel.nom],
      prenom: [this.personnel.prenom],
      adresse: [this.personnel.adresse],
      personnel: [this.slugPersonnel],
      user_id: [this.personnel.user_id],
      hopital: [this.slugHopital],
      slug: [this.personnel.slug],
      date_naissance: [this.personnel.date_naissance],
      nationnalite: [this.personnel.nationnalite],
      email: [this.personnel.email],
      description: [this.personnel.description],
      genre: [this.personnel.genre],
    });
  }

  enregistrer(){
    if (this.connexionService.userInfo.role == 'USER_PERSONNEL'){
      this.formulaire.patchValue(
        {
          hopital: this.slugHopital
        }
      )
    }
    this.patientService.createpatient(this.formulaire.value).subscribe((data: any)=>{
      this.patientService.createpatient(this.formulaire.value);
      this.handleCancel();
    });
  }

  getOnePersonnel(){
    this.personnelService.getOnepersonnel(this.slugPersonnel).subscribe((data)=>{
      this.onePersonnel = data;
    });
  }
  getOneHopital(){
    this.hopitalServie.getOneHopital(this.slugHopital).subscribe((data)=>{
      this.oneHopital = data;
    })
  }

  getOneUser(id:any){
    let date = new Date();
    let dateStrinb = date.toLocaleString()+''+date.toLocaleString();
    this.userService.getOneUser(id).subscribe((data:any)=>{
      this.user= data;
      this.formulaire.patchValue({
        slug: btoa(dateStrinb),
      });
    });
  }

  getOneUserByEmail(){
    this.patientService.getEmailOneUser(this.formulaire.value['email']).subscribe((data)=>{
      this.oneUser = data;
      this.formulaire.patchValue({
        //email: this.onePatient.username,
        user_id: this.oneUser?.slug
      });
    });
  }

  getChargerFonction(){
    this.getPersonnel();
    this.getOneUser(this.connexionService.userInfo?.id);
    this.getHopital();
    this.getOnePersonnel();
    this.getOneHopital();
  }

  getPersonnel(){
    this.personnelService.getAllpersonnel(this.slugHopital).subscribe((data)=>{
      this.personnels = data;
    });
  }

  getHopital(){
    this.hopitalServie.recherche({"content": this.connexionService.userInfo.pays}).subscribe((data)=>{
      this.hopitals =data;
    });
  }

  //Fonctions etapes

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
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
