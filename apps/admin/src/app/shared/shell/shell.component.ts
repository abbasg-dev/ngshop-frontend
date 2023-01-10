import { Component } from '@angular/core';
import { AppAuthService } from '@blackbits/users';
import { 
  SocialAuthService,
} from 'angularx-social-login';
@Component({
  selector: 'admin-shell',
  templateUrl: './shell.component.html',
})
export class ShellComponent {
  public visibleSidebar = false;
  constructor(
    private appAuthService: AppAuthService,
    private socialAuthService: SocialAuthService
  ) {}

  _openSidebar() {
    this.visibleSidebar = true;
  }

  logoutUser() {
    if (this.appAuthService) {
      this.appAuthService.logout();
    } else if (this.socialAuthService) {
      this.socialAuthService.signOut();
    }
  }

}
