import { Injectable } from '@angular/core';

import { EMPTY, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import {Product, ProductResponse, ProductWithStock} from './product.interface';

import { ApiService } from '../core/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends ApiService {
  createNewProduct(product: Product): Observable<Product> {
    if (!this.endpointEnabled('bff')) {
      console.warn(
        'Endpoint "bff" is disabled. To enable change your environment.ts config'
      );
      return EMPTY;
    }

    const url = this.getUrl('bff', 'products');
    return this.http.post<Product>(url, product);
  }

  editProduct(id: string, changedProduct: Product): Observable<Product> {
    if (!this.endpointEnabled('bff')) {
      console.warn(
        'Endpoint "bff" is disabled. To enable change your environment.ts config'
      );
      return EMPTY;
    }

    const url = this.getUrl('bff', `products/${id}`);
    return this.http.put<Product>(url, changedProduct);
  }

  getProductById(id: string): Observable<Product | null> {
    if (!this.endpointEnabled('bff')) {
      console.warn(
        'Endpoint "bff" is disabled. To enable change your environment.ts config'
      );
      return this.http
        .get<Product[]>('/assets/products.json')
        .pipe(
          map(
            (products) => products.find((product) => product.id === id) || null
          )
        );
    }

    const url = this.getUrl('bff', `products/${id}`);
    return this.http
      .get<{ product: Product }>(url)
      .pipe(map((resp) => resp.product));
  }

  getProducts(): Observable<ProductWithStock[]> {
    const url = this.getUrl('product', 'products');
    return this.http.get<ProductResponse>(url).pipe(map((resp) => resp.products.map((product) => {
        const stockByProductId = resp.stock.find((stock) => stock.product_id === product.id);
        return {
          ...product,
          productId: stockByProductId?.product_id,
          count: stockByProductId?.count
        };
      })));
  }

  getProductsForCheckout(ids: string[]): Observable<Product[]> {
    if (!ids.length) {
      return of([]);
    }

    return this.getProducts().pipe(
      map((products) => products.filter((product) => ids.includes(product.id)))
    );
  }
}
