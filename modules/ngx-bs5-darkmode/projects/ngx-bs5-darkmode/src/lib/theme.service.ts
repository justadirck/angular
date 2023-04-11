import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private _theme: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null)

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
    this._theme.subscribe(
      next => {
        if (next)
          this.setTheme(next);
      }
    )
    this._theme.next(this.getPreferredTheme());
  }

  /**
   * @returns string representing the currently active theme
   */
  get theme(): string | null {
    return this._theme.value;
  }

  /**
   * Set theme
   * @param theme the to be set
   */
  setTheme(theme: string): void {
    if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme);
    }

    this.saveTheme(theme);
  }

  /**
   * Store the given theme in local storage
   * @param theme
   * @private
   */
  saveTheme(theme: string): void {
    if (this._theme.value != theme)
      this._theme.next(theme);
    localStorage.setItem('theme', theme);
  }

  /**
   * Get the preferred theme
   * @returns string
   */
  getPreferredTheme(): string {
    return localStorage.getItem('theme') ?? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }


}
