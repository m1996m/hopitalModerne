import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../../base.service";
import {HttpHelper} from "../../../../core/helpers/http.helper";
import {ServiceResponseDto} from "./dto/service-response.dto";
import {NgForm} from "@angular/forms";
import {ServiceDtoSend} from "./dto/service.dto.send";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private readonly routePrefix = 'service';

  constructor(
    private readonly httpHelper: HttpHelper
  ) {
  }

  createservice(service: NgForm){
    return  this.httpHelper.request<any>('POST',this.routePrefix,service);
  }

  updateservice(service: NgForm, id:number){
    return  this.httpHelper.request<any>('PATCH',this.routePrefix+'/'+id,service);
  }

  getAllservice(data: ServiceDtoSend){
    return  this.httpHelper.request<ServiceResponseDto[]>('GET',this.routePrefix+'/liste', null, {content: data.content});
  }

  getOneservice(slug: string){
    return  this.httpHelper.request<ServiceResponseDto>('GET',this.routePrefix+'/'+slug);
  }

  delete(id:any){
    return  this.httpHelper.request<any>('DELETE',this.routePrefix+'/'+id);
  }
}
