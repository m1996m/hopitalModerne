import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../../base.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrdonnanceService {

  constructor(private http:HttpClient,private base:BaseService) { }

  private printSubject = new BehaviorSubject<boolean>(false);
  printObservable = this.printSubject.asObservable();

  setPrintStatus(printing: boolean): void {
    this.printSubject.next(printing);
  }

  createordonnance(ordonnance:any){
    return this.http.post(this.base.lien+'ordonnance',ordonnance);
  }

  update(ordonnance:any, slug:any){
    return this.http.patch(this.base.lien+'ordonnance/'+slug,ordonnance);
  }

  createProduit(ordonnance:any){
    return this.http.post(this.base.lien+'ordonnance/produit',ordonnance);
  }

  updateProduit(ordonnance:any, id:any){
    return this.http.patch(this.base.lien+'ordonnance/produit/'+id,ordonnance);
  }

  recherche(ordonnance:any){
    return this.http.post(this.base.lien+'ordonnance/recherche',ordonnance);
  }

  getAllordonnance(data:any){
    return this.http.post(this.base.lien+'ordonnance/liste',data);
  }

  getOneordonnance(slug:any){
    return this.http.get(this.base.lien+'ordonnance/'+slug);
  }

  delete(slug:any){
    return this.http.delete(this.base.lien+'ordonnance/'+slug);
  }
}
