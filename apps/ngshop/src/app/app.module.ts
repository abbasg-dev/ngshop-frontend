import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { MessagesComponent } from './shared/messages/messages.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavComponent } from './shared/nav/nav.component';
import { AppComponent } from './app.component';

import { ClientAuthGuard, JwtInterceptor, UsersModule } from '@blackbits/users';
import { ProductsModule } from '@blackbits/products';
import { OrdersModule } from '@blackbits/orders';
import { UiModule } from '@blackbits/ui';

import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

const routes: Routes = [
  {
    path: 'home', 
    component: HomePageComponent,
  },
  {
    path: '', 
    component: WelcomePageComponent,
    canActivate: [ClientAuthGuard],
    children: [
      {
        path: 'checkout',
        component: CheckoutPageComponent,
      },
      {
        path: 'success',
        component: ThankYouComponent,
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    WelcomePageComponent,
    CheckoutPageComponent,
    ThankYouComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ProductsModule,
    AccordionModule,
    BrowserAnimationsModule,
    UiModule,
    OrdersModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    NgxIntlTelInputModule,
    RouterModule.forRoot(routes),
    UsersModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
