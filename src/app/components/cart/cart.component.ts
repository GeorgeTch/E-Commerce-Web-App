import { Component } from '@angular/core';
import { IProduct } from '../../model/product.model';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../services/loader.service';
import { totalAmountAnimation } from '../../animations/total-amount-animation';
import { digitRollAnimation } from '../../animations/digit-roll-animation';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  animations: [digitRollAnimation, totalAmountAnimation],
})
export class CartComponent {
  cartItems: IProduct[] = [];
  total = 0;

  constructor(
    private cartService: CartService,
    private loaderService: LoaderService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loaderService.show();
    setTimeout(() => {
      this.loaderService.hide();
      this.loadCart();
    }, 1000);
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCart();
    this.calculateTotal;
  }

  get calculateTotal(): number {
    return (this.total = this.cartItems.reduce(
      (acc, item) => acc + item.price! * item.quantity!,
      0
    ));
  }

  removeFromCart(id: number): void {
    this.cartService.removeFromCart(id);
    this.loadCart();
    this.toastr.error('Product removed from cart', 'Success');
  }

  updateQuantity(id: number, quantity: number): void {
    this.cartService.updateQuantity(id, quantity);
    this.loadCart();
  }

  get grandTotalDigits(): string[] {
    return this.calculateTotal.toFixed(2).split('');
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.loadCart();
    this.toastr.error(
      'All items have been removed from the cart',
      'Cart Cleared'
    );
  }
}
