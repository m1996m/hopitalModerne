import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRoutingModule } from './service-routing.module';
import { ServiceIndexComponent } from './service-index/service-index.component';
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
    ServiceIndexComponent
  ],
  imports: [
    CommonModule,
    ServiceRoutingModule,
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
export class ServiceModule { }
