import {Component, Input, OnInit} from '@angular/core';
import {ThemeService} from "../theme.service";

@Component({
  selector: 'ngx-bs5-darkmode-switch',
  templateUrl: './darkmode-switch.component.html',
  styleUrls: ['./darkmode-switch.component.css']
})
export class DarkmodeSwitchComponent implements OnInit {

  @Input() lightIcon: string = '🌞' //Icon is displayed in dark mode
  @Input() darkIcon: string = '🌚' //Icon is displayed in light mode

  theme: string | null = null;

  constructor(
    public themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.theme = this.themeService.theme;
  }

  changeTheme(): void {
    this.theme = this.theme == 'dark' ? 'light' : 'dark';
    this.themeService.setTheme(this.theme);
  }

}
