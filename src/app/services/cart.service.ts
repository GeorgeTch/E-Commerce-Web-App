import { Injectable } from '@angular/core';
import { IProduct } from '../model/product.model';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly CART_KEY = 'cart';
  private cart: IProduct[] = this.loadCart();

  constructor(private authService: AuthService, private router: Router) {}

  private loadCart(): IProduct[] {
    const cart = localStorage.getItem(this.CART_KEY);
    return cart ? JSON.parse(cart) : [];
  }

  private saveCart(): void {
    localStorage.setItem(this.CART_KEY, JSON.stringify(this.cart));
  }

  addToCart(product: IProduct): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    const existingProduct = this.cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity!++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }

    this.saveCart();
  }

  getCart(): IProduct[] {
    return this.cart;
  }

  removeFromCart(id: number): void {
    this.cart = this.cart.filter((item) => item.id !== id);
    this.saveCart();
  }

  clearCart(): void {
    this.cart = [];
    this.saveCart();
  }

  updateQuantity(id: number, quantity: number): void {
    const product = this.cart.find((item) => item.id === id);

    if (product && quantity > 0) {
      product.quantity = quantity;
    } else if (product && quantity <= 0) {
      this.removeFromCart(id);
    }
    this.saveCart();
  }
}
