import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'ngshop-welcome-page',
  templateUrl: './welcome-page.component.html'
})
export class WelcomePageComponent {

  isHome = false;
  isCheckout = false;
  isThankYou = false;

  constructor(
    location: Location, 
    private router: Router
  ) {
    this.router.events.subscribe(() => {
      if(location.path() == ''){
        this.isHome = true;
        this.isCheckout = false;
        this.isThankYou = false;
      } else if (location.path() == '/checkout') {
        this.isHome = false;
        this.isCheckout = true;
        this.isThankYou = false;
      } else if (location.path() == '/success') {
        this.isHome = false;
        this.isCheckout = false;
        this.isThankYou = true;
      }
    });
  }

  proceedToCheckout() {
    this.router.navigate(['/cart']);
  }

}
