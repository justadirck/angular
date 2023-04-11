import { NgModule } from '@angular/core';
import { DarkmodeSwitchComponent } from './darkmode-switch/darkmode-switch.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    DarkmodeSwitchComponent,
  ],
  imports: [
    NgbModule
  ],
  exports: [
    DarkmodeSwitchComponent
  ]
})
export class NgxBs5DarkmodeModule { }
