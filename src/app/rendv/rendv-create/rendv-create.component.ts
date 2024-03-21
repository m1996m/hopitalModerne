import { Component } from '@angular/core';
import {RdvModel} from "../../core/models/rdv.model";
import {RdvService} from "../../shared/services/web-services/rdv/rdv.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {PersonnelService} from "../../shared/services/web-services/personnel/personnel.service";
import {ConnexionService} from "../../shared/services/authService/connextion/connexion.service";
import {PersonnelResponseDto} from "../../shared/services/web-services/personnel/dto/personnel-response.dto";
import {PersonnelEntity} from "../../core/entities/personnel.entity";

@Component({
  selector: 'app-rendv-create',
  templateUrl: './rendv-create.component.html',
  styleUrls: ['./rendv-create.component.css']
})
export class RendvCreateComponent {
  dates = new Date();
  formulaire!: FormGroup;
  rdv: RdvModel= new RdvModel('','','','');
  rend = Array<{personnel_id: any,date_jour: string, plage: string, slug: string}>();
  currentStartDate = new Date();
  days=Array <{ jour: any,date:any } >();
  weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  isSemaine = false;
  Choix: string = '';
  personnels: PersonnelResponseDto = [];
  slugHopital: string = '';
  onePeonnel!: PersonnelEntity;
  dategenere: string = '';
  isVisible = false;
  role = 'USER_PERSONNEL';
  yourCustomStyles = {
    height: '500px', // Exemple : définir la hauteur
    padding: '20px' // Exemple : définir le padding
  };

  constructor(
    private rdvService: RdvService,
    private fb: FormBuilder,
    private router: Router,
    private personnelService: PersonnelService,
    public connexionService: ConnexionService
  ) {}

  ngOnInit():void{
    this.getData();
    this.initForm();
    this.getPersonnel(this.slugHopital)
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
  }

  showModal(): void {
    this.isVisible = true;
    this.rdvService.notifyModalState(this.isVisible);
  }

  handleCancel(): void {
    this.isVisible = false;
    this.rdvService.notifyModalState(this.isVisible);
  }

  initForm(){
    let date = new Date();
    let dateStrinb = date.toLocaleString()+''+date.toLocaleString();
    let slug = btoa(dateStrinb);
    this.formulaire = this.fb.group({
      personnel_id: [''],
      date_jour: [''],
      plage: [''],
      slug: [slug],
      choix: [''],
      fin: [''],
      heureDebut: [''],
      heureFin: [''],
      heureDebutPause: [''],
      heureFinPause: [''],
      intervalle: [''],
    });
  }

  getdate(){
    if(this.formulaire.value['date_jour'].length>2  && this.formulaire.value['fin'].length>2) {
      this.datesSameWeek(new Date(this.formulaire.value['date_jour']),new Date(this.formulaire.value['fin']));
      this.generateDaysBetweenDates(new Date(this.formulaire.value['date_jour']),new Date(this.formulaire.value['fin']))
    }
  }

  getOnePernnel(){
    this.personnelService.getOnepersonnel(this.formulaire.value['personnel_id']).subscribe((data)=>{
      this.onePeonnel = data;
    });
  }

  getPersonnel(form: any){
    this.personnelService.getAllpersonnel(form).subscribe((data)=>{
      this.personnels = data;
    });
  }

  enregistrer(){

    let personnel_id= this.formulaire.value['slug'];
    if (this.connexionService.userInfo.role == "USER_PERSONNEL"){
       personnel_id = this.connexionService.userInfo.personnel[0].slug;
    }

    let debutT = this.formulaire.value['heureDebut'].substring(0,2)+'h'+this.formulaire.value['heureDebut'].substring(3,5);
    let finT = this.formulaire.value['heureFin'].substring(0,2)+'h'+this.formulaire.value['heureFin'].substring(3,5);
    let debutP = this.formulaire.value['heureDebutPause'].substring(0,2)+'h'+this.formulaire.value['heureDebutPause'].substring(3,5);
    let finP = this.formulaire.value['heureFinPause'].substring(0,2)+'h'+this.formulaire.value['heureFinPause'].substring(3,5);
    let heures = this.generateTimeSlots(debutT,finT,this.formulaire.value['intervalle'], debutP,finP);
    this.rend.push({personnel_id:personnel_id,date_jour: this.days[0].date,plage: heures[0].start,slug:this.formulaire.value['slug']});
    let k=0;
    for(let i=0; i<this.days.length;i++){
      for (let j=0; j<heures.length;j++){
        k++;
        this.rdvService.createrdv({personnel_id: this.formulaire.value['personnel_id'], date_jour: this.days[i].date
            + 'T00:00:00.000Z', plage: heures[j].start, slug:this.formulaire.value['slug']+k,
          type: this.formulaire.value['Consultation']}).subscribe((data:any)=>{
          if (i==this.days.length-1 && j == heures.length-1){
            this.handleCancel();
          }
        });
      }
    }
  }

//Verification si deux dates font partir de la meme semaine;
  datesSameWeek(date1: Date, date2: Date): boolean {

    this.isSemaine = false;
    // Calculer la différence en jours entre les deux dates
    const diffInDays = Math.abs((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24));

/*    // Si la différence est inférieure à 6 jours, retourner false
    if (diffInDays < 6) {
      this.isSemaine= false
      return this.isSemaine;
    }*/

    // Vérifier si les deux dates appartiennent à la même semaine
    const startOfWeek = (date: Date) => {
      const d = new Date(date);
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1); // ajustement pour le dimanche
      return new Date(d.setDate(diff));
    };

    // Si les deux dates n'appartiennent pas à la même semaine, retourner false
    if (startOfWeek(date1).getTime() !== startOfWeek(date2).getTime()) {
      this.isSemaine= false
      return this.isSemaine;
    }

    // Si les deux conditions sont vérifiées, retourner true
    this.isSemaine= true;
    return this.isSemaine;
  }


  startOfWeek(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust for Sunday
    return new Date(d.setDate(diff));
  }

  //Generation date et jour de la semaine
  generateWeekDays(): void {
    this.days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(this.currentStartDate);
      date.setDate(date.getDate() + i);
      this.days.push({ date:date,jour:this.weekDays[i] });
    }
  }

  nextWeek(): void {
    this.currentStartDate.setDate(this.currentStartDate.getDate() + 7);
    this.generateWeekDays();
  }

  previousWeek(): void {
    this.currentStartDate.setDate(this.currentStartDate.getDate() - 7);
    this.generateWeekDays();
  }

  //Generation des heures en fonction des paramettre
  generateTimeSlots(heureDebut: string, heureFin: string, intervalTemps: number, debutHeurePause: string, finHeurePause: string): { start: string, end: string }[] {
    let slots: { start: string, end: string }[] = [];
    let current = this.timeStringToDate(heureDebut);
    const end = this.timeStringToDate(heureFin);
    const breakStart = this.timeStringToDate(debutHeurePause);
    const breakEnd = this.timeStringToDate(finHeurePause);

    while (current < end) {
      let slotEnd = new Date(current.getTime() + intervalTemps * 60000); // Ajouter l'intervalle en minutes

      // Si l'intervalle actuel chevauche la pause, on saute à la fin de la pause
      if (current < breakEnd && slotEnd > breakStart) {
        current = breakEnd;
        continue;
      }

      // Assurez-vous que le dernier intervalle ne dépasse pas l'heure de fin
      if (slotEnd > end) {
        slotEnd = end;
      }

      slots.push({
        start: this.dateToTimeString(current),
        end: this.dateToTimeString(slotEnd)
      });

      // Mettre à jour l'heure actuelle pour l'intervalle suivant
      current = slotEnd;
    }
    return slots;
  }

// Convertit une chaîne d'heure en objet Date
  timeStringToDate(time: string): Date {
    const [hours, minutes] = time.split('h').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

// Convertit un objet Date en chaîne d'heure
  dateToTimeString(date: Date): string {
    return `${date.getHours()}h${String(date.getMinutes()).padStart(2, '0')}`;
  }

  //generation date et jour en fontion des dates entré en paramettre
  generateDaysBetweenDates(startDate: Date, endDate: Date) {
    const daysInFrench = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      // Si le jour n'est ni un samedi (6) ni un dimanche (0)
      if (currentDate.getDay() !== 6 && currentDate.getDay() !== 0) {
        this.days.push({
          jour: daysInFrench[currentDate.getDay()],
          date: currentDate.toISOString().split('T')[0]
        });
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

}
