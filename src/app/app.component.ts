import {Component, Input} from '@angular/core';
import {Subscription} from "rxjs";
import {ConsultationService} from "./shared/services/web-services/consultation/consultation.service";
import {ConnexionService} from "./shared/services/authService/connextion/connexion.service";
import {HopitalService} from "./shared/services/web-services/hopital/hopital.service";
import {ExamenService} from "./shared/services/web-services/examen/examen.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


}
