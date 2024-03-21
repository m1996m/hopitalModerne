import {Component} from '@angular/core';
import {HopitalService} from "../../shared/services/web-services/hopital/hopital.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../shared/services/web-services/user/user.service";
import {Router} from "@angular/router";
import {PersonnelModel} from "../../core/models/personnel.model";
import {ServiceService} from "../../shared/services/web-services/service/service.service";
import {ProfileService} from "../../shared/services/web-services/profile/profile.service";
import {PersonnelService} from "../../shared/services/web-services/personnel/personnel.service";
import {ConnexionService} from "../../shared/services/authService/connextion/connexion.service";
import {ServiceResponseDto} from "../../shared/services/web-services/service/dto/service-response.dto";
import {ProfileResponseDto} from "../../shared/services/web-services/profile/dto/profile-response.dto";
import {UserEntity} from "../../core/entities/user.entity";
import {HopitalReponseDto} from "../../shared/services/web-services/hopital/dto/hopital-reponse.dto";

@Component({
  selector: 'app-personnel-create',
  templateUrl: './personnel-create.component.html',
  styleUrls: ['./personnel-create.component.css']
})
export class PersonnelCreateComponent {
  formulaire!: FormGroup;
  personnel: PersonnelModel = new PersonnelModel('','','','','','','','','','','','','','','')
  hopitals: HopitalReponseDto = [];
  slugHopital='';
  user: any;
  services?: ServiceResponseDto[] = [];
  profiles?: ProfileResponseDto[] = [];
  current = 0;
  index = 'First-content';
  serv: string = '';
  prof: string = '' ;
  hospi: string = '';
  oneUser!: UserEntity;
  isVisible = false;
  yourCustomStyles = {
    height: '500px', // Exemple : définir la hauteur
    padding: '20px' // Exemple : définir le padding
  };
  isIdentite = false;
  isHopital = false;


  constructor(
    private hopitalServie: HopitalService,
    private fb: FormBuilder,
    private activiteService: ServiceService,
    private userService:UserService,
    private route: Router,
    private profileService: ProfileService,
    private personnelService: PersonnelService,
    public connexionService: ConnexionService
  ) {
  }

  ngOnInit(): void {
    this.executeFunction();
  }

  getData(){
    if(this.connexionService?.userInfo?.hopital?.length>0){
      if(this.connexionService.userInfo.role=="USER_HOPITAL"){
        this.slugHopital = this.connexionService?.userInfo?.hopital[0].slug;
        console.log(this.slugHopital)
      }
    }
  }

  executeFunction(){
    this.getData();
    this.getChargerFonction();
    this.initForm();
    this.getOneUser(this.connexionService.userInfo?.id);
    this.getHopital();
  }

  showModal1(): void {
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
    if(string== 'service'){
      this.serv= selectedOptionText;
    }else if(string== 'profile'){
      this.prof=selectedOptionText;
    }else{
      this.hospi= selectedOptionText;
    }
  }

  initForm(){
    this.formulaire = this.fb.group({
      poste: [this.personnel.poste],
      tel: [this.personnel.tel],
      nom: [this.personnel.nom],
      prenom: [this.personnel.prenom],
      adresse: [this.personnel.adresse],
      profile: [this.personnel.profile],
      user_id: [this.personnel.user_id],
      service: [this.personnel.service],
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
      this.personnelService.createpersonnel(this.formulaire.value).subscribe((data:any)=>{
        this.handleCancel();
      });
  }

  getOneUser(id:any){
    let date = new Date();
    let dateStrinb = date.toLocaleString()+''+date.toLocaleString();
    this.userService.getOneUser(id).subscribe((data)=>{
      this.user= data;
      this.formulaire.patchValue({
        slug: btoa(dateStrinb),
      });
    });
  }

  verificationIdentite(){
    this.isIdentite = false;
    if (this.formulaire.value['nom'].length>2 && this.formulaire.value['prenom'].length>3 && this.formulaire.value['genre'].length>2 &&
      this.formulaire.value['date_naissance'].length>7 && this.formulaire.value['tel'].length>5 &&
      this.formulaire.value['adresse'].length>5 && this.formulaire.value['email'].length>7 && this.formulaire.value['nationnalite'].length>4){
      this.isIdentite = true;
    }
  }

  verificationHopitlal(){
    this.isHopital = false;
    if (this.formulaire.value['profile'].length>2 && this.formulaire.value['service'].length>3 &&
      this.formulaire.value['poste'].length>2 && this.formulaire.value['hopital'].length>3 ){
      this.isHopital = true;
    }
  }

  getOneUserEmail(){
    this.personnelService.getEmailOneUser(this.formulaire.value['email']).subscribe((data)=>{
      this.oneUser= data;
      console.log(data)
      this.formulaire.patchValue({
        user_id: this.oneUser?.slug
      });
    });
  }

  getChargerFonction(){
    this.getService();
    this.getProfile();
  }

  getService(){
    this.activiteService.getAllservice({"content":this.slugHopital}).subscribe((data)=>{
      this.services = data;
    });
  }

  getProfile(){
    this.profileService.getAllprofile({"content":this.slugHopital}).subscribe((data)=>{
      this.profiles = data;
    });
  }

  getHopital(){
    this.hopitalServie.recherche({"content":this.connexionService.userInfo?.pays}).subscribe((data)=>{
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
