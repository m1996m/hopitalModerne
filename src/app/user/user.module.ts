import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserIndexComponent } from './user-index/user-index.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NzTableModule } from 'ng-zorro-antd/table';
import {DemoNgZorroAntdModule} from "../ng-zorro-antd.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {IconsProviderModule} from "../icons-provider.module";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzIconModule} from "ng-zorro-antd/icon";
import {CaretLeftOutline, SettingOutline, StepBackwardOutline} from "@ant-design/icons-angular/icons";
import { NzModalModule } from 'ng-zorro-antd/modal';
import { UserCreateComponent } from './user-create/user-create.component';
import { ProilerComponent } from './proiler/proiler.component';
import { UploaderComponent } from './uploader/uploader.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {UserService} from "../shared/services/web-services/user/user.service";
import {HelpersModule} from "../core/helpers/helpers.module";


const icons = [StepBackwardOutline, CaretLeftOutline, SettingOutline];


@NgModule({
  declarations: [
    UserIndexComponent,
    UserCreateComponent,
    ProilerComponent,
    UploaderComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DemoNgZorroAntdModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzIconModule.forChild(icons),
    NzTableModule,
    NzModalModule
  ],

  providers:[
    UserService,
  ],
  exports: [UserCreateComponent]
})
export class UserModule { }
