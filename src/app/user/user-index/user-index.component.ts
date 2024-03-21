import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {UserModel} from "../../core/models/user.model";
import {UserService} from "../../shared/services/web-services/user/user.service";
import {FormBuilder, FormGroup, NgForm, Validator, Validators} from "@angular/forms";
import {NzModalService} from "ng-zorro-antd/modal";
import {UserEntity} from "../../core/entities/user.entity";
import {UserCreateComponent} from "../user-create/user-create.component";
import {ConnexionService} from "../../shared/services/authService/connextion/connexion.service";

interface ItemData {
  Email: string;
  Type: string;
  Pays: string;
  Statut: string;
}

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css']
})
export class UserIndexComponent {

  formulaireUpdate!: FormGroup;
  users: UserEntity[] = [];
  listOfData: ItemData[] = [];
  isVisible = false;
  isVisibleShow = false;
  isVisibleUpdate = false;
  isConfirmLoading = false;
  isConfirmLoadingUpdate = false;
  oneUser?: UserEntity;
  yourCustomStyles = {
    height: '370px', // Exemple : définir la hauteur
    padding: '20px' // Exemple : définir le padding
  };
  @ViewChild(UserCreateComponent) userCreateComponent!: UserCreateComponent;

  constructor(private userService: UserService, private fb: FormBuilder,
              private modal: NzModalService, private connexion: ConnexionService) {
    encapsulation: ViewEncapsulation.None
  }

  ngOnInit(): void {
    this.getUsers();
    this.initFormUpdate();
    this.executeGetUser();
  }

  openCreateUser(){
    this.userCreateComponent.showModal1();
  }

  executeGetUser(){
    this.userService.modalState$.subscribe((isVisible) => {
      this.getUsers();
    });

  }

  editer(id:any){
    const encodedText = btoa(this.formulaireUpdate?.value['username']);
    let role = "USER_PATIENT";

    if(this.formulaireUpdate?.value['type_user'] == 'Hopital'){
      role = "USER_HOPITAL";
    }else if (this.formulaireUpdate?.value['type_user']=='Patient'){
      role = "USER_PERSONNEL";
    }else{
      role = "USER_PATIENT";
    }
    this.formulaireUpdate?.patchValue({
      pays: this.majsuscule(this.formulaireUpdate.value['pays'])
    });
    this.userService.updateUser(this.formulaireUpdate?.value,id).subscribe((data:any)=>{
      this.getUsers();
    });

  }

  initFormUpdate(){

    this.formulaireUpdate = this.fb.group({

        username: [this.oneUser?.username, [Validators.required, Validators.email]],
        type_user: [this.oneUser?.type_user,Validators.required],
        pays: [this.oneUser?.pays],
        statut: [this.oneUser?.statut],
        image: [this.oneUser?.image],
        role: [this.oneUser?.role]

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
  }

  modalShow(): void {
    this.isVisibleShow = true;
  }

  updateModale(): void {
    this.isVisibleUpdate = true;
  }

  handleCancel(): void {
    this.isVisible = false;
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
    }, 3000);
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  getUserType(form:NgForm){
    this.userService.getUserType(this.majsuscule(form.value['type'])).subscribe((data:any)=>{
      this.users = data;
    })
  }

  //connfirmation modification
  showConfirm(id:any): void {
    this.modal.confirm({
      nzTitle: '<i>Voulez-vous vraiment modifié cet utilisateur?</i>',
      nzOnOk: () =>{
        this.editer(id);
        console.log('OK');
      }
    });
  }

  //Confirmation suppression
  showDeleteConfirm(id:any): void {
    this.modal.confirm({
      nzTitle: "Voulez-vous vraiment supprimer l'utilisateur",
      nzContent: '<b style="color: red;">Une fois utilisateur supprimer vous pourrez plus le recupperez ainsi toutes les données liées à cet utilisateur</b>',
      nzOkText: 'Oui',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>{
        this.delete(id);
        console.log('OK')
      } ,
      nzCancelText: 'Non',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  getOneUser(user: UserEntity){
    this.userService.getOneUser(user?.id).subscribe((data:any)=>{
      this.oneUser = data;
      this.initFormUpdate();
    })
  }

  delete(id:any){
    this.userService.delete(id).subscribe((data:any)=>{
      this.getUsers();
    })
  }

  recherche(form:NgForm){
    form.value['content']=this.majsuscule(form.value['content']);
    this.userService.recherche(form.value).subscribe((data:any)=>{
      this.users = data;
      for (let i = 0; i < this.users?.length; i++) {
        this.listOfData.push({
          Email: this.users[i].username,
          Type: this.users[i].type_user,
          Pays: this.users[i].pays,
          Statut: this.users[i].statut,
        });
      }
    })
  }

  getUsers(){
    this.userService.getAllUser().subscribe((data:any)=>{
      this.users = data;
      for (let i = 0; i < this.users?.length; i++) {
        this.listOfData.push({
          Email: this.users[i].username,
          Type: this.users[i].type_user,
          Pays: this.users[i].pays,
          Statut: this.users[i].statut,
        });
      }
    });
  }

}
