import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {UserModel} from "../../core/models/user.model";
import {UserService} from "../../shared/services/web-services/user/user.service";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {NzModalService} from "ng-zorro-antd/modal";
import {Router} from "@angular/router";
import {UserEntity} from "../../core/entities/user.entity";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {

  user: UserModel = new UserModel('','','Admin','','','Actif','','USER_ADMIN');
  formulaire!: FormGroup;
  isVisible = false;
  isVisibleShow = false;
  isVisibleUpdate = false;
  isConfirmLoading = false;
  isConfirmLoadingUpdate = false;
  oneUser!: UserEntity;
  yourCustomStyles = {
    height: '370px', // Exemple : définir la hauteur
    padding: '20px' // Exemple : définir le padding
  };

  constructor(
    private userService:UserService,
    private fb: FormBuilder,
    private modal: NzModalService,
    private router: Router
  ) {
    encapsulation: ViewEncapsulation.None
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){

    this.formulaire= this.fb.group({
        username: ['', [Validators.required, Validators.email]],
        password: ['',[Validators.required, Validators.minLength(6)]],
        type_user: ['',Validators.required],
        confirmation: ['',[Validators.required, Validators.minLength(6)]],
        slug: [''],
        pays: [''],
        statut: [''],
        image: [''],
        role: ['']
      },
      {
        validators: this.passwordMatchValidator
      }
    );
  }

  // Fonction de validation personnalisée pour vérifier si les mots de passe correspondent
  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmation')?.value ? null : { mismatch: true };
  }

  majsuscule(texte: string): string {
    return texte.charAt(0).toUpperCase() + texte.slice(1);
  }

  showModal1(): void {
    this.isVisible = true;
    this.userService.notifyModalState(this.isVisible);
  }

  modalShow(): void {
    this.isVisibleShow = true;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.userService.notifyModalState(this.isVisible);
  }

  handleOk(): void {
    this.isConfirmLoading = false;
    this.isVisible = false;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
      this.userService.notifyModalState(this.isVisible);
    }, 1000);
  }

  //Confirmation suppression

  engegister(){
    let date = new Date();
    let dateStrinb = date.toLocaleString()+''+date.toLocaleString();
    const encodedText = btoa(this.formulaire.value['username']); // Encodage en Base64
    let role ="USER_PATIENT";
    if(this.formulaire.value['type_user']=='Hopital'){
      role ="USER_HOPITAL";
    }else if (this.formulaire.value['type_user']=='Patient'){
      role ="USER_PATIENT";
    }else{
      role ="USER_PERSONNEL"
    }
    this.formulaire.patchValue({
      slug: btoa(dateStrinb),
      statut: 'Actif',
      role: role,
      pays: this.majsuscule(this.formulaire.value['pays'])
    });
    let data:any = this.formulaire;
    data.removeControl('confirmation');
    this.userService.createUser(data.value).subscribe((data:any)=>{
      this.router.navigate(['/user']);
    })
  }



}
