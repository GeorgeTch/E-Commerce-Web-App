import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../model/product.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  products: IProduct[] = [];
  productForm: FormGroup;
  isEditMode: boolean = false;
  selectedProductId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private toastr: ToastrService
  ) {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0.1)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      image: ['', [Validators.required, Validators.pattern('https?://.+')]],
    });
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  submitForm() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      if (this.isEditMode && this.selectedProductId !== null) {
        this.productService
          .updateProduct(this.selectedProductId, productData)
          .subscribe(
            (data) => {
              this.products = this.products.map((product) =>
                product.id === data.id ? data : product
              );
              this.resetForm();
              this.toastr.success('Product updated successfully');
            },
            (error) => {
              console.error('Error updating product', error);
            }
          );
      } else {
        this.productService.addProduct(productData).subscribe(
          () => {
            this.products.push(productData);
            this.resetForm();
            this.toastr.success('Product added successfully');
          },
          (error) => {
            console.error('Error adding product', error);
          }
        );
      }
      this.resetForm();
    }
  }

  editProduct(product: IProduct) {
    this.isEditMode = true;
    this.selectedProductId = product.id;
    this.productForm.patchValue({
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
    });
  }

  deleteProduct(product: IProduct) {
    this.productService.deleteProduct(product.id).subscribe(
      () => {
        this.products = this.products.filter((p) => p.id !== product.id);
        this.toastr.warning('Product deleted successfully');
      },
      (error) => {
        console.error('Error deleting product', error);
      }
    );
  }

  resetForm() {
    this.productForm.reset();
    this.isEditMode = false;
    this.selectedProductId = null;
  }
}
