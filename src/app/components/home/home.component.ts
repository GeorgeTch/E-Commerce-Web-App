import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../model/product.model';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../shared/filter.pipe';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, RouterModule, FormsModule, FilterPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  products: IProduct[] = [];
  searchInput: string = '';
  categories: string[] = [];
  selectedCategory: string = 'all';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.loadProducts();
  }

  addToCart(product: IProduct): void {
    this.cartService.addToCart(product);
    this.toastr.success('Product added to cart', 'Success');
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe(
      (data) => {
        this.categories = ['all', ...data];
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  loadProducts(category: string = 'all'): void {
    if (category === 'all') {
      this.productService.getProducts().subscribe(
        (data) => {
          this.products = data;
        },
        (error) => {
          console.error('Error fetching products', error);
        }
      );
      return;
    }
    this.productService.getProductsByCategory(category).subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.loadProducts(this.selectedCategory);
  }
}
