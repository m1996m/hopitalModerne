import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonnelRoutingModule } from './personnel-routing.module';
import { PersonnelIndexComponent } from './personnel-index/personnel-index.component';
import { PersonnelCreateComponent } from './personnel-create/personnel-create.component';
import { PersonnelShowComponent } from './personnel-show/personnel-show.component';
import { PersonnelEditeComponent } from './personnel-edite/personnel-edite.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DemoNgZorroAntdModule} from "../ng-zorro-antd.module";
import {IconsProviderModule} from "../icons-provider.module";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzModalModule} from "ng-zorro-antd/modal";
import {CaretLeftOutline, SettingOutline, StepBackwardOutline} from "@ant-design/icons-angular/icons";

const icons = [StepBackwardOutline, CaretLeftOutline, SettingOutline];

@NgModule({
  declarations: [
    PersonnelIndexComponent,
    PersonnelCreateComponent,
    PersonnelShowComponent,
    PersonnelEditeComponent
  ],
  imports: [
    CommonModule,
    PersonnelRoutingModule,
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
  exports: [
    PersonnelEditeComponent,
    PersonnelCreateComponent
  ]
})
export class PersonnelModule { }
