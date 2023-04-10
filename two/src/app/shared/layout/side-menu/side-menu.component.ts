import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {
  theme$: Observable<string> | undefined;

  constructor(private themeService: ThemeService) {
    this.theme$ = themeService.theme$;
  }
}
