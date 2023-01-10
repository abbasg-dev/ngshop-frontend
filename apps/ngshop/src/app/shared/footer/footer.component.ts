import { Component } from '@angular/core';

@Component({
  selector: 'ngshop-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  year = new Date().getFullYear();
}
