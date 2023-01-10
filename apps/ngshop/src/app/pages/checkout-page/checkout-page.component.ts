import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart, CartItemDetailed, CartService, Order, OrderItem, OrdersService } from '@blackbits/orders';
import { Country, LocalstorageService, User, UsersService } from '@blackbits/users';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { Subject, take, takeUntil } from 'rxjs';
import { environment } from '@env/environment';

@Component({
  selector: 'ngshop-checkout-page',
  templateUrl: './checkout-page.component.html',
  styles: []
})
export class CheckoutPageComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private localstorageService: LocalstorageService,
    private cartService: CartService,
    private ordersService: OrdersService,
  ) {}

  checkoutFormGroup: FormGroup;
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  userId = this.loggedInUser.id;
  countries: Country[] = [];

  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.Lebanon];

  cartItemsDetailed : CartItemDetailed[] = [];
  cartCount = 0;
  totalPrice: number;
  endSubs$ : Subject<any> = new Subject();

  paymentHandler: any = null;
  stripeAPIKey: any = environment.STRIPE_API

  ngOnInit(): void {
    this._initCheckoutForm();
    this._getCartItems();
    this._getCountries();
    this.invokeStripe();
    this._getCartDetails();
    this._getOrderSummary();
  }

  ngOnDestroy() {
    this.endSubs$.next;
    this.endSubs$.complete();
  }

  get loggedInUser(): User {
    const user = JSON.parse(this.localstorageService.getUser());
    return user;
  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: [this.loggedInUser.name, Validators.required],
      email: [this.loggedInUser.email, [Validators.email, Validators.required]],
      phone: [this.loggedInUser.phone, Validators.required],
      city: [this.loggedInUser.city, Validators.required],
      country: [this.loggedInUser.country, Validators.required],
      zip: [this.loggedInUser.zip, [Validators.required, Validators.pattern('^[0-9-]{5,10}(?:-[0-9]{4})?$')]],
      apartment: [this.loggedInUser.apartment, Validators.required],
      street: [this.loggedInUser.street, Validators.required]
    })
  }

  private _getCountries() {
    this.countries = this.usersService.getCountries();
  }

  backToCart() {
    this.router.navigate(['/cart'])
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }

  placeOrder() {
    this.isSubmitted = true;

    if (this.checkoutFormGroup.invalid) {
      return;
    }

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm['street'].value,
      shippingAddress2: this.checkoutForm['apartment'].value,
      city: this.checkoutForm['city'].value,
      zip: this.checkoutForm['zip'].value,
      country: this.checkoutForm['country'].value,
      phone: this.checkoutForm['phone'].value,
      user: this.userId,
      dateOrdered: `${Date.now()}`,
    };

    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: this.stripeAPIKey,
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        paymentStripe()
      },
    });

    this.cartItemsDetailed.map((item) => {
      paymentHandler.open({
        name: item.product.name,
        description: 'Quantity: ' + item.quantity,
        amount: this.totalPrice * 100,
      })
    })

    const paymentStripe = () => {
      this.ordersService.createOrder(order).subscribe(
        () => {
          // redirect to thank you page // payment
          this.cartService.emptyCart();
          this.totalPrice = 0;
          this.router.navigate(['/success']);
        }, () => {
          // display some message to user
        }
      )
    }

  }

  private _getCartItems() {
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity
      }
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: this.stripeAPIKey,
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }

  private _getCartDetails() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe(respCart => {
      this.cartItemsDetailed = [];
      this.cartCount = respCart?.items?.length ?? 0;
      respCart.items.forEach((cartItem) => {
        this.ordersService.getProduct(cartItem.productId).subscribe((respProduct) => {
          this.cartItemsDetailed.push({
            product: respProduct,
            quantity: cartItem.quantity
          })
        })
      })
    })
  }

  _getOrderSummary() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((cart) => {
      this.totalPrice = 0;
      if (cart) {
        cart.items.map((item) => {
          this.ordersService
            .getProduct(item.productId)
            .pipe(take(1))
            .subscribe((product) => {
              this.totalPrice += product.price * item.quantity;
            })
        }
        )
      }
    })
  }
}
