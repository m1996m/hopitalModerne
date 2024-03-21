import {Component, ViewEncapsulation} from '@angular/core';
import {HopitalService} from "../../shared/services/web-services/hopital/hopital.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NzModalService} from "ng-zorro-antd/modal";
import {UserService} from "../../shared/services/web-services/user/user.service";
import {ConnexionService} from "../../shared/services/authService/connextion/connexion.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HopitalEntity} from "../../core/entities/hopital.entity";
import {UserEntity} from "../../core/entities/user.entity";

@Component({
  selector: 'app-hopital-edit',
  templateUrl: './hopital-edit.component.html',
  styleUrls: ['./hopital-edit.component.css']
})
export class HopitalEditComponent {

  oneHopital?: HopitalEntity;
  slug='';
  user!: UserEntity;
  isVisible = false;
  isVisibleShow = false;
  isVisibleUpdate = false;
  isConfirmLoading = false;
  isConfirmLoadingUpdate = false;
  formulaireUpadate!: FormGroup;
  pays= this.connexionService.userInfo;
  yourCustomStyles = {
    height: '420px', // Exemple : définir la hauteur
    padding: '20px' // Exemple : définir le padding
  };

  constructor(
    private hopitalServie:HopitalService,
    private fb: FormBuilder,
    private modal: NzModalService,
    private userService:UserService,
    private connexionService:ConnexionService,
    private router:Router,
    private activate: ActivatedRoute
  ) {
    encapsulation: ViewEncapsulation.None;
  }

  ngOnInit(): void {
    this.initFormUpdate();
    this.slug = this.activate.snapshot.params['id'];
    this.getOneHopital(this.slug)
    this.connexionService.getUser();
    this.pays = this.connexionService.userInfo.pays;
  }

  initFormUpdate(){
    this.formulaireUpadate = this.fb.group({
      numero_unique: [this.oneHopital?.numero_unique],
      agrement: [this.oneHopital?.agrement],
      adresse: [this.oneHopital?.adresse],
      tel: [this.oneHopital?.tel],
      designation: [this.oneHopital?.designation],
      date_creation: [this.oneHopital?.date_creation],
      pays: [this.oneHopital?.pays],
      description: [this.oneHopital?.description],
    });
  }

  editer(id:any){
    this.hopitalServie.updatehopital(this.formulaireUpadate.value,id).subscribe((data:any)=>{
      //this.router.navigate(['/hopital'])
    });
  }


  getOneHopital(id:any){
    this.hopitalServie.getOneHopital(id).subscribe((data:any)=>{
      this.oneHopital= data;
      this.initFormUpdate();
    });
  }

  getOneUser(id:any){
    this.userService.getOneUser(id).subscribe((data:any)=>{
      this.user = data;
    });
  }

  //connfirmation modification
  showConfirm(id:any): void {
    this.modal.confirm({
      nzTitle: '<i>Voulez-vous vraiment modifié cet hopital?</i>',
      nzOnOk: () =>{
        this.editer(id);
      }
    });
  }

  majsuscule(texte: string): string {
    return texte.charAt(0).toUpperCase() + texte.slice(1);
  }
  showModal(hopital: HopitalEntity): void {
    this.oneHopital = hopital;
    this.isVisible = true;
    this.initFormUpdate();
  }

  updateModale(): void {
    this.isVisibleUpdate = true;
  }
  handleCancel(): void {
    this.isVisible = false;
  }

  handleCancelUpdate(): void {
    this.isVisibleUpdate = false;
  }
  handleOkUpdate(): void {
    this.isConfirmLoadingUpdate = true;
    setTimeout(() => {
      this.isVisibleUpdate = false;
      this.isConfirmLoadingUpdate = false;
    }, 3000);
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

}
