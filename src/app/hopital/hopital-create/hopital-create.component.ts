import {Component, ViewEncapsulation} from '@angular/core';
import {HopitalModel} from "../../core/models/hopital.model";
import {HopitalService} from "../../shared/services/web-services/hopital/hopital.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NzModalService} from "ng-zorro-antd/modal";
import {UserService} from "../../shared/services/web-services/user/user.service";
import {Router} from "@angular/router";
import {ConnexionService} from "../../shared/services/authService/connextion/connexion.service";
import {UserEntity} from "../../core/entities/user.entity";

@Component({
  selector: 'app-hopital-create',
  templateUrl: './hopital-create.component.html',
  styleUrls: ['./hopital-create.component.css']
})
export class HopitalCreateComponent {
  formulaire!: FormGroup;
  hopital: HopitalModel = new HopitalModel ('','','','','','','','','','')
  slug = '';
  user!: UserEntity;
  isVisible = false;
  isVisibleShow = false;
  isVisibleUpdate = false;
  isConfirmLoading = false;
  isConfirmLoadingUpdate = false;
  slugHopital = '';
  slugPersonnel = '';
  userConnected: any;
  yourCustomStyles = {
    height: '420px', // Exemple : définir la hauteur
    padding: '20px' // Exemple : définir le padding
  };


  constructor(
    private hopitalServie:HopitalService,
    private fb: FormBuilder,
    private modal: NzModalService,
    private userService:UserService,
    private route: Router,
    public connexionService: ConnexionService
  ) {
    encapsulation: ViewEncapsulation.None;
  }

  ngOnInit(): void {
    this.getData();
    this.initForm();
    this.userConnected = this.connexionService.userInfo;
    this.getOneUser();

  }

  getData(){
    if(this.connexionService?.userInfo?.hopital?.length>0){
      if(this.connexionService.userInfo.role=="USER_HOPITAL"){
        this.slugHopital =this.connexionService?.userInfo?.hopital[0].slug;
      }
    }
  }

  showModal1(): void {
    this.isVisible = true;
    this.hopitalServie.notifyModalState(this.isVisible);
  }

  handleCancel(): void {
    this.isVisible = false;
    this.hopitalServie.notifyModalState(this.isVisible);
  }

  initForm(){
    this.formulaire = this.fb.group({

      numero_unique: [this.hopital.numero_unique],
      agrement: [this.hopital.agrement],
      adresse: [this.hopital.adresse],
      user_id: [this.hopital.user_id],
      slug: [this.hopital.slug],
      tel: [this.hopital.tel],
      designation: [this.hopital.designation],
      date_creation: [this.hopital.date_creation],
      pays: [this.hopital.pays],
      description: [this.hopital.description]

    });
  }

  enregistrer(){
    this.hopitalServie.createhopital(this.formulaire.value).subscribe((data:any)=>{
    });
  }

  getOneUser(){
    let date = new Date();
    let dateStrinb = date.toLocaleString()+''+date.toLocaleString();
    this.userService.getOneUser(this.userConnected?.id).subscribe((data:any)=>{
      this.user= data;
      this.formulaire.patchValue({
        slug: btoa(dateStrinb),
        pays: this.user.pays,
        user_id: this.user.slug
      });
    });
  }

}
