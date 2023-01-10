import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService, CategoriesService, Product, Category } from '@blackbits/products';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { timer, Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent implements OnInit, OnDestroy {

  editmode = false;
  form!: FormGroup;
  isSubmitted = false;
  categories: Category[] = [];
  imageDisplay: string | ArrayBuffer | undefined;
  currentProductId!: string;
  endsubs$: Subject<any> = new Subject();
  images: File[] = [];
  newImages: File[] = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private router: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }

  ngOnDestroy() {
    this.endsubs$.next;
    this.endsubs$.complete();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;

    const productFormData = new FormData();
    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value);
    });
    if (this.editmode) {
      this._updateProduct(productFormData);
    } else {
      this._createProduct(productFormData);
    }
  }

  private _getCategories() {
    this.categoriesService.getCategories().pipe(takeUntil(this.endsubs$)).subscribe((categories) => {
      this.categories = categories;
    });
  }

  private _createProduct(productData: FormData) {
    this.productsService.createProduct(productData).pipe(takeUntil(this.endsubs$)).subscribe((product: Product) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Product ${product.name} created successfully`
      });
      timer(2000).toPromise().then(() => {
        this.location.back();
      })
    }, () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Product not created'
      });
    });
  }

  private _updateProduct(productFormData: FormData) {
    this.productsService.updateProduct(productFormData, this.currentProductId).pipe(takeUntil(this.endsubs$)).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Product updated successfully'
      });
      timer(2000).toPromise().then(() => {
        this.location.back();
      })
    }, () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Product not updated'
      });
    });
  }

  private _checkEditMode() {
    this.router.params.pipe(takeUntil(this.endsubs$)).subscribe((params) => {
      if (params['id']) {
        this.editmode = true;
        this.currentProductId = params['id'];
        this.productsService.getProduct(params['id']).pipe(takeUntil(this.endsubs$)).subscribe((product) => {
          this.productForm['name'].setValue(product.name);
          this.productForm['category'].setValue(product.category?._id);
          this.productForm['brand'].setValue(product.brand);
          this.productForm['price'].setValue(product.price);
          this.productForm['countInStock'].setValue(product.countInStock);
          this.productForm['isFeatured'].setValue(product.isFeatured);
          this.productForm['description'].setValue(product.description);
          this.productForm['richDescription'].setValue(product.richDescription);
          this.imageDisplay = product.image;
          this.productForm['image'].setValidators([]);
          this.productForm['image'].updateValueAndValidity();
          product.images.map((img) => {
            this.images.push(img)
          })
        })
      }
    })
  }

  get productForm() {
    return this.form.controls;
  }
  
  onImageUpload(event: any) {
    const fileReader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      fileReader.readAsDataURL(file);
      this.form.get('image')?.updateValueAndValidity();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result as string;
        this.form.patchValue({ image: file });
      };
    }
  }

  onSelectProductImages(event: { addedFiles: File[]; }) {
    this.newImages.push(...event.addedFiles);
    const formData = new FormData();
    for (let i = 0; i < this.newImages.length; i++) {
      formData.append("images", this.newImages[i]);
    }
    this.productsService.updateProductGallery(formData, this.currentProductId).pipe(takeUntil(this.endsubs$)).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Product gallery updated successfully`
      });
      this.newImages = [];
      this._getGallery();
    }, () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Product gallery not updated'
      });
    });
  }

  onCancel() {
    this.location.back();
  }

  private _getGallery() {
    this.productsService.getProduct(this.currentProductId).pipe(takeUntil(this.endsubs$)).subscribe((product) => {
      this.images = [];
      product.images.map((img) => {
        this.images.push(img)
      })
    })
    return this.images;
  }
}
