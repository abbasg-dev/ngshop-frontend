import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';
@Component({
  selector: 'ngshop-products-list',
  templateUrl: './products-list.component.html',
  styles: []
})
export class ProductsListComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  categories: Category[] = [];
  isCategoryPage: boolean;
  loading = true;
  endsubs$: Subject<any> = new Subject();

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.endsubs$)).subscribe((params) => {
      params['categoryId'] ? this._getProducts([params['categoryId']]) : this._getProducts()
      params['categoryId'] ? this.isCategoryPage = true : this.isCategoryPage = false;
    })
    this._getCategories();
  }

  ngOnDestroy() {
    this.endsubs$.next;
    this.endsubs$.complete();
  }

  private _getProducts(categoriesFilter?: string[]) {
    this.productsService.getProducts(categoriesFilter).pipe(takeUntil(this.endsubs$)).subscribe(res => {
      this.products = res;
      this.loading = false;
    })
  }

  private _getCategories() {
    this.categoriesService.getCategories().pipe(takeUntil(this.endsubs$)).subscribe(res => {
      this.categories = res;
      this.loading = false;
    })
  }

  categoryFilter() {
    const selectedCategories = this.categories.filter(category => category.checked).map((category) => category._id);
    this._getProducts(selectedCategories);
  }

  public _getFilteredProducts(): Product[] {
    return this.products.filter((prod)=> prod.name.includes(this.productsService.search))
  }

}
