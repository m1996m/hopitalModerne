import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../../base.service";
import {BehaviorSubject, Subject} from "rxjs";
import {HttpHelper} from "../../../../core/helpers/http.helper";
import {FormBuilder} from "@angular/forms";
import {GlobalDtoSend, GlobalDtoSendStringOneDate} from "../global/global.dto.send";
import {GlobalSuccessDto} from "../global/globalSuccess.dto";
import {ExamenEntity} from "../../../../core/entities/examen.entity";
import {ExamenResponseDto} from "./dto/examen-response.dto";

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  private readonly routePrefix = 'examen';
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

  createexamen(examen: FormBuilder){
    return this.httpHelper.request<GlobalSuccessDto>('POST', `${this.routePrefix}`, examen);
  }

  update(examen: FormBuilder, slug: string){
    return this.httpHelper.request<GlobalSuccessDto>('PATCH', `${this.routePrefix}/${slug}`, examen);
  }

  recherche(globalTwoValueWithDate: GlobalDtoSendStringOneDate){
    let data = {
      content: globalTwoValueWithDate.content,
      date_jour: globalTwoValueWithDate.date_jour
    }
    return this.httpHelper.request<ExamenResponseDto>('GET', `${this.routePrefix}/recherche/listeExamen`, null, data);
  }

  getAllexamen(data: GlobalDtoSend){
    let datas = {
      content: data.content
    }
    return this.httpHelper.request<ExamenResponseDto>('GET', `${this.routePrefix}/liste/all`, null, datas);
  }

  getOneexamen(slug: string){
    return this.httpHelper.request<ExamenEntity>('GET', `${this.routePrefix}/${slug}`);
  }

  delete(slug: string){
    return this.httpHelper.request<GlobalSuccessDto>('DELETE', `${this.routePrefix}/${slug}`);
  }
}
