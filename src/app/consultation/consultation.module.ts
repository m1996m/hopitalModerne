import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultationRoutingModule } from './consultation-routing.module';
import { ConsultationIndexComponent } from './consultation-index/consultation-index.component';
import { ConsultationCreateComponent } from './consultation-create/consultation-create.component';
import { ConsultationEditeComponent } from './consultation-edite/consultation-edite.component';
import { ConsultationShowComponent } from './consultation-show/consultation-show.component';
import {
  CaretLeftOutline,
  LockOutline,
  SettingOutline,
  StepBackwardOutline,
  UserOutline
} from "@ant-design/icons-angular/icons";
import {RendvRoutingModule} from "../rendv/rendv-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {DemoNgZorroAntdModule} from "../ng-zorro-antd.module";
import {IconsProviderModule} from "../icons-provider.module";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzModalModule} from "ng-zorro-antd/modal";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {NzPaginationModule} from "ng-zorro-antd/pagination";

const icons = [StepBackwardOutline, CaretLeftOutline, SettingOutline];

@NgModule({
  declarations: [
    ConsultationIndexComponent,
    ConsultationCreateComponent,
    ConsultationEditeComponent,
    ConsultationShowComponent
  ],
  imports: [
    CommonModule,
    ConsultationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DemoNgZorroAntdModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzIconModule.forChild(icons),
    NzTableModule,
    NzModalModule,
    NzIconModule.forChild([UserOutline,LockOutline]),
    ScrollingModule,
    NzPaginationModule,
  ]
})
export class ConsultationModule { }
