import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService, Order, ORDER_STATUS } from '@blackbits/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: []
})
export class OrdersListComponent implements OnInit, OnDestroy {

  orders: Order[] = [];
  orderStatus = ORDER_STATUS;
  @ViewChild('orderstbl') orderstbl: Table | undefined;
  loading = true;
  endsubs$: Subject<any> = new Subject();

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private ordersService: OrdersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._getOrders()
  }

  ngOnDestroy() {
    this.endsubs$.next;
    this.endsubs$.complete();
  }

  private _getOrders() {
    this.ordersService.getOrders().pipe(takeUntil(this.endsubs$)).subscribe(ords => {
      this.orders = ords;
      this.loading = false;
    })
  }

  showOrder(orderId: string) {
    this.router.navigateByUrl(`orders/${orderId}`);
  }

  deleteOrder(orderid: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this order?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService.deleteOrder(orderid).pipe(takeUntil(this.endsubs$)).subscribe(() => {
          this._getOrders();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Order deleted successfully'
          });
        },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Order not deleted'
            })
          });
      }
    });
  }

  filterOrders($event: Event, stringVal: string) {
    this.orderstbl?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

}
