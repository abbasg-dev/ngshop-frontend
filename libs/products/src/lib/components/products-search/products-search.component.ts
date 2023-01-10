import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
@Component({
  selector: 'ngshop-products-search',
  templateUrl: './products-search.component.html',
  styles: []
})
export class ProductsSearchComponent {
  search = "";

  constructor(
    private productsService: ProductsService
  ) {}

  _onSearchProduct(){
    this.productsService.search = this.search;
  }
}
