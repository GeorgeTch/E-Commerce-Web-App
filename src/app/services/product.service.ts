import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.baseUrl);
  }

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseUrl}/${id}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/categories`);
  }

  getProductsByCategory(category: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.baseUrl}/category/${category}`);
  }

  addProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.baseUrl, product);
  }

  updateProduct(id: Number, product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<IProduct> {
    return this.http.delete<IProduct>(`${this.baseUrl}/${id}`);
  }
}
