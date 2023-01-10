import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalstorageService } from './localstorage.service';
import { _tokenExpired } from './common.services';
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private localstorageService: LocalstorageService,
  ) { }

  // eslint-disable-next-line
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.localstorageService.getToken();
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if (tokenDecode.isAdmin && !_tokenExpired(tokenDecode.Exp)) return true;
    }

    this.router.navigate(['/login']);
    
    return false;
  }
}
