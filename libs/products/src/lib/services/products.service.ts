import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { Product } from '../models/product';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  _search = "";
  apiURLProducts = environment.apiURL + 'products';

  constructor(private http: HttpClient) {}

  set search(_search: string){
    this._search = _search;
  }
  
  get search(){
    return this._search;
  }

  getProducts(categoriesFilter?: string[]): Observable<Product[]> {
    let params = new HttpParams();
    if (categoriesFilter) {
      params = params.append('categories', categoriesFilter.join(','))
    }
    return this.http.get<Product[]>(this.apiURLProducts, { params : params })
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiURLProducts}/${productId}`);
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post(this.apiURLProducts, productData)
  }

  updateProduct(productData: FormData, productid: string): Observable<Product> {
    return this.http.put<Product>(`${this.apiURLProducts}/${productid}`, productData);
  }
  
  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLProducts}/${productId}`);
  }

  getProductsCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLProducts}/get/count`)
      .pipe(map((objectValue: any) => objectValue.productCount));
  }

  getFeaturedProducts(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiURLProducts}/get/featured/${count}`)
  }

  updateProductGallery(images: FormData, productid: string): Observable<string[]> {
    return this.http.put<string[]>(`${this.apiURLProducts}/gallery-images/${productid}`, images);
  }
}
