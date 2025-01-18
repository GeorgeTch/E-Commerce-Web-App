import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
    .matches;
  private darkMode: boolean = this.loadThemePreference();

  constructor() {
    this.applyTheme(this.darkMode);
  }

  private loadThemePreference(): boolean {
    const savedPreference = localStorage.getItem('darkMode');
    return savedPreference !== null
      ? JSON.parse(savedPreference)
      : this.prefersDark;
  }

  private applyTheme(isDark: boolean) {
    if (isDark) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }

  get isDarkMode(): boolean {
    return this.darkMode;
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', JSON.stringify(this.darkMode));
    this.applyTheme(this.darkMode);
  }
}
