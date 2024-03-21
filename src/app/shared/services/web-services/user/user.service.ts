import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../../base.service";
import {HttpHelper} from "../../../../core/helpers/http.helper";
import {FormGroup} from "@angular/forms";
import {UserResponseDto} from "./dto/user-response-dto";
import {UserEntity} from "../../../../core/entities/user.entity";
import {PersonnelResponseDto} from "../personnel/dto/personnel-response.dto";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly routePrefix = 'user';
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


  createUser(user: FormGroup){

    return this.httpHelper.request<any>('POST', `${this.routePrefix}/create`, user);

  }

  updateUser(user: FormGroup, id: string){

    return this.httpHelper.request<any>('PATCH', `${this.routePrefix}/`+id, user);

  }

  getAllUser(){

    return this.httpHelper.request<UserResponseDto>('GET', `${this.routePrefix}/liste`);

  }

  getOneUser(id: number){
    return this.httpHelper.request<UserEntity>('GET', `${this.routePrefix}/`+id);
  }

  getUserType(type: string){
    return this.httpHelper.request<UserEntity>('GET', `${this.routePrefix}/type/`+type);
  }

  recherche(content: any){
    return this.httpHelper.request<UserResponseDto>('GET', `${this.routePrefix}/recherche`, content);
  }

  upload(user: any, id: number){
    return this.httpHelper.request<any>('PATCH', `${this.routePrefix}/upload/`+id, user);
  }

  getEmailOneUsser(email: string){
    return this.httpHelper.request<UserEntity>('GET',this.routePrefix+'/get/personne/'+email);
  }

  delete(id: number){

    return this.httpHelper.request<any>('DELETE',`${this.routePrefix}/`+id)
  }
}
