import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminNavComponent } from './layout/admin-nav/admin-nav.component';
import { PersonnelNavComponent } from './layout/personnel-nav/personnel-nav.component';
import { UserNavComponent } from './layout/user-nav/user-nav.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import {CommonModule, registerLocaleData} from '@angular/common';
import fr from '@angular/common/locales/fr';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import {DemoNgZorroAntdModule} from "./ng-zorro-antd.module";
import {NzIconModule} from "ng-zorro-antd/icon";
import {BaseService} from "./shared/services/base.service";
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import {HopitalService} from "./shared/services/web-services/hopital/hopital.service";
import {PersonnelService} from "./shared/services/web-services/personnel/personnel.service";
import {ServiceService} from "./shared/services/web-services/service/service.service";
import {ProfileService} from "./shared/services/web-services/profile/profile.service";
import {PatientService} from "./shared/services/web-services/patient/patient.service";
import {ConnexionService} from "./shared/services/authService/connextion/connexion.service";

import {RdvService} from "./shared/services/web-services/rdv/rdv.service";
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import {ConsultationService} from "./shared/services/web-services/consultation/consultation.service";
import {ExamenService} from "./shared/services/web-services/examen/examen.service";
import {OrdonnanceService} from "./shared/services/web-services/ordonnance/ordonnance.service";
import * as AllIcons from "@ant-design/icons-angular/icons";
import {IconDefinition} from "@ant-design/icons-angular";
import {HelpersModule} from "./core/helpers/helpers.module";
import {SharedModule} from "./shared/shared.module";
import {ConnexionModule} from "./connexion/connexion.module";




//const icons = [StepBackwardOutline, CaretLeftOutline, SettingOutline];
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])


registerLocaleData(fr);


@NgModule({
  declarations: [
    AppComponent,
    AdminNavComponent,
    PersonnelNavComponent,
    UserNavComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DemoNgZorroAntdModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzIconModule.forChild(icons),
    NzTableModule,
    NzModalModule,
    ScrollingModule,
    NzPaginationModule,
    HelpersModule,
    SharedModule,
    ConnexionModule

  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    BaseService,
    HopitalService,
    PersonnelService,
    ServiceService,
    ProfileService,
    PatientService,
    ConnexionService,
    RdvService,
    ConsultationService,
    ExamenService,
    OrdonnanceService,

    { provide: NZ_I18N, useValue: fr_FR }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
