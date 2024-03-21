import {Component, ViewEncapsulation} from '@angular/core';
import {UserModel} from "../../core/models/user.model";
import {UserService} from "../../shared/services/web-services/user/user.service";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {NzModalService} from "ng-zorro-antd/modal";
import {Router} from "@angular/router";
import {ConnexionService} from "../../shared/services/authService/connextion/connexion.service";
import {UserResponseDto} from "../../shared/services/web-services/user/dto/user-response-dto";
import {UserEntity} from "../../core/entities/user.entity";

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent {
  formulaire!: FormGroup;
  user!: UserEntity;
  isVisible = true;
  isVisibleShow = false;
  isVisibleUpdate = false;
  isConfirmLoading = false;
  isConfirmLoadingUpdate = false;
  oneUser!: UserEntity;
  yourCustomStyles = {
    height: '300px', // Exemple : définir la hauteur
    padding: '20px' // Exemple : définir le padding
  };
  role = '';

  constructor(private userService:UserService, private fb: FormBuilder,private modal: NzModalService, private router: Router
    ,public connexionService: ConnexionService,
              ) {
    encapsulation: ViewEncapsulation.None
  }

  ngOnInit(): void {
    this.connexionService.getUser();
    this.role= this.connexionService.userInfo.role;
    if(this.role=="USER_PATIENT"){
      this.user = this.connexionService.userInfo.patient[0];
    }else if(this.role=="USER_PERSONNEL"){
      this.user = this.connexionService.userInfo.personnel[0];
    }
    this.initForm();
  }

  initForm(){
    this.formulaire= this.fb.group({
        image: [''],
      }
    );
  }

  showModal1(): void {
    this.isVisible = true;
  }
  handleCancel(): void {
    this.isVisible = false;
    this.router.navigate(['/user/profile/'+this.user?.slug]);
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }
  //Confirmation suppression

  engegister(){
    this.userService.upload('',0).subscribe((data:any)=>{
      this.router.navigate(['/user']);
    })
  }
}
