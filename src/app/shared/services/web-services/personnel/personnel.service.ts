import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../../base.service";
import {HttpHelper} from "../../../../core/helpers/http.helper";
import {FormGroup} from "@angular/forms";
import {PersonnelResponseDto} from "./dto/personnel-response.dto";
import {PersonnelEntity} from "../../../../core/entities/personnel.entity";
import {UserService} from "../user/user.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {

  private readonly routePrefix = 'personnel';
  public isVisible = false;
  private modalStateSource = new Subject<boolean>();
  modalState$ = this.modalStateSource.asObservable();

  constructor(
    private readonly httpHelper: HttpHelper,
    private userService: UserService,
  ) {
  }

  notifyModalState(isVisible: boolean): void {
    this.modalStateSource.next(isVisible);
  }

  createpersonnel(personnel: FormGroup){
    return this.httpHelper.request<any>('POST',this.routePrefix, personnel);
  }

  recherche(content: string){
    return this.httpHelper.request<PersonnelResponseDto[]>('GET',this.routePrefix+'/recherche', null,{content: content});
  }

  updatepersonnel(personnel: FormGroup, id: string){
    return this.httpHelper.request<any>('PATCH',this.routePrefix+'/'+id, personnel);
  }

  getAllpersonnel(data: string){
    return this.httpHelper.request<PersonnelResponseDto>('GET',this.routePrefix+'/recherche',null, {content: data});
  }

  getOnepersonnel(id: string){
    return this.httpHelper.request<PersonnelEntity>('GET',this.routePrefix+'/one/personnel/'+id);
  }

  getEmailOneUser(email: string){
    return this.userService.getEmailOneUsser(email);
  }


  delete(id: string){
    return this.httpHelper.request<any>('DELETE',this.routePrefix+'/'+id);
  }

}
