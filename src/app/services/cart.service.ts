import { Injectable } from '@angular/core';
import { IProduct } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: IProduct[] = [];
  constructor() {}

  addToCart(product: IProduct): void {
    const existingProduct = this.cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity!++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
  }

  getCart(): IProduct[] {
    return this.cart;
  }

  removeFromCart(id: number): void {
    this.cart = this.cart.filter((item) => item.id !== id);
  }

  clearCart(): void {
    this.cart = [];
  }

  updateQuantity(id: number, quantity: number): void {
    const product = this.cart.find((item) => item.id === id);

    if (product && quantity > 0) {
      product.quantity = quantity;
    } else if (product && quantity <= 0) {
      this.removeFromCart(id);
    }
  }
}
