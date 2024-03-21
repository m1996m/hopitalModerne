import {Injectable, ViewChild} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {ConnexionService} from "../connextion/connexion.service";
import {LoginComponent} from "../../../../connexion/login/login.component";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: ConnexionService, private router: Router) {
  }
  @ViewChild(LoginComponent) loginComponent!: LoginComponent;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isConnect();
  }

  isConnect(){
    let isValidityToken = this.authService.isAuthenticated(localStorage.getItem('token'));
    if( isValidityToken ){
      this.authService.getUser();
      return true
    }
    this.router.navigate(['/login']);
    return false;
  }

}
