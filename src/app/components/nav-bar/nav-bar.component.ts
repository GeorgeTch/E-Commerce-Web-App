import { Component, HostListener } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  isLoggedIn = false;
  cartQuantity = 0;
  menuOpen = false;

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private authService: AuthService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.authService.currentUserSubject.subscribe((token) => {
      this.isLoggedIn = !!token;
    });
    this.cartService.cartItems$.subscribe((cartItems) => {
      this.cartQuantity = cartItems.reduce(
        (acc, item) => acc + (item.quantity || 0),
        0
      );
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event) {
    const target = event.target as HTMLElement;

    // Close the menu if the click is outside the dropdown or burger menu
    if (!target.closest('.burger-menu') && !target.closest('.nav-links')) {
      this.menuOpen = false;
    }
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.toastr.info('Logged out');
    this.cartService.clearCart();
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
  }
}
