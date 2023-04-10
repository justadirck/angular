import { Component, OnInit, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  theme$: Observable<string> | undefined;

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.initTheme();
    this.theme$ = this.themeService.theme$;    
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    return false; // prevent default
  }
}
