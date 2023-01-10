import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService, Product } from '@blackbits/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: []
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  @ViewChild('productstbl') productstbl: Table | undefined;
  loading = true;
  endsubs$: Subject<any> = new Subject();

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._getProducts()
  }

  ngOnDestroy() {
    this.endsubs$.next;
    this.endsubs$.complete();
  }

  private _getProducts() {
    this.productsService.getProducts().pipe(takeUntil(this.endsubs$)).subscribe(prods => {
      this.products = prods;
      this.loading = false;
    })
  }

  updateProduct(productid: string) {
    this.router.navigateByUrl(`products/form/${productid}`);
  }

  deleteProduct(productid: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productid).pipe(takeUntil(this.endsubs$)).subscribe(() => {
          this._getProducts();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product deleted successfully'
          });
        },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Product not deleted'
            })
          });
      }
    });
  }

  filterProducts($event: Event, stringVal: string) {
    this.productstbl?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

}
