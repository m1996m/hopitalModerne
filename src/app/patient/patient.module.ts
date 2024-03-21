import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientIndexComponent } from './patient-index/patient-index.component';
import { PatientCreateComponent } from './patient-create/patient-create.component';
import { PatientEditeComponent } from './patient-edite/patient-edite.component';
import { PatientShowComponent } from './patient-show/patient-show.component';
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

const icons = [StepBackwardOutline, CaretLeftOutline, SettingOutline];



@NgModule({
  declarations: [
    PatientIndexComponent,
    PatientCreateComponent,
    PatientEditeComponent,
    PatientShowComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
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
  ]
})
export class PatientModule { }
