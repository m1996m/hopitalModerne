import {Component, ViewChild} from '@angular/core';
import {RdvService} from "../../shared/services/web-services/rdv/rdv.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {PersonnelService} from "../../shared/services/web-services/personnel/personnel.service";
import {ConnexionService} from "../../shared/services/authService/connextion/connexion.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {Subscription} from "rxjs";
import {RendvCreateComponent} from "../rendv-create/rendv-create.component";


@Component({
  selector: 'app-rendv-index',
  templateUrl: './rendv-index.component.html',
  styleUrls: ['./rendv-index.component.css']
})
export class RendvIndexComponent {
  rdvs: any;
  currentStartDate= new Date();
  slugHopital = '';
  personnels:any;
  dateJour:any;
  days=Array <{ jour: any,date:any } >();
  weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  debut:any;
  fin:any;
  slugPersonnel = '';
  // Variables pour la pagination
  currentPage = 1;
  pageSize = 10; // nombre de rendez-vous par page
  currentRdvs = [];
  subscription!: Subscription;
  @ViewChild(RendvCreateComponent) rendvCreateComponent!: RendvCreateComponent;


  constructor(
    private rdvService: RdvService,
    private fb: FormBuilder,
    private router: Router,
    private personnelService: PersonnelService,
    public connexionService: ConnexionService,
    private modal: NzModalService
  ) {
  }

  ngOnInit():void{
    this.getData();
    this.generateWeekDays();
    this.dateJour = this.currentStartDate.toLocaleString().substring(6,10)+'-'+this.currentStartDate.toLocaleString().substring(3,5)+'-'+this.currentStartDate.toLocaleString().substring(0,2);
    this.debut = this.days[0]?.date.toLocaleString().substring(6,10)+'-'+this.days[0]?.date.toLocaleString().substring(3,5)+'-'+this.days[0]?.date.toLocaleString().substring(0,2);
    this.fin = this.days[this.days.length-1]?.date.toLocaleString().substring(6,10)+'-'+this.days[this.days.length-1]?.date.toLocaleString().substring(3,5)+'-'+this.days[this.days.length-1]?.date.toLocaleString().substring(0,2);
    this.getPersonnel(this.slugHopital);
    this.getRendezvous({'content': this.debut, 'fin': this.fin, 'personnel_id': this.slugPersonnel});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  executePatient(){
    this.personnelService.modalState$.subscribe(() => {
      this.getRendezvous({'content': this.debut, 'fin': this.fin, 'personnel_id': this.slugPersonnel});
    });
  }

  getData(){
    if(this.connexionService?.userInfo?.hopital?.length > 0 || this.connexionService?.userInfo?.personnel?.length > 0){
      if(this.connexionService.userInfo.role == "USER_HOPITAL"){
        this.slugHopital = this.connexionService?.userInfo?.hopital[0].slug;
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
  }

  openCreateRendv(){
    this.rendvCreateComponent.showModal();
  }

  changePage(pageIndex: number): void {
    const start = (pageIndex - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.currentRdvs = this.rdvs.slice(start, end);
    this.currentPage = pageIndex;
  }

  generateWeekDays(): void {
    this.days = [];
    // Trouver le dernier lundi
    const date = new Date(this.currentStartDate);
    while (date.getDay() !== 1) {  // 1 correspond à Lundi
      date.setDate(date.getDate() - 1);
    }

    // Maintenant, nous sommes sur le dernier lundi.
    // Générer les jours à partir de ce lundi
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(date);
      currentDate.setDate(currentDate.getDate() + i);
      this.days.push({ date: currentDate, jour: this.weekDays[i] });
    }
  }

  getPersonnel(form: any){
    this.personnelService.getAllpersonnel(form).subscribe((data:any)=>{
      this.personnels = data;
    });
  }

  delete(id:any){
    this.personnelService.delete(id).subscribe((data:any)=>{
      this.getRendezvous({'content': this.dateJour, 'personnel_id':this.slugHopital});
    });
  }

  //Confirmation suppression
  showDeleteConfirm(id:any): void {
    this.modal.confirm({
      nzTitle: "Voulez-vous vraiment supprimer ce rendez-vous?",
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

  getRendezvous(form: any){
    this.rdvService.getAllrdv(form).subscribe((data:any)=>{
      this.rdvs = data;
    });
  }

}
