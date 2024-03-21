import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../../base.service";
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  public userInfo:any;
  constructor(private http:HttpClient,private base:BaseService) { }

  login(auth:any){
    return this.http.post(this.base.lien+'auth/login',auth);
  }

  getUser(){
    this.userInfo = [];
    let token: string | null = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwt_decode(token);
      this.userInfo = decodedToken.user;
    }

    return this.userInfo;
  }

  logout(){
    return this.http.post(this.base.lien+'auth/logout', {content: ""});
  }

  getr(data:any){
    return this.http.post(this.base.lien+'auth/liste',data);
  }

  isAuthenticated(token: any){
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    if(expiry * 1000 > Date.now()){
      return true;
    }else{
      return false;
    }
  }

}
