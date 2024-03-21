import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {HopitalService} from "../../shared/services/web-services/hopital/hopital.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {PersonnelService} from "../../shared/services/web-services/personnel/personnel.service";
import {PatientService} from "../../shared/services/web-services/patient/patient.service";
import {ConnexionService} from "../../shared/services/authService/connextion/connexion.service";
import {HopitalReponseDto} from "../../shared/services/web-services/hopital/dto/hopital-reponse.dto";
import {UserEntity} from "../../core/entities/user.entity";
import {PersonnelResponseDto} from "../../shared/services/web-services/personnel/dto/personnel-response.dto";
import {PatientResponseDto} from "../../shared/services/web-services/patient/dto/patient-response.dto";
import {PatientCreateComponent} from "../patient-create/patient-create.component";
import {PatientEditeComponent} from "../patient-edite/patient-edite.component";
import {PatientEntity} from "../../core/entities/patient.entity";
import {Subscription} from "rxjs";

interface ItemData {
  tel: string,
  nom: string,
  prenom: string,
  adresse: string,
  profession: string,
  hopital: string,
  date_naissance: Date,
  nationnalite: string,
  email: string,
  description: string,
  genre: string
}

@Component({
  selector: 'app-patient-index',
  templateUrl: './patient-index.component.html',
  styleUrls: ['./patient-index.component.css']
})
export class PatientIndexComponent {
  hopitals: HopitalReponseDto = [];
  slug = '';
  user!: UserEntity;
  listOfData: ItemData[] = [];
  personnels: PersonnelResponseDto = [];
  isConfirmLoading = false;
  isConfirmLoadingUpdate = false;
  patients: PatientResponseDto = [];
  slugHopital: string = '';
  slugPersonnel: string = '';
  @ViewChild(PatientCreateComponent) patientCreateComponent!: PatientCreateComponent;
  @ViewChild(PatientEditeComponent) patientEditeComponent!: PatientEditeComponent;
  subscription!: Subscription;

  constructor(
    private hopitalServie: HopitalService,
    private modal: NzModalService,
    private personnelService: PersonnelService,
    private patientService: PatientService,
    public connexionService: ConnexionService
  ) {
    this.personnelService.modalState$.subscribe(() => {
      this.getPatient({'content': this.slugPersonnel});
    });
    encapsulation: ViewEncapsulation.None;
  }
  ngOnDestroy() {
    // Se désabonner lors de la destruction du composant
    this.subscription.unsubscribe();
  }

  ngOnInit():void {
    this.getData();
    this.executePatient();
    this.recherche({"content": this.connexionService.userInfo.pays});
    this.getPersonnel();
    this.getPatient({'content': this.slugPersonnel});
  }

  executePatient(){
    this.personnelService.modalState$.subscribe(() => {
      this.getPatient({'content': this.slugPersonnel});
    });
  }

  getData(){
    if(this.connexionService?.userInfo?.hopital?.length>0 || this.connexionService?.userInfo?.personnel?.length>0){
      if(this.connexionService.userInfo.role == "USER_HOPITAL"){
        this.slugHopital = this.connexionService?.userInfo?.hopital[0].slug;
      }else{
        if(this.connexionService.userInfo.role == "USER_PERSONNEL"){
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
  }

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

  delete(id:any){
    this.patientService.delete(id).subscribe((data:any)=>{
      this.getPatient({'content': this.slugPersonnel});
    });
  }

  openCreatePatient(){
    this.patientCreateComponent.showModal();
  }

  openEditePatient(patient: PatientEntity){
    this.patientEditeComponent.showModal(patient);
  }

  getPatient(form: any){
    this.patientService.getAllpatient(form).subscribe((data:any)=>{
      this.patients = data;
      for (let i = 0; i < this.hopitals?.length; i++) {
        this.listOfData.push({
          tel: this.patients[i]?.tel,
          nom: this.patients[i]?.nom,
          prenom: this.patients[i]?.prenom,
          adresse: this.patients[i]?.adresse,
          profession: this.patients[i]?.profession,
          hopital: this.patients[i]?.hopital,
          date_naissance: this.patients[i]?.date_naissance,
          nationnalite: this.patients[i]?.nationnalite,
          email: this.patients[i]?.email,
          description: this.patients[i]?.description,
          genre:this.patients[i]?.genre
        });

      }
    });
  }

  getPersonnel(){
    this.personnelService.getAllpersonnel(this.slugHopital).subscribe((data)=>{
      this.personnels = data;
    });
  }

  recherche(form:any){
    this.hopitalServie.recherche(form).subscribe((data: HopitalReponseDto)=>{
      this.hopitals = data;
    });
  }
}
