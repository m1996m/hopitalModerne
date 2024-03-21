import { Injectable } from '@angular/core';
import {HttpHelper} from "../../../../core/helpers/http.helper";
import {FormGroup} from "@angular/forms";
import {RdvResponseDto} from "./dto/rdv-response.dto";
import {RdvEntity} from "../../../../core/entities/rdv.entity";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RdvService {

  private readonly routePrefix = 'rdv';
  public isVisible = false;
  private modalStateSource = new Subject<boolean>();
  modalState$ = this.modalStateSource.asObservable();

  constructor(
    private readonly httpHelper: HttpHelper,
  ) {
  }

  notifyModalState(isVisible: boolean): void {
    this.modalStateSource.next(isVisible);
  }

  createrdv(rdv: any){
    return this.httpHelper.request<any>('POST', this.routePrefix, rdv)
  }

  createRdvPatient(rdv: any){
    return this.httpHelper.request<any>('POST', this.routePrefix+'patient/rdv', rdv);
  }

  updaterRvPateint(rdv: FormGroup, id: number){
    return this.httpHelper.request<any>('PATCH', this.routePrefix+'modification/rdv/pateint/'+id, rdv);
  }

  updaterdv(rdv: FormGroup, slug: string){
    return this.httpHelper.request<any>('PATCH', this.routePrefix+'/'+slug, rdv)
  }

  getAllrdv(data: any){
    return this.httpHelper.request<RdvResponseDto>('POST', this.routePrefix+'/liste', data);
  }

  getAllrdvRecherche(data:any){
    return this.httpHelper.request<RdvResponseDto>('POST', this.routePrefix+'/liste/recherche', data);
  }

  getOnerdv(slug: string){
    return this.httpHelper.request<RdvEntity>('GET', this.routePrefix+'/'+slug);
  }

  rdvPatient(slug: string){
    return this.httpHelper.request<RdvResponseDto>('GET', this.routePrefix+'/mesRdv'+ {slug: slug});
  }

  delete(slug: string){
    return this.httpHelper.request<any>('DELETE', this.routePrefix+'/'+ slug);
  }
  deletePatientRdv(id: number){
    return this.httpHelper.request<any>('DELETE', this.routePrefix+'/delete/patientRdv/'+ id);
  }

}
