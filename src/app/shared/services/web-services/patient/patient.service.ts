import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../../base.service";
import {HttpHelper} from "../../../../core/helpers/http.helper";
import {FormGroup} from "@angular/forms";
import {PatientResponseDto} from "./dto/patient-response.dto";
import {PatientEntity} from "../../../../core/entities/patient.entity";
import {UserService} from "../user/user.service";
import {Subject} from "rxjs";
import {GlobalDtoSend} from "../global/global.dto.send";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private readonly routePrefix = 'patient';
  public isVisible = false;
  private newElementSource = new Subject<void>();
  newElement$ = this.newElementSource.asObservable();

  constructor(
    private readonly httpHelper: HttpHelper,
    private userService: UserService,
  ) {
  }

  notifyModalState(isVisible: boolean): void {
    this.newElementSource.next();
  }

  createpatient(patient: FormGroup){
    return this.httpHelper.request<any>('POST', this.routePrefix, patient);
  }

  createpatientPersonnel(patient: FormGroup){
    return this.httpHelper.request<any>('POST', this.routePrefix+'/mesPatient/personnel', patient);
  }

  updatepatient(patient: FormGroup, slug: string){
    return this.httpHelper.request<any>('PATCH', this.routePrefix+'/'+slug, patient);
  }

  getAllpatient(data: GlobalDtoSend){
    return this.httpHelper.request<PatientResponseDto>('GET', this.routePrefix+'/liste', null, {content: data.content});
  }

  getOnepatient(slug: string){
    return this.httpHelper.request<PatientEntity>('GET', this.routePrefix+'/'+slug);
  }

  getEmailOneUser(email: string){
    return this.userService.getEmailOneUsser(email);
  }

  oneEmailpatient(email: string){
    return this.httpHelper.request<PatientEntity>('GET', this.routePrefix+'/onepatient/'+email);
  }

  delete(slug: string){
    return this.httpHelper.request<any>('DELETE', this.routePrefix+'/'+slug);
  }

}
