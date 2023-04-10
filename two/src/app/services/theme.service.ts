import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private storageKey = 'app-theme';
  private default = 'dark'

  private _theme = new ReplaySubject<string>(1);
  public theme$ = this._theme.asObservable();

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  toggleTheme() {
    const theme = localStorage.getItem(this.storageKey);
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    this._theme.next(nextTheme);
    localStorage.setItem(this.storageKey, nextTheme);
    this.renderer.setAttribute(document.querySelector('html'), 'data-bs-theme', nextTheme);
  }

  initTheme() {
    const theme = localStorage.getItem(this.storageKey) || '';
    if (!theme) {
      localStorage.setItem(this.storageKey, this.default);
      this._theme.next(this.default);
    }
    else {
      this._theme.next(theme);
    }
    this.renderer.setAttribute(document.querySelector('html'), 'data-bs-theme', theme);
  }
}
