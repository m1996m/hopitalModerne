import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../../base.service";
import {BehaviorSubject, Subject} from "rxjs";
import {HttpHelper} from "../../../../core/helpers/http.helper";
import {ConsultationDto} from "./dto/consultation.dto";
import {GlobalDtoSend} from "../global/global.dto.send";
import {ConsultationSendDto} from "./dto/consultation.send.dto";
import {ConsultationEntity} from "../../../../core/entities/consultation.entity";

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  private readonly routePrefix = 'consultation';
  public isVisible = false;
  private modalStateSource = new Subject<boolean>();
  modalState$ = this.modalStateSource.asObservable();

  constructor(
    private readonly httpHelper: HttpHelper
  ) {
  }

  notifyModalState(isVisible: boolean): void {
    this.modalStateSource.next(isVisible);
  }

  private printSubject = new BehaviorSubject<boolean>(false);
  printObservable = this.printSubject.asObservable();

  setPrintStatus(printing: boolean): void {
    this.printSubject.next(printing);
  }

  createconsultation(consultation: any){
    return this.httpHelper.request<any>('POST', `${this.routePrefix}`, consultation);
  }

  update(consultation: any, slug: string){
    return this.httpHelper.request<any>('PATCH', `${this.routePrefix}/`+slug, consultation);
  }

  recherche(consultation: ConsultationSendDto){
    return this.httpHelper.request<ConsultationDto>('POST', `${this.routePrefix}/recherch`, consultation);
  }

  rechercheConsultationExamenNone(consultation: GlobalDtoSend){
    return this.httpHelper.request<ConsultationDto>('GET', `${this.routePrefix}/examen/recherche`, null,
      {content: consultation.content});
  }

  getAllconsultation(data: GlobalDtoSend){
    return this.httpHelper.request<ConsultationDto>('GET', `${this.routePrefix}/liste/getAll`, null,
      {content: data.content});
  }

  getOneconsultation(slug: string){
    return this.httpHelper.request<ConsultationEntity>('GET', `${this.routePrefix}/${slug}`);
  }

  delete(slug: string){
    return this.httpHelper.request<any>('DELETE', `${this.routePrefix}/${slug}`);
  }

}
