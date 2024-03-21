import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdonnanceRoutingModule } from './ordonnance-routing.module';
import { OrdonnanceIndexComponent } from './ordonnance-index/ordonnance-index.component';
import { OrdonnanceCreateComponent } from './ordonnance-create/ordonnance-create.component';
import { OrdonnanceEditeComponent } from './ordonnance-edite/ordonnance-edite.component';
import { OrdonnanceShowComponent } from './ordonnance-show/ordonnance-show.component';
import {
  CaretLeftOutline,
  LockOutline,
  SettingOutline,
  StepBackwardOutline,
  UserOutline
} from "@ant-design/icons-angular/icons";
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
    OrdonnanceIndexComponent,
    OrdonnanceCreateComponent,
    OrdonnanceEditeComponent,
    OrdonnanceShowComponent
  ],
  imports: [
    CommonModule,
    OrdonnanceRoutingModule,
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
export class OrdonnanceModule { }
