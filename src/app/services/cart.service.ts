import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../model/product.model';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly CART_KEY = 'cart';
  private cartItemsSubject = new BehaviorSubject<IProduct[]>(this.loadCart());
  cartItems$ = this.cartItemsSubject.asObservable(); // Observable for other components to subscribe to

  constructor(private authService: AuthService, private router: Router) {}

  private loadCart(): IProduct[] {
    const cart = localStorage.getItem(this.CART_KEY);
    return cart ? JSON.parse(cart) : [];
  }

  private saveCart(cart: IProduct[]): void {
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
    this.cartItemsSubject.next(cart); // Emit the updated cart
  }

  addToCart(product: IProduct): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    const cart = this.cartItemsSubject.getValue();
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity!++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    this.saveCart(cart); // Save and emit updated cart
  }

  getCart(): IProduct[] {
    return this.cartItemsSubject.getValue(); // Get current cart value
  }

  removeFromCart(id: number): void {
    const cart = this.cartItemsSubject
      .getValue()
      .filter((item) => item.id !== id);
    this.saveCart(cart); // Save and emit updated cart
  }

  clearCart(): void {
    this.saveCart([]); // Save and emit an empty cart
  }

  updateQuantity(id: number, quantity: number): void {
    const cart = this.cartItemsSubject.getValue();
    const product = cart.find((item) => item.id === id);

    if (product && quantity > 0) {
      product.quantity = quantity;
    } else if (product && quantity <= 0) {
      this.removeFromCart(id);
      return;
    }
    this.saveCart(cart); // Save and emit updated cart
  }

  getTotalQuantity(): number {
    return this.cartItemsSubject
      .getValue()
      .reduce((acc, item) => acc + (item.quantity || 0), 0);
  }
}
