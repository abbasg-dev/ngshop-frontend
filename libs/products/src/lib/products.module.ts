import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';

import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { UiModule } from '@blackbits/ui';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsListComponent
  },
  {
    path: 'category/:categoryId',
    component: ProductsListComponent
  },
  {
    path: 'products/:productId',
    component: ProductDetailsComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    Ng2SearchPipeModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    RatingModule,
    InputNumberModule,
    UiModule,
  ],
  declarations: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
    ProductsListComponent,
    ProductDetailsComponent
  ],
  exports: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
    ProductsListComponent,
    ProductDetailsComponent
  ]
})
export class ProductsModule {}
