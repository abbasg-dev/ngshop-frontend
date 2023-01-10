import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalstorageService } from './localstorage.service';
import { _tokenExpired } from './common.services';
import { MessageService } from 'primeng/api';
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private localstorageService: LocalstorageService,
    private messageService: MessageService,
  ) { }

  // eslint-disable-next-line
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.localstorageService.getToken();
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if (tokenDecode.isAdmin && !_tokenExpired(tokenDecode.Exp)) {
        return true
      } else {
        this.messageService.add({
          severity:'error', 
          summary:'Error', 
          detail:'Woops! You are not allowed to access the admin panel'
        });
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
}
