import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from '@blackbits/users';

@Component({
  selector: 'ngshop-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(
    private localstorageService: LocalstorageService,
    private router: Router,
  ) {}

  get loggedInUser() {
    const token = this.localstorageService.getToken();
    return token;
  }

  logout() {
    this.localstorageService.removeToken()
    this.localstorageService.removeUser()
    this.router.navigate(['/home']);
  }
}
