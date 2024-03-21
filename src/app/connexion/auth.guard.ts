import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {ConnexionService} from "../shared/services/authService/connextion/connexion.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private connexionService:ConnexionService,private router:Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
    let isLoggedIn = this.connexionService.isAuthenticated(localStorage.getItem('token'));
    if (isLoggedIn){
      this.connexionService.getUser();
      return true
    } else {
      this.router.navigate(['/connexion/login']);
      return  false;
    }
  }

}
