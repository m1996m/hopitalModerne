import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../../base.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  constructor(private http:HttpClient,private base:BaseService) { }

  private printSubject = new BehaviorSubject<boolean>(false);
  printObservable = this.printSubject.asObservable();

  setPrintStatus(printing: boolean): void {
    this.printSubject.next(printing);
  }

  createconsultation(consultation:any){
    return this.http.post(this.base.lien+'consultation',consultation);
  }

  update(consultation:any, slug:any){
    return this.http.patch(this.base.lien+'consultation/'+slug,consultation);
  }

  recherche(consultation:any){
    return this.http.post(this.base.lien+'consultation/recherche',consultation);
  }

  rechercheConsultationExamenNone(consultation:any){
    return this.http.post(this.base.lien+'consultation/examen/recherche',consultation);
  }

  getAllconsultation(data:any){
    return this.http.post(this.base.lien+'consultation/liste',data);
  }

  getOneconsultation(id:any){
    return this.http.get(this.base.lien+'consultation/'+id);
  }

  delete(id:any){
    return this.http.delete(this.base.lien+'consultation/'+id);
  }

}
