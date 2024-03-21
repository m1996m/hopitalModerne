import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {NzModalService} from "ng-zorro-antd/modal";
import {ConnexionService} from "../../shared/services/authService/connextion/connexion.service";
import {Router} from "@angular/router";
import jwt_decode from 'jwt-decode';
import {UserCreateComponent} from "../../user/user-create/user-create.component";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  slug='';
  user:any;
  isVisible = true;
  isVisibleShow = false;
  isVisibleUpdate = false;
  isConfirmLoading = false;
  isConfirmLoadingUpdate = false;
  validateForm:any;
  @ViewChild(UserCreateComponent) userCreateComponent!: UserCreateComponent;


  yourCustomStyles = {
    height: '330px', // Exemple : définir la hauteur
    padding: '20px' // Exemple : définir le padding
  };
  constructor(private modal: NzModalService,private connexionService:ConnexionService,private router:Router,private fb:FormBuilder) {
    encapsulation: ViewEncapsulation.None;
  }

  ngOnInit(): void {

  }

  openInscription(){
    this.userCreateComponent.showModal1();
  }

  login(form:NgForm){
    this.connexionService.login(form.value).subscribe((data:any)=>{
      localStorage.setItem('token',data.access_token);
      this.getUser();
      this.router.navigate(['/rendv/priseRdv']);
    })
  }
  getUser(){
    let token: string | null = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token);
      this.connexionService.userInfo=decodedToken?.user;
      console.log(this.connexionService.userInfo);
    }
  }

  showModal1(): void {
    this.isVisible = true;
  }
  modalShow(): void {
    this.isVisibleShow = true;
  }
  updateModale(): void {
    this.isVisibleUpdate = true;
  }
  handleCancel(): void {
    this.isVisible = true;
  }
  handleCancelShow(): void {
    this.isVisibleShow = false;
  }
  handleCancelUpdate(): void {
    this.isVisibleUpdate = false;
  }
  handleOkUpdate(): void {
    this.isConfirmLoadingUpdate = true;
    setTimeout(() => {
      this.isVisibleUpdate = false;
      this.isConfirmLoadingUpdate = false;
    }, 1000);
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }

}
