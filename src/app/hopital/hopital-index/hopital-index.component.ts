import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {UserService} from "../../shared/services/web-services/user/user.service";
import {FormBuilder} from "@angular/forms";
import {NzModalService} from "ng-zorro-antd/modal";
import {HopitalService} from "../../shared/services/web-services/hopital/hopital.service";
import {ConnexionService} from "../../shared/services/authService/connextion/connexion.service";
import {HopitalReponseDto} from "../../shared/services/web-services/hopital/dto/hopital-reponse.dto";
import {UserEntity} from "../../core/entities/user.entity";
import {HopitalCreateComponent} from "../hopital-create/hopital-create.component";
import {HopitalEditComponent} from "../hopital-edit/hopital-edit.component";
import {HopitalEntity} from "../../core/entities/hopital.entity";

interface ItemData {
   numero_unique:string;
   agrement: string;
   adresse : string;
   tel: string;
   designation : string;
   date_creation: Date;
   pays: string;
}

@Component({
  selector: 'app-hopital-index',
  templateUrl: './hopital-index.component.html',
  styleUrls: ['./hopital-index.component.css']
})
export class HopitalIndexComponent {

  hopitals: HopitalReponseDto = [];
  slug = '';
  user!: UserEntity;
  listOfData: ItemData[] = [];
  pays= this.connexionService.userInfo;
  @ViewChild(HopitalCreateComponent) hopitalCreateComponent!: HopitalCreateComponent;
  @ViewChild(HopitalEditComponent) hopitalEditComponent!: HopitalEditComponent;

  constructor(
    private hopitalServie:HopitalService,
    private fb: FormBuilder,
    private modal: NzModalService,
    private userService:UserService,
    private connexionService:ConnexionService) {
    encapsulation: ViewEncapsulation.None;
  }

  ngOnInit(): void {
    this.connexionService.getUser();
    this.pays = this.connexionService.userInfo.pays;
    this.recherche({ "content": this.pays });
    this.executeHopital();
  }

  openEditeHoppital(hopital: HopitalEntity){
    this.hopitalEditComponent.showModal(hopital);
  }

  executeHopital(){
    this.userService.modalState$.subscribe((isVisible) => {
      this.recherche({ "content": this.pays });
    });
  }

  getAllHopital(){
    this.hopitalServie.getAllhopital().subscribe((data:any)=>{
      this.hopitals= data;
      for (let i = 0; i < this.hopitals?.length; i++) {
        this.listOfData.push({
          numero_unique: this.hopitals[i].numero_unique,
          agrement: this.hopitals[i].agrement,
          adresse : this.hopitals[i].adresse,
          tel: this.hopitals[i].tel,
          designation : this.hopitals[i].designation,
          date_creation: this.hopitals[i].date_creation,
          pays: this.hopitals[i].pays,
        });
      }
    });
  }

  openCreateHoppital(){
    this.hopitalCreateComponent.showModal1();
  }

  recherche(form:any){
    this.hopitalServie.recherche(form).subscribe((data:any)=>{
      this.hopitals= data;
      for (let i = 0; i < this.hopitals?.length; i++) {
        this.listOfData.push({
          numero_unique:this.hopitals[i].numero_unique,
          agrement: this.hopitals[i].agrement,
          adresse : this.hopitals[i].adresse,
          tel: this.hopitals[i].tel,
          designation : this.hopitals[i].designation,
          date_creation: this.hopitals[i].date_creation,
          pays: this.hopitals[i].pays,
        });
      }
    });
  }

  delete(id:any){
    this.hopitalServie.delete(id).subscribe((data:any)=>{
      this.getAllHopital();
    });
  }

  //Confirmation suppression
  showDeleteConfirm(id:any): void {
    this.modal.confirm({
      nzTitle: "Voulez-vous vraiment supprimer l'hopital?",
      nzOkText: 'Oui',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>{
        this.delete(id);
        console.log('OK')
      } ,
      nzCancelText: 'Non',
      nzOnCancel: () => console.log('Cancel')
    });
  }

}
