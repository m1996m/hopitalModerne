import { Component } from '@angular/core';
import {HopitalService} from "../../shared/services/web-services/hopital/hopital.service";
import {FormBuilder} from "@angular/forms";
import {ServiceService} from "../../shared/services/web-services/service/service.service";
import {ConsultationService} from "../../shared/services/web-services/consultation/consultation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConnexionService} from "../../shared/services/authService/connextion/connexion.service";
import {PatientService} from "../../shared/services/web-services/patient/patient.service";

@Component({
  selector: 'app-rendv-edite',
  templateUrl: './rendv-edite.component.html',
  styleUrls: ['./rendv-edite.component.css']
})
export class RendvEditeComponent {


}
