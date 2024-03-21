import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HopitalRoutingModule } from './hopital-routing.module';
import { HopitalIndexComponent } from './hopital-index/hopital-index.component';
import {UserRoutingModule} from "../user/user-routing.module";
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
import { HopitalCreateComponent } from './hopital-create/hopital-create.component';
import { HopitalEditComponent } from './hopital-edit/hopital-edit.component';

const icons = [StepBackwardOutline, CaretLeftOutline, SettingOutline];


@NgModule({
  declarations: [
    HopitalIndexComponent,
    HopitalCreateComponent,
    HopitalEditComponent
  ],
  imports: [
    CommonModule,
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
    HopitalRoutingModule
  ]
})
export class HopitalModule { }
