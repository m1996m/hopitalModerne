import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnexionRoutingModule } from './connexion-routing.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import {CaretLeftOutline, SettingOutline, StepBackwardOutline} from "@ant-design/icons-angular/icons";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DemoNgZorroAntdModule} from "../ng-zorro-antd.module";
import {IconsProviderModule} from "../icons-provider.module";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzModalModule} from "ng-zorro-antd/modal";
import { UserOutline } from '@ant-design/icons-angular/icons';
import { LockOutline } from '@ant-design/icons-angular/icons';
import {UserModule} from "../user/user.module";


const icons = [StepBackwardOutline, CaretLeftOutline, SettingOutline];

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    ConnexionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DemoNgZorroAntdModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzIconModule.forChild(icons),
    NzTableModule,
    NzModalModule,
    NzIconModule.forChild([UserOutline,LockOutline]),
    UserModule

  ],
  exports: [LoginComponent]
})
export class ConnexionModule { }
