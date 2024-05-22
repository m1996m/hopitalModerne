import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {HopitalService} from "../../shared/services/web-services/hopital/hopital.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {PersonnelService} from "../../shared/services/web-services/personnel/personnel.service";
import {PatientService} from "../../shared/services/web-services/patient/patient.service";
import {ConnexionService} from "../../shared/services/authService/connextion/connexion.service";
import {ConsultationService} from "../../shared/services/web-services/consultation/consultation.service";
import {ConsultationDto} from "../../shared/services/web-services/consultation/dto/consultation.dto";
import {PersonnelResponseDto} from "../../shared/services/web-services/personnel/dto/personnel-response.dto";
import {HopitalReponseDto} from "../../shared/services/web-services/hopital/dto/hopital-reponse.dto";
import {ConsultationCreateComponent} from "../consultation-create/consultation-create.component";
import {ConsultationEditeComponent} from "../consultation-edite/consultation-edite.component";
import {ConsultationEntity} from "../../core/entities/consultation.entity";
import {UserEntity} from "../../core/entities/user.entity";

interface ItemData {
   plainte : string,
   allergie : string,
   precedent : string,
   autre : string,
   resultat : string,
   examens : string,
   fumeur : string,
   buveur : string,
   situation : string,
   cout : string,
   date_visite : string,
   taille : string,
   poids : string,
}

@Component({
  selector: 'app-consultation-index',
  templateUrl: './consultation-index.component.html',
  styleUrls: ['./consultation-index.component.css']
})
export class ConsultationIndexComponent {
  hopitals: HopitalReponseDto = [];
  slug = '';
  user!: UserEntity;
  listOfData: ItemData[] = [];
  personnels: PersonnelResponseDto = [];
  isConfirmLoading = false;
  isConfirmLoadingUpdate = false;
  consultations: ConsultationDto = [];
  slugHopital = '';
  slugPersonnel = '';
  slugSelect = '';
  @ViewChild(ConsultationCreateComponent) consultationCreateComponent!: ConsultationCreateComponent;
  @ViewChild(ConsultationEditeComponent) consultationEditeComponent!: ConsultationEditeComponent;

  constructor(
    private hopitalServie:HopitalService,
    private modal: NzModalService,
    private personnelService: PersonnelService,
    private patientService: PatientService,
    public connexionService: ConnexionService,
    private consultationService: ConsultationService,
  ) {
    encapsulation: ViewEncapsulation.None;
  }
  ngOnInit():void {
    this.executeFonctons();
    this.executeGetConsultation()
    this.rechercheHopital({"content": this.connexionService.userInfo.pays});
    this.getConsultation({'content': this.slugSelect});
  }

  executeFonctons(){
    this.getData();
    this.getConsultation({'content': this.slugSelect});
  }

  onpenConsultationCreate(){
    this.consultationCreateComponent.showModal();
  }

  onpenConsultationEdite(consultation: ConsultationEntity){
    this.consultationEditeComponent.showModal(consultation);
  }

  executeGetConsultation(){
    this.consultationService.modalState$.subscribe((isVisible) => {
      this.getConsultation({'content': this.slugSelect});
    });
  }

  getData(){
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
      nzTitle: "Voulez-vous vraiment supprimer le patient?",
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

  delete(slug: string){
    this.consultationService.delete(slug).subscribe((data)=>{
      this.getConsultation({'content': this.slugSelect});
    });
  }

  getConsultation(form: any){
    this.consultationService.getAllconsultation(form).subscribe((data:any)=>{
      this.consultations = data;

    });
  }

  rechercheConsultation(form: any){
    this.consultationService.recherche(form).subscribe((data:any)=>{
      this.consultations = data;
    });
  }

  rechercheHopital(form:any){
    this.hopitalServie.recherche(form).subscribe((data:any)=>{
      this.hopitals= data;
    });
  }

}
