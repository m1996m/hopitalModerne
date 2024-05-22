import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {HopitalService} from "../../shared/services/web-services/hopital/hopital.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {ConnexionService} from "../../shared/services/authService/connextion/connexion.service";
import {ConsultationService} from "../../shared/services/web-services/consultation/consultation.service";
import {ExamenService} from "../../shared/services/web-services/examen/examen.service";
import {HopitalReponseDto} from "../../shared/services/web-services/hopital/dto/hopital-reponse.dto";
import {PersonnelResponseDto} from "../../shared/services/web-services/personnel/dto/personnel-response.dto";
import {ConsultationDto} from "../../shared/services/web-services/consultation/dto/consultation.dto";
import {ExamenResponseDto} from "../../shared/services/web-services/examen/dto/examen-response.dto";
import {GlobalDtoSend, GlobalDtoSendStringOneDate} from "../../shared/services/web-services/global/global.dto.send";
import {UserEntity} from "../../core/entities/user.entity";
import {ExamenCreateComponent} from "../examen-create/examen-create.component";
import {ExamenEditeComponent} from "../examen-edite/examen-edite.component";
import {ExamenEntity} from "../../core/entities/examen.entity";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PersonnelService} from "../../shared/services/web-services/personnel/personnel.service";

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
  formulaires!: FormGroup;
  examens: ExamenResponseDto = [];
  @ViewChild(ExamenCreateComponent) examenCreateComponent!: ExamenCreateComponent;
  @ViewChild(ExamenEditeComponent) examenEditeComponent!: ExamenEditeComponent;
  role = '';

  constructor(
    private hopitalServie:HopitalService,
    private modal: NzModalService,
    public connexionService: ConnexionService,
    private consultationService: ConsultationService,
    private examenService: ExamenService,
    private fb: FormBuilder,
    private personnelService: PersonnelService
  ) {
    encapsulation: ViewEncapsulation.None;
  }
  ngOnInit():void {
    this.executeFonctons();
  }

  openCreateExamen(){
    this.examenCreateComponent.showModal();
  }

  openEditeExamen(examen: ExamenEntity){
    this.examenEditeComponent.showModal(examen);
  }

  initForm(){
    this.formulaires = this.fb.group({
      content: [this.slugSelect],
      date_jour: [(new Date()).toISOString().substring(0, 10)],
    });
  }

  executeFonctons(){
    this.getData();
    this.initForm();
    this.getHopitals({"content": this.connexionService.userInfo.pays});
    this.getRecherche();
    this.getPersonnel();
  }

  getData(){
    this.role = this.connexionService.userInfo.role;
    if(this.connexionService?.userInfo?.hopital?.length > 0 || this.connexionService?.userInfo?.personnel?.length>0){
      if(this.connexionService.userInfo.role == "USER_HOPITAL"){
        this.slugHopital =this.connexionService?.userInfo?.hopital[0].slug;
      }else{
        if(this.connexionService.userInfo.role == "USER_PERSONNEL"){
          this.slugHopital = this.connexionService.userInfo.personnel[0].hopital;
        }
      }
    }

    if(this.connexionService?.userInfo?.personnel?.length>0){
      if(this.connexionService.userInfo.role == "USER_HOPITAL"){
        this.slugPersonnel = this.connexionService?.userInfo?.personnel[0].slug;
      }else{
        if(this.connexionService.userInfo.role == "USER_PERSONNEL"){
          this.slugPersonnel = this.connexionService.userInfo.personnel[0].slug;
        }
      }
    }
    if (this.connexionService.userInfo.role == "USER_PERSONNEL"){
      this.slugSelect= this.slugPersonnel;
      this.user = this.connexionService.userInfo.personnel[0];
    }else if(this.connexionService.userInfo.role == "USER_PATIENT"){
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
    this.examenService.delete(slug).subscribe((data)=>{
      this.getExamen({'content': this.slugSelect});
    });
  }

  executeGetConsultation(){
    this.consultationService.modalState$.subscribe((isVisible) => {
      this.getRecherche();
    });
  }

  getExamen(form: GlobalDtoSend){
    this.examenService.getAllexamen(form).subscribe((data:any)=>{
      this.examens = data;
    });
  }

  getRecherche(){
    this.examenService.recherche(this.formulaires.value).subscribe((data:any)=>{
      this.examens = data;
    });
  }

  getPersonnel(){
    this.personnelService.recherche(this.slugHopital).subscribe((data:any)=>{
      this.personnels = data;
      console.log('personnel ', data)
    });
  }

  getHopitals(form: GlobalDtoSend){
    this.hopitalServie.recherche(form).subscribe((data:any)=>{
      this.hopitals= data;
    });
  }

}
