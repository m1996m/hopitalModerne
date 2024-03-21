import { Injectable } from '@angular/core';
import {HttpHelper} from "../../../../core/helpers/http.helper";
import {FormGroup} from "@angular/forms";
import {HopitalReponseDto} from "./dto/hopital-reponse.dto";
import {HopitalEntity} from "../../../../core/entities/hopital.entity";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HopitalService {

  private readonly routePrefix = 'hopital';
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

  createhopital(hopital: FormGroup){
    return this.httpHelper.request<any>('POST', this.routePrefix+'/',hopital)
  }

  updatehopital(hopital: FormGroup, slug: string){
    return this.httpHelper.request<any>('PATCH', this.routePrefix+'/'+slug, hopital)
  }

  getAllhopital(){
    return this.httpHelper.request<HopitalReponseDto>('GET', this.routePrefix)
  }

  getOneHopital(id: string){
    return this.httpHelper.request<HopitalEntity>('GET', this.routePrefix+'/'+id);
  }

  recherche(content: any){
    return this.httpHelper.request<HopitalReponseDto>('GET', this.routePrefix+'/liste/recherche',null, {content: content.content});
  }

  delete(id:any){
    return this.httpHelper.request<any>('DELETE', this.routePrefix+'/'+id)
  }
}
