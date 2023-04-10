import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './layout/side-menu/side-menu.component';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    SideMenuComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    NgbTooltipModule
  ],
  exports: [
    SideMenuComponent,
    NavBarComponent
  ]
})
export class SharedModule { }
