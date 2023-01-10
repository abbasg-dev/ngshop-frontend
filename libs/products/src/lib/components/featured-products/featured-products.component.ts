import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'ngshop-products-featured-products',
  templateUrl: './featured-products.component.html',
  styles: []
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {
  
  featuredProducts: Product[] = [];
  loading = true;
  endsubs$: Subject<any> = new Subject();
  
  constructor(private prodService: ProductsService) { }

  ngOnInit(): void {
    this._getFeaturedProducts()
  }

  private _getFeaturedProducts() {
    this.prodService.getFeaturedProducts(4).pipe(takeUntil(this.endsubs$)).subscribe(products => {
      this.featuredProducts = products;
      this.loading = false;
    })
  }

  public _getFilteredProducts(): Product[] {
    return this.featuredProducts.filter((prod)=> prod.name.includes(this.prodService.search))
  }
  
  ngOnDestroy() {
    this.endsubs$.next;
    this.endsubs$.complete();
  }

}
