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

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.1)]],
      description: ['', Validators.required],
      image: ['', Validators.required],
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
              alert('Product updated successfully');
              this.resetForm();
            },
            (error) => {
              console.error('Error updating product', error);
            }
          );
      } else {
        this.productService.addProduct(productData).subscribe(
          () => {
            this.products.push(productData);
            alert('Product added successfully');
            this.resetForm();
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

  resetForm() {
    this.productForm.reset();
    this.isEditMode = false;
    this.selectedProductId = null;
  }
}
