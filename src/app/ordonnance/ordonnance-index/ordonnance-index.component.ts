import {Component, ViewEncapsulation} from '@angular/core';
import {HopitalService} from "../../shared/services/web-services/hopital/hopital.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {ConnexionService} from "../../shared/services/authService/connextion/connexion.service";
import {ConsultationService} from "../../shared/services/web-services/consultation/consultation.service";
import {OrdonnanceService} from "../../shared/services/web-services/ordonnance/ordonnance.service";

@Component({
  selector: 'app-ordonnance-index',
  templateUrl: './ordonnance-index.component.html',
  styleUrls: ['./ordonnance-index.component.css']
})
export class OrdonnanceIndexComponent {
  hopitals:any;
  slug='';
  user:any;
  personnels:any;
  isConfirmLoading = false;
  isConfirmLoadingUpdate = false;
  consultations:any;
  slugHopital:any;
  slugPersonnel:any;
  slugSelect = '';
  ordonnances: any;

  constructor(private hopitalServie:HopitalService, private modal: NzModalService, public connexionService: ConnexionService,
              private consultationService: ConsultationService, private ordonnanceService: OrdonnanceService,
  ) {
    encapsulation: ViewEncapsulation.None;
  }
  ngOnInit():void {
    this.executeFonctons();
  }

  executeFonctons(){
    this.getSlug();
    this.recherche({"content":this.connexionService.userInfo.pays});
    this.getOrdonnance({'content': this.slugSelect});
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
      this.user = this.connexionService.userInfo.personnel[0];
    }else if(this.connexionService.userInfo.role=="USER_PATIENT"){
      this.slugSelect = this.connexionService.userInfo.patient[0].slug;
      this.user = this.connexionService.userInfo.patient[0];
    }
  }

  //Confirmation suppression
  showDeleteConfirm(id:any): void {
    this.modal.confirm({
      nzTitle: "Voulez-vous vraiment supprimer cet examen?",
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
  delete(slug:any){
    this.ordonnanceService.delete(slug).subscribe((data:any)=>{
      this.getOrdonnance({'content': this.slugSelect});
    });
  }

  getOrdonnance(form: any){
    this.ordonnanceService.getAllordonnance(form).subscribe((data:any)=>{
      this.ordonnances = data;
      console.log(data);
    });
  }

  getRecherche(form: any){
    this.ordonnanceService.recherche(form).subscribe((data:any)=>{
      this.ordonnances = data;
    });
  }

  recherche(form:any){
    this.hopitalServie.recherche(form).subscribe((data:any)=>{
      this.hopitals= data;
    });
  }
}
