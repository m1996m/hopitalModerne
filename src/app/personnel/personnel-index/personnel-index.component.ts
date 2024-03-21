import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {HopitalService} from "../../shared/services/web-services/hopital/hopital.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {PersonnelService} from "../../shared/services/web-services/personnel/personnel.service";
import {ConnexionService} from "../../shared/services/authService/connextion/connexion.service";
import {PersonnelResponseDto} from "../../shared/services/web-services/personnel/dto/personnel-response.dto";
import {HopitalReponseDto} from "../../shared/services/web-services/hopital/dto/hopital-reponse.dto";
import {UserEntity} from "../../core/entities/user.entity";
import {PersonnelCreateComponent} from "../personnel-create/personnel-create.component";
import {PersonnelEditeComponent} from "../personnel-edite/personnel-edite.component";
import {PersonnelEntity} from "../../core/entities/personnel.entity";


interface ItemData {
  poste: string,
  tel: string,
  nom: string,
  prenom: string,
  adresse: string,
  profile: string,
  service: string,
  hopital: string,
  date_naissance: Date,
  nationnalite: string,
  email: string,
  description: string,
  genre: 'Femme' | 'Homme'
}
@Component({
  selector: 'app-personnel-index',
  templateUrl: './personnel-index.component.html',
  styleUrls: ['./personnel-index.component.css']
})
export class PersonnelIndexComponent {
  hopitals: HopitalReponseDto = [];
  slug='';
  user!: UserEntity;
  listOfData: ItemData[] = [];
  personnels: PersonnelResponseDto = [];
  isConfirmLoading = false;
  isConfirmLoadingUpdate = false;
  slugHopital = '';
  @ViewChild(PersonnelCreateComponent) personnelCreateComponent!: PersonnelCreateComponent;
  @ViewChild(PersonnelEditeComponent) personnelEditeComponent!: PersonnelEditeComponent;


  constructor(private hopitalServie:HopitalService, private modal: NzModalService,private personnelService: PersonnelService,public connexionService:ConnexionService) {
    encapsulation: ViewEncapsulation.None;
  }

  ngOnInit():void {
    this.getData();
    this.recherche({"content": this.connexionService.userInfo?.pays});
    this.executePersonnel();
    this.getPersonnel(this.slugHopital);
  }

  getData(){
    if(this.connexionService?.userInfo?.hopital?.length>0){
      if(this.connexionService.userInfo.role=="USER_HOPITAL"){
        this.slugHopital =this.connexionService?.userInfo?.hopital[0].slug;
      }else{
        if(this.connexionService.userInfo.role=="USER_PERSONNEL"){
          this.slugHopital =this.connexionService?.userInfo?.personnel[0].hopital;
        }
      }
    }
  }

  openCrete(){
    this.personnelCreateComponent.showModal1();
  }

  openEdite(data: PersonnelEntity){
    this.personnelEditeComponent.showModal1(data);
  }

  executePersonnel(){
    this.personnelService.modalState$.subscribe((isVisible) => {
      this.getPersonnel(this.slugHopital);
    });
  }

  //Confirmation suppression
  showDeleteConfirm(id:any): void {
    this.modal.confirm({
      nzTitle: "Voulez-vous vraiment supprimer le personnel?",
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
    this.personnelService.delete(id).subscribe((data)=>{
      this.getPersonnel(this.slugHopital);
    });
  }

  getPersonnel(slug: string){
    this.personnelService.getAllpersonnel(slug).subscribe((data)=>{
      this.personnels = data;
      for (let i = 0; i < this.hopitals?.length; i++) {
        this.listOfData.push({
          poste: this.personnels[i]?.poste,
          tel: this.personnels[i]?.tel,
          nom: this.personnels[i]?.nom,
          prenom: this.personnels[i]?.prenom,
          adresse: this.personnels[i]?.adresse,
          profile: this.personnels[i]?.profile,
          service: this.personnels[i]?.service,
          hopital: this.personnels[i]?.hopital,
          date_naissance: this.personnels[i]?.date_naissance,
          nationnalite: this.personnels[i]?.nationnalite,
          email: this.personnels[i]?.email,
          description: this.personnels[i]?.description,
          genre: this.personnels[i]?.genre
        });

      }
    });
  }

  recherche(form:any){
    this.hopitalServie.recherche(form).subscribe((data)=>{
      this.hopitals= data;
    });
  }

}
