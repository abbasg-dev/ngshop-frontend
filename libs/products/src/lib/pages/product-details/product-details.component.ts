import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem, CartService } from '@blackbits/orders';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
@Component({
  selector: 'ngshop-products-product-details',
  templateUrl: './product-details.component.html',
  styles: []
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  product: Product;
  quantity = 1;
  endsubs$: Subject<any> = new Subject();
  loading = true;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['productId']) {
        this._getProduct(params['productId'])
      }
    })
  }

  ngOnDestroy() {
    this.endsubs$.next;
    this.endsubs$.complete();
  }

  _addProductToCart() {
    const cartItem : CartItem = {
      productId : this.product.id,
      quantity: this.quantity
    }

    this.cartService.setCartItem(cartItem);
  }
  
  private _getProduct(id: string) {
    this.productsService
      .getProduct(id)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(res => {
        this.product = res;
        this.loading = false;
      })
  }
}
