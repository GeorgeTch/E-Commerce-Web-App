import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  isLoggedIn: boolean = false;

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.authService.currentUserSubject.subscribe((token) => {
      this.isLoggedIn = !!token;
    });
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.toastr.info('Logged out');
  }

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
