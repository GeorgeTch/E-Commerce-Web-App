import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterModule, RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'E-Commerce-Angular-App';
  constructor(private themeService: ThemeService) {}

  get isDarkMode() {
    return this.themeService.isDarkMode;
  }

  get themeIcon(): string {
    return this.isDarkMode
      ? '/assets/icons/dark-mode-icon.svg'
      : '/assets/icons/light-mode-icon.svg';
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.themeIcon;
  }
}
