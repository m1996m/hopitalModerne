import {Component, ViewEncapsulation} from '@angular/core';
import {HopitalService} from "../../shared/services/web-services/hopital/hopital.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {FormBuilder, NgForm} from "@angular/forms";
import {ServiceService} from "../../shared/services/web-services/service/service.service";
import {ConnexionService} from "../../shared/services/authService/connextion/connexion.service";
import {ServiceDtoSend} from "../../shared/services/web-services/service/dto/service.dto.send";

interface ItemData {
  designation:string;
  hopital: string;
}

@Component({
  selector: 'app-service-index',
  templateUrl: './service-index.component.html',
  styleUrls: ['./service-index.component.css']
})
export class ServiceIndexComponent {
  slug='';
  user:any;
  listOfData: ItemData[] = [];
  isVisible = false;
  isVisibleShow = false;
  isVisibleUpdate = false;
  isConfirmLoading = false;
  isConfirmLoadingUpdate = false;
  services:any;
  hopitals:any;
  oneServices:any;
  formulaire:any;
  formulaireUpadate:any;
  slugHopital:any;

  yourCustomStyles = {
    height: '200px', // Exemple : définir la hauteur
    padding: '20px' // Exemple : définir le padding
  };
  constructor(
    private hopitalServie:HopitalService,
    private fb: FormBuilder,
    private modal: NzModalService,
    private activiService:ServiceService,
    private hopital:HopitalService,
    public connexionService:ConnexionService
    ) {
    encapsulation: ViewEncapsulation.None;
  }

  ngOnInit(): void {
    console.log(this.connexionService.userInfo.role);
    if(this.connexionService?.userInfo?.hopital?.length>0){
      if(this.connexionService.userInfo.role=="USER_HOPITAL"){
        this.slugHopital =this.connexionService?.userInfo?.hopital[0].slug;
      }
    }
    this.initForm();
    this.getAllHopital({'content':this.connexionService.userInfo?.pays});
    this.initFormUpadate();
  }
  initForm(){
    this.formulaire = this.fb.group({
      designation:[''],
      slug:[''],
      hopital:[this.connexionService.userInfo?.hopital[0].slug]
    });
  }

  initFormUpadate(){
    this.formulaireUpadate = this.fb.group({
      designation:[this.oneServices?.designation],
    })
  }

  create(){
    let date = new Date();
    let dateStrinb = date.toLocaleString();
    this.formulaire.patchValue({
      slug: btoa(dateStrinb)
    });

    this.activiService.createservice(this.formulaire.value).subscribe((data)=>{
     this.getAll({'content': this.slugHopital});
     this.formulaire.reset();
    });
  }

  getAll(form: ServiceDtoSend){
    this.activiService.getAllservice(form).subscribe((data)=>{
      this.services = data;
    })
  }
  getOne(service: any){
    this.oneServices = service;
    this.initFormUpadate();
  }

  getAllHopital(form:any){
    this.hopital.recherche(form).subscribe((data:any)=>{
      this.hopitals = data;
      this.getAll({'content':this.slugHopital});
    })
  }

  delete(id:any){
    this.activiService.delete(id).subscribe((data:any)=>{
      this.getAll({'content':this.slugHopital});
    })
  }

  editer(){
    this.activiService.updateservice(this.formulaireUpadate.value,this.oneServices.id).subscribe((data)=>{
      this.getAll({'content':this.slugHopital});
      this.handleOkUpdate();
    })
  }
  //connfirmation modification
  showConfirm(): void {
    this.modal.confirm({
      nzTitle: '<i>Voulez-vous vraiment modifié cette antité?</i>',
      nzOnOk: () =>{
        this.editer();
      }
    });
  }
  //Confirmation suppression
  showDeleteConfirm(id:any): void {
    this.modal.confirm({
      nzTitle: "Voulez-vous vraiment supprimer l'entité",
      nzContent: '<b style="color: red;">Une fois entité supprimée vous pourrez plus le recupperez ainsi toutes les données liées à cette entité</b>',
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
