import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamenRoutingModule } from './examen-routing.module';
import { ExamenIndexComponent } from './examen-index/examen-index.component';
import { ExamenCreateComponent } from './examen-create/examen-create.component';
import { ExamenEditeComponent } from './examen-edite/examen-edite.component';
import { ExamenShowComponent } from './examen-show/examen-show.component';
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
import { MesExamenComponent } from './mes-examen/mes-examen.component';

const icons = [StepBackwardOutline, CaretLeftOutline, SettingOutline];

@NgModule({
  declarations: [
    ExamenIndexComponent,
    ExamenCreateComponent,
    ExamenEditeComponent,
    ExamenShowComponent,
    MesExamenComponent
  ],
  imports: [
    CommonModule,
    ExamenRoutingModule,
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
export class ExamenModule { }
