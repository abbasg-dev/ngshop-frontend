import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService, OrderStatuses } from '@blackbits/orders';
import { MessageService } from 'primeng/api';
import { ORDER_STATUS } from '@blackbits/orders';

import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.scss']
})
export class OrdersDetailComponent implements OnInit, OnDestroy {
  order!: Order;
  orderStatuses:OrderStatuses[] = [];
  selectedStatus!: number | undefined;
  endsubs$: Subject<any> = new Subject();

  constructor(
    private orderService: OrdersService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }

  ngOnDestroy() {
    this.endsubs$.next;
    this.endsubs$.complete();
  }

  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((index) => {
      return {
        id: index,
        name: ORDER_STATUS?.[index].label
      };
    });
  }

  private _getOrder() {
    this.route.params.pipe(takeUntil(this.endsubs$)).subscribe((params) => {
      if (params['id']) {
        this.orderService.getOrder(params['id']).pipe(takeUntil(this.endsubs$)).subscribe((order) => {
          this.order = order;
          this.selectedStatus = order.status;
        });
      }
    });
  }

  onStatusChange(event: { value: string; }) {
    this.orderService.updateOrderStatus({ status: event.value }, this.order.id as string).pipe(takeUntil(this.endsubs$)).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Order is updated!'
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Order is not updated!'
        });
      }
    );
  }
}
