import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RendvRoutingModule } from './rendv-routing.module';
import { RendvCreateComponent } from './rendv-create/rendv-create.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {DemoNgZorroAntdModule} from "../ng-zorro-antd.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {IconsProviderModule} from "../icons-provider.module";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzModalModule} from "ng-zorro-antd/modal";
import {
  CaretLeftOutline,
  LockOutline,
  SettingOutline,
  StepBackwardOutline,
  UserOutline
} from "@ant-design/icons-angular/icons";
import { RendvIndexComponent } from './rendv-index/rendv-index.component';
import { RendvShowComponent } from './rendv-show/rendv-show.component';
import { RendvEditeComponent } from './rendv-edite/rendv-edite.component';
import { PriseRdvComponent } from './prise-rdv/prise-rdv.component';
import {ScrollingModule} from "@angular/cdk/scrolling";
import { MesRdvComponent } from './mes-rdv/mes-rdv.component';
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import { DetailComponent } from './detail/detail.component';

const icons = [StepBackwardOutline, CaretLeftOutline, SettingOutline];

@NgModule({
  declarations: [
    RendvCreateComponent,
    RendvIndexComponent,
    RendvShowComponent,
    RendvEditeComponent,
    PriseRdvComponent,
    MesRdvComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    RendvRoutingModule,
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
export class RendvModule { }
