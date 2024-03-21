import {Component, ViewEncapsulation} from '@angular/core';
import {HopitalService} from "../../shared/services/web-services/hopital/hopital.service";
import {FormBuilder} from "@angular/forms";
import {NzModalService} from "ng-zorro-antd/modal";
import {ProfileService} from "../../shared/services/web-services/profile/profile.service";
import {ConnexionService} from "../../shared/services/authService/connextion/connexion.service";
import {ProfileSendDto} from "../../shared/services/web-services/profile/dto/profile.send.dto";


interface ItemData {
  designation:string;
  hopital: string;
}
@Component({
  selector: 'app-profile-index',
  templateUrl: './profile-index.component.html',
  styleUrls: ['./profile-index.component.css']
})
export class ProfileIndexComponent {
  slug='';
  user:any;
  listOfData: ItemData[] = [];
  isVisible = false;
  isVisibleShow = false;
  isVisibleUpdate = false;
  isConfirmLoading = false;
  isConfirmLoadingUpdate = false;
  profiles:any;
  formulaire:any;
  formulaireUpadate:any;
  oneProfile:any;
  hopitals:any;
  slugHopital:any;

  yourCustomStyles = {
    height: '200px', // Exemple : définir la hauteur
    padding: '20px' // Exemple : définir le padding
  };
  constructor(
    private hopitalServie: HopitalService,
    private fb: FormBuilder,
    private modal: NzModalService,
    private profileService:ProfileService,
    private hopital:HopitalService,
    public connexionService:ConnexionService
  ) {
    encapsulation: ViewEncapsulation.None;
  }
  ngOnInit(): void {
    if(this.connexionService?.userInfo?.hopital?.length>0){
      if(this.connexionService.userInfo.role=="USER_HOPITAL"){
        this.slugHopital =this.connexionService?.userInfo?.hopital[0].slug;
      }
    }

    this.initForm();
    this.initFormUpadate();
    this.getAllHopital({'content':this.connexionService.userInfo?.pays});
  }

  initForm(){
    this.formulaire = this.fb.group({
      designation:[''],
      slug:[''],
      hopital:[this.connexionService.userInfo?.hopital[0].slug]
    })
  }

  initFormUpadate(){
    this.formulaireUpadate = this.fb.group({
      designation:[this.oneProfile?.designation],
    })
  }

  create(){
    let date = new Date();
    let dateStrinb = date.toLocaleString();
    this.formulaire.patchValue({
      slug: btoa(dateStrinb)
    });
    this.profileService.createprofile(this.formulaire.value).subscribe((data:any)=>{
      this.getAll({'content': this.slugHopital});
    });
  }

  getAll(data: ProfileSendDto){
    this.profileService.getAllprofile(data).subscribe((data:any)=>{
      this.profiles = data;
    })
  }

  getOne(data: any){
    this.oneProfile = data;
    this.initFormUpadate();
  }

  getAllHopital(form: any){
    this.hopital.recherche(form).subscribe((data:any)=>{
      this.hopitals = data;
      this.getAll({'content':this.slugHopital});
    })
  }

  delete(id:any){
    this.profileService.delete(id).subscribe((data:any)=>{
      this.getAll({'content':this.slugHopital});
    })
  }

  editer(){
    this.profileService.updateprofile(this.formulaireUpadate.value, this.oneProfile.id).subscribe((data:any)=>{
      this.getAll({'content':this.slugHopital});
      this.handleOkUpdate();
    })
  }

  //connfirmation modification
  showConfirm(): void {
    this.modal.confirm({
      nzTitle: '<i>Voulez-vous vraiment modifié ce profile?</i>',
      nzOnOk: () =>{
        this.editer();
      }
    });
  }

  //Confirmation suppression
  showDeleteConfirm(id:any): void {
    this.modal.confirm({
      nzTitle: "Voulez-vous vraiment supprimer la spécialité",
      nzContent: '<b style="color: red;">Une fois cette spécialité supprimée vous pourrez plus le recupperez ainsi toutes les données liées à cette spécialité</b>',
      nzOkText: 'Oui',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>{
        this.delete(id);
      } ,
      nzCancelText: 'Non',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  majsuscule(texte: string): string {
    return texte.charAt(0).toUpperCase() + texte.slice(1);
  }
  showModal1(): void {
    this.isVisible = true;
  }
  modalShow(): void {
    this.isVisibleShow = true;
  }
  updateModale(): void {
    this.isVisibleUpdate = true;
  }
  handleCancel(): void {
    this.isVisible = false;
  }
  handleCancelShow(): void {
    this.isVisibleShow = false;
  }
  handleCancelUpdate(): void {
    this.isVisibleUpdate = false;
  }
  handleOkUpdate(): void {
    setTimeout(() => {
      this.isVisibleUpdate = false;
      this.isConfirmLoadingUpdate = false;
    }, 1000);
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }

}
