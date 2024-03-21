import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ConsultationService} from "../../services/web-services/consultation/consultation.service";
import {ConnexionService} from "../../services/authService/connextion/connexion.service";
import {HopitalService} from "../../services/web-services/hopital/hopital.service";
import {ExamenService} from "../../services/web-services/examen/examen.service";
import {LoginComponent} from "../../../connexion/login/login.component";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isCollapsed = false;
  isPrinting = false;
  role = '';
  user: any;
  hopital: any;
  left='200px';
  top='80px';
  isClick=false;
  infoUserConnect = this.connexionService.userInfo;
  @ViewChild(LoginComponent) loginComponent!: LoginComponent;

  private subscription: Subscription;
  constructor(
    private consultationService: ConsultationService,
    public connexionService: ConnexionService,
    private hopitalServie:HopitalService,
    private examenService: ExamenService,
    private router: Router,
  ) {
    this.subscription = this.consultationService.printObservable.subscribe((status) => {
      this.isPrinting = status;
    });
    this.subscription = this.examenService.printObservable.subscribe((status) => {
      this.isPrinting = status;
    });
    console.log('');
  }

  ngOnInit(){
    this.connexionService.getUser();
    console.log(this.connexionService.userInfo);
    this.role= this.connexionService.userInfo?.role;
    if(this.role=="USER_PATIENT"){
      this.user = this.connexionService?.userInfo?.patient[0];
    }else if(this.role=="USER_PERSONNEL"){
      this.user = this.connexionService?.userInfo?.personnel[0];
    }
    this.getOneHopital();
  }

  logout(){
    this.connexionService.logout().subscribe((data)=>{
      localStorage.setItem('token','');
      this.router.navigate(['/login']);
    });
    this.router.navigate(['/login']);
    //this.loginComponent.showModal1();
  }

  getMenu(){
    if(this.isClick){
      this.left='200px';
      this.isClick=false;
    }else{
      this.left='80px';
      this.isClick=true;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  getOneHopital(){
    this.hopitalServie.getOneHopital(this.user?.hopital).subscribe((data:any)=>{
      this.hopital = data;
    });
  }

}
