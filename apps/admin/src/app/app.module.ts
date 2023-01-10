import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ShellComponent } from './shared/shell/shell.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { UsersModule } from '@blackbits/users';

import { SidebarModule } from 'primeng/sidebar';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { EditorModule } from 'primeng/editor';
import { TagModule } from 'primeng/tag';
import { FieldsetModule } from 'primeng/fieldset';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ImageModule } from 'primeng/image';
import { CategoriesService, ProductsService } from '@blackbits/products';
import { OrdersService } from '@blackbits/orders';
import { UsersService, JwtInterceptor } from '@blackbits/users';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';

const UX_MODULE = [
  SidebarModule,
  CardModule,
  ToolbarModule,
  ButtonModule,
  TableModule,
  InputTextModule,
  ToastModule,
  ConfirmDialogModule,
  ColorPickerModule,
  InputNumberModule,
  DropdownModule,
  InputTextareaModule,
  InputSwitchModule,
  EditorModule,
  TagModule,
  NgxIntlTelInputModule,
  FieldsetModule,
  NgxDropzoneModule,
  ImageModule
]

@NgModule({
  declarations: [
    AppComponent,
    ShellComponent, 
    DashboardComponent, 
    CategoriesListComponent,
    CategoriesFormComponent,
    ProductsListComponent,
    ProductsFormComponent,
    UsersListComponent,
    UsersFormComponent,
    OrdersListComponent,
    OrdersDetailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    UsersModule,
    AppRoutingModule,
    ...UX_MODULE
  ],
  providers: [
    CategoriesService,
    MessageService,
    ConfirmationService,
    ProductsService,
    UsersService,
    OrdersService,
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
