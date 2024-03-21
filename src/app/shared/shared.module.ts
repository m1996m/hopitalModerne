import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MenuComponent} from "./components/menu/menu.component";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {RouterLink, RouterOutlet} from "@angular/router";
import {NzIconModule} from "ng-zorro-antd/icon";
import {ConnexionModule} from "../connexion/connexion.module";


@NgModule({
  declarations: [
    MenuComponent,
  ],
  exports: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzToolTipModule,
    RouterOutlet,
    NzIconModule,
    NgOptimizedImage,
    RouterLink,
    ConnexionModule
  ]
})
export class SharedModule {
}
