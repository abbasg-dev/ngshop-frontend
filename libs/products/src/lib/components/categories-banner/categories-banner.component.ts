import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'ngshop-products-categories-banner',
  templateUrl: './categories-banner.component.html',
  styles: []
})

export class CategoriesBannerComponent implements OnInit, OnDestroy {
  
  categories: Category[] = [];
  loading = true;
  endsubs$: Subject<any> = new Subject();
  
  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService.getCategories().pipe(takeUntil(this.endsubs$)).subscribe(categories => {
      this.categories = categories;
      this.loading = false;
    })
  }

  ngOnDestroy() {
    this.endsubs$.next;
    this.endsubs$.complete();
  }

}
