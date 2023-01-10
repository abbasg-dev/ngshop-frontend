import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@blackbits/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: []
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  @ViewChild('categoriestbl') categoriestbl: Table | undefined;
  loading = true;
  endsubs$: Subject<any> = new Subject();

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private categoriesService: CategoriesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this._getCategories();
  }

  ngOnDestroy() {
    this.endsubs$.next;
    this.endsubs$.complete();
  }

  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId).pipe(takeUntil(this.endsubs$)).subscribe(() => {
          this._getCategories();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Category deleted successfully'
          });
        },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Category not deleted'
            })
          });
      }
    });
  }

  updateCategory(categoryId: string) {
    this.router.navigateByUrl(`categories/form/${categoryId}`)
  }

  filterCategoriesByName($event: Event, stringVal: string) {
    this.categoriestbl?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  private _getCategories() {
    this.categoriesService.getCategories().pipe(takeUntil(this.endsubs$)).subscribe(cats => {
      this.categories = cats;
      this.loading = false;
    })
  }
}
