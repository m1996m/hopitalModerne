import {Component, ViewEncapsulation} from '@angular/core';
import {HopitalService} from "../../shared/services/web-services/hopital/hopital.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {PersonnelService} from "../../shared/services/web-services/personnel/personnel.service";
import {PatientService} from "../../shared/services/web-services/patient/patient.service";
import {ConnexionService} from "../../shared/services/authService/connextion/connexion.service";
import {ConsultationService} from "../../shared/services/web-services/consultation/consultation.service";
import {ExamenService} from "../../shared/services/web-services/examen/examen.service";

interface ItemData {
  resultat: string,
  image: string,
  consultation_id: string,
  autre: string,
  cout: string,
  patient_id: string,
  personnel_id: string,
  type: string,
  date_jour: any
}

@Component({
  selector: 'app-examen-index',
  templateUrl: './examen-index.component.html',
  styleUrls: ['./examen-index.component.css']
})
export class ExamenIndexComponent {
  hopitals:any;
  slug='';
  user:any;
  listOfData: ItemData[] = [];
  personnels:any;
  isConfirmLoading = false;
  isConfirmLoadingUpdate = false;
  consultations:any;
  slugHopital:any;
  slugPersonnel:any;
  slugSelect = '';
  examens: any;

  constructor(private hopitalServie:HopitalService, private modal: NzModalService, public connexionService: ConnexionService,
              private consultationService: ConsultationService, private examenService: ExamenService,
  ) {
    encapsulation: ViewEncapsulation.None;
  }
  ngOnInit():void {
    this.executeFonctons();
  }

  executeFonctons(){
    this.getSlug();
    this.recherche({"content":this.connexionService.userInfo.pays});
    this.getExamen({'content': this.slugSelect});
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
    this.examenService.delete(slug).subscribe((data:any)=>{
      this.getExamen({'content': this.slugSelect});
    });
  }

  getExamen(form: any){
    this.examenService.getAllexamen(form).subscribe((data:any)=>{
      this.examens = data;
    });
  }

  getRecherche(form: any){
    this.examenService.recherche(form).subscribe((data:any)=>{
      this.examens = data;
    });
  }

  recherche(form:any){
    this.hopitalServie.recherche(form).subscribe((data:any)=>{
      this.hopitals= data;
    });
  }

}
