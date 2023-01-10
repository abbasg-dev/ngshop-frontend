import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '@blackbits/products';
import { OrdersService } from '@blackbits/orders';
import { UsersService } from '@blackbits/users';
import { Subject, takeUntil, combineLatest } from 'rxjs';
@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
  statistics: number[];
  endsubs$: Subject<any> = new Subject();
  constructor(
    private userService: UsersService,
    private productService: ProductsService,
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productService.getProductsCount(),
      this.userService.getUsersCount(),
      this.ordersService.getTotalSales()
    ]).pipe(takeUntil(this.endsubs$)).subscribe((values) => {
      this.statistics = values;
    });
  }

  ngOnDestroy() {
    this.endsubs$.next;
    this.endsubs$.complete();
  }

}
