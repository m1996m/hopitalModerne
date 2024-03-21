import { Injectable } from '@angular/core';
import {HttpHelper} from "../../../../core/helpers/http.helper";
import {NgForm} from "@angular/forms";
import {ProfileResponseDto} from "./dto/profile-response.dto";
import {ProfileSendDto} from "./dto/profile.send.dto";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private readonly routePrefix = 'profile';

  constructor(
    private readonly httpHelper: HttpHelper
  ) {
  }

  createprofile(profile: NgForm){
    return this.httpHelper.request<any>('POST',this.routePrefix, profile);
  }

  updateprofile(profile: NgForm, id: number){
    return this.httpHelper.request<any>('PATCH',this.routePrefix+'/'+id, profile);
  }

  getAllprofile(data: ProfileSendDto){
    return this.httpHelper.request<ProfileResponseDto[]>('GET',this.routePrefix+'/liste', null, {content: data.content});
  }

  getOneprofile(slug: string){
    return this.httpHelper.request<ProfileResponseDto[]>('GET',this.routePrefix+'/'+slug);
  }

  delete(id: number){
    return this.httpHelper.request<any>('DELETE',this.routePrefix+'/'+id);
  }
}
