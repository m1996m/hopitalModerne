import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../../base.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  constructor(private http:HttpClient,private base:BaseService) { }

  private printSubject = new BehaviorSubject<boolean>(false);
  printObservable = this.printSubject.asObservable();

  setPrintStatus(printing: boolean): void {
    this.printSubject.next(printing);
  }

  createexamen(examen:any){
    return this.http.post(this.base.lien+'examen',examen);
  }

  update(examen:any, slug:any){
    return this.http.patch(this.base.lien+'examen/'+slug,examen);
  }

  recherche(examen:any){
    return this.http.post(this.base.lien+'examen/recherche',examen);
  }

  getAllexamen(data:any){
    return this.http.post(this.base.lien+'examen/liste',data);
  }

  getOneexamen(id:any){
    return this.http.get(this.base.lien+'examen/'+id);
  }

  delete(id:any){
    return this.http.delete(this.base.lien+'examen/'+id);
  }
}
