import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CartService } from './services/cart.service';

import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { FormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: 'cart',
    component: CartPageComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    BadgeModule,
    RouterModule.forChild(routes),
    ButtonModule,
    InputNumberModule,
    FormsModule
  ],
  providers: [],
  declarations: [
    CartIconComponent,
    CartPageComponent,
    CartSummaryComponent
  ],
  exports: [
    CartIconComponent,
    CartPageComponent,
    CartSummaryComponent
  ]
})
export class OrdersModule {
  constructor(
    cartService: CartService
  ) {
    cartService.initCartLocalStorage();
  }
}
